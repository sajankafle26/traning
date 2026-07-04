import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Blog } from "@/models/BlogProduct";
import { auth } from "@/auth";
import { postToGoogleBusinessProfile } from "@/services/googleBusiness";
import { blogHandlers } from "@/lib/apiHandlers";

const customPOST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    await dbConnect();
    const data = await Blog.create(body);

    // Auto-post to Google Business Profile
    if (data && data.title && data.slug) {
      postToGoogleBusinessProfile({
        title: data.title,
        excerpt: data.excerpt || '',
        slug: data.slug,
        image: data.image || '',
      }).catch((err: any) => {
        console.error('[GBP Auto-post] Failed:', err.message || err);
      });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = blogHandlers.GET;
export const POST = customPOST;
