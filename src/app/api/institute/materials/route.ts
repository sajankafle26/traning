import { materialHandlers } from "@/lib/apiHandlers";
import dbConnect from "@/lib/dbConnect";
import Material from "@/models/Material";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConnect();
    try {
        const data = await Material.find({}).populate('department').populate('teacher').sort({ createdAt: -1 });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = materialHandlers.POST;
