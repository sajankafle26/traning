import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  const start = Date.now();
  try {
    await dbConnect();
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    return NextResponse.json({
      status: "ok",
      database: dbStatus,
      latency: `${Date.now() - start}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
