import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/Coupon";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export async function POST(req: Request) {
    try {
        const { code, amount } = await req.json();
        const amountInput = Number(amount) || 0;
        if (!code) {
            return NextResponse.json({ message: "Coupon code is required" }, { status: 400 });
        }

        return cachedApiGet(buildCacheKey("api", "coupons", "validate", code.toUpperCase()), async () => {
            await dbConnect();
            const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

            if (!coupon) {
                throw new Error("INVALID_COUPON");
            }

            const now = new Date();
            const expiry = new Date(coupon.expiryDate);
            expiry.setHours(23, 59, 59, 999);

            if (now > expiry) {
                throw new Error("COUPON_EXPIRED");
            }

            if (coupon.usageCount >= coupon.usageLimit) {
                throw new Error("COUPON_LIMIT_REACHED");
            }

            if (amountInput && amountInput < coupon.minOrderAmount) {
                throw new Error("MIN_ORDER_AMOUNT");
            }

            let discount = 0;
            if (coupon.discountType === 'percentage') {
                discount = (amountInput * coupon.discountValue) / 100;
            } else {
                discount = coupon.discountValue;
            }

            return {
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                discountAmount: discount,
                finalAmount: Math.max(0, amountInput - discount),
            };
        }, 60);
    } catch (error: any) {
        if (error.message === "INVALID_COUPON") {
            return NextResponse.json({ message: "Invalid coupon code" }, { status: 400 });
        }
        if (error.message === "COUPON_EXPIRED") {
            return NextResponse.json({ message: "Coupon has expired" }, { status: 400 });
        }
        if (error.message === "COUPON_LIMIT_REACHED") {
            return NextResponse.json({ message: "Coupon usage limit reached" }, { status: 400 });
        }
        if (error.message === "MIN_ORDER_AMOUNT") {
            // We need coupon info here, but we don't have it. Let's just return a generic message.
            return NextResponse.json({ message: "Minimum order amount not met" }, { status: 400 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
