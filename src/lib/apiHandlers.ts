import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UpcomingBatch from "@/models/UpcomingBatch";
import LiveCourse from "@/models/LiveCourse";
import { Blog, Product } from "@/models/BlogProduct";
import TechStack from "@/models/TechStack";
import Coupon from "@/models/Coupon";
import { auth } from "@/auth";
import SuccessStory from "@/models/SuccessStory";
import Service from "@/models/Service";
import Internship from "@/models/Internship";
import Testimonial from "@/models/Testimonial";
import Portfolio from "@/models/Portfolio";
import InstituteStudent from "@/models/InstituteStudent";
import Teacher from "@/models/Teacher";
import Department from "@/models/Department";
import ClassRoom from "@/models/ClassRoom";
import Attendance from "@/models/Attendance";
import Notice from "@/models/Notice";
import FeeRecord from "@/models/FeeRecord";
import Material from "@/models/Material";
import Expense from "@/models/Expense";
import InstituteGroup from "@/models/InstituteGroup";
import { getCache, setCache, buildCacheKey, invalidateCache } from "@/lib/cache";

const CACHE_TTL = 300; // 5 minutes

function getModelName(Model: any): string {
  return Model?.modelName || "unknown";
}

// Helper to create handler
export const createHandler = (Model: any) => {
    const modelName = getModelName(Model);
    return {
        GET: async (req: Request) => {
            try {
                const { searchParams } = new URL(req.url);
                const queryStr = searchParams.toString();
                const cacheKey = buildCacheKey("api", modelName, queryStr || "all");

                const cached = await getCache<any[]>(cacheKey);
                if (cached) return NextResponse.json(cached);

                await dbConnect();
                const query: any = {};
                searchParams.forEach((value, key) => {
                    query[key] = value;
                });
                const data = await Model.find(query);
                await setCache(cacheKey, data, CACHE_TTL);
                return NextResponse.json(data);
            } catch (error: any) {
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        },
        POST: async (req: Request) => {
            try {
                const session = await auth();
                if (!session || (session.user as any).role !== "admin") {
                    console.log("POST: Unauthorized access attempt");
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                }
                const body = await req.json();
                console.log(`POST ${modelName}:`, JSON.stringify(body, null, 2));
                await dbConnect();
                const data = await Model.create(body);
                console.log(`POST ${modelName}: Successfully created`, data._id);
                // Invalidate cache for this model
                await invalidateCache(`api:${modelName}:*`);
                return NextResponse.json(data, { status: 201 });
            } catch (error: any) {
                console.error(`POST ${modelName} Error:`, error);
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        },
        DELETE: async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
            try {
                const session = await auth();
                if (!session || (session.user as any).role !== "admin") {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                }
                const { id } = await params;
                await dbConnect();
                await Model.findByIdAndDelete(id);
                // Invalidate cache for this model
                await invalidateCache(`api:${modelName}:*`);
                return NextResponse.json({ message: "Deleted successfully" });
            } catch (error: any) {
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        },
        PUT: async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
            try {
                const session = await auth();
                if (!session || (session.user as any).role !== "admin") {
                    console.log("PUT: Unauthorized access attempt");
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                }
                const { id } = await params;
                const body = await req.json();
                console.log(`PUT ${modelName} (${id}):`, JSON.stringify(body, null, 2));
                await dbConnect();
                const data = await Model.findByIdAndUpdate(id, body, { new: true });
                console.log(`PUT ${modelName}: Successfully updated`);
                // Invalidate cache for this model
                await invalidateCache(`api:${modelName}:*`);
                return NextResponse.json(data);
            } catch (error: any) {
                console.error(`PUT ${modelName} Error:`, error);
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        }
    };
};

// Coupon
export const couponHandlers = createHandler(Coupon);
// Batch
export const batchHandlers = createHandler(UpcomingBatch);
// LiveCourse
export const liveCourseHandlers = createHandler(LiveCourse);
// Blog
export const blogHandlers = createHandler(Blog);
// Product
export const productHandlers = createHandler(Product);
// TechStack
export const techStackHandlers = createHandler(TechStack);
// SuccessStory
export const successStoryHandlers = createHandler(SuccessStory);
// Service
export const serviceHandlers = createHandler(Service);
// Internship
export const internshipHandlers = createHandler(Internship);
// Testimonial
// Testimonial
export const testimonialHandlers = createHandler(Testimonial);
// Portfolio
export const portfolioHandlers = createHandler(Portfolio);
// Institute
export const instituteStudentHandlers = createHandler(InstituteStudent);
export const teacherHandlers = createHandler(Teacher);
export const departmentHandlers = createHandler(Department);
export const classRoomHandlers = createHandler(ClassRoom);
export const attendanceHandlers = createHandler(Attendance);
export const noticeHandlers = createHandler(Notice);
export const feeRecordHandlers = createHandler(FeeRecord);
export const materialHandlers = createHandler(Material);
export const expenseHandlers = createHandler(Expense);
export const instituteGroupHandlers = createHandler(InstituteGroup);
