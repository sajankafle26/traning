import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, resolve } from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";
import os from "os";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
    "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
    "video/mp4", "video/webm", "video/ogg", "video/quicktime"
];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "mp4", "webm", "ogg", "mov"];

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({
                error: `Invalid file type. Received: ${file.type}. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`
            }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            return NextResponse.json({
                error: `File is too large (${sizeMB}MB). Max 10MB.`
            }, { status: 400 });
        }

        // Vercel Blob if configured
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(file.name, file, { access: 'public' });
            return NextResponse.json(blob);
        }

        // Local dev: save to public/uploads
        const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

        if (!isServerless) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const extension = (file.name.split(".").pop() || "png").toLowerCase();
            const filename = `${uuidv4()}.${extension}`;
            const uploadDir = resolve(process.cwd(), "public", "uploads");

            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }

            await writeFile(join(uploadDir, filename), buffer);
            return NextResponse.json({ url: `/uploads/${filename}`, filename, size: file.size, type: file.type });
        }

        // Serverless without Blob: return base64 data URL
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;

        return NextResponse.json({ url: dataUrl, filename: file.name, size: file.size, type: file.type });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Upload failed." }, { status: 500 });
    }
}
