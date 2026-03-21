import { createHandler } from "@/lib/apiHandlers";
import InstituteStudent from "@/models/InstituteStudent";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

const handlers = createHandler(InstituteStudent);

export const GET = async (req: Request) => {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const query: any = {};
        searchParams.forEach((value, key) => { query[key] = value; });
        const data = await InstituteStudent.find(query).populate('group').lean();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = handlers.POST;
