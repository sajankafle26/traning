import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import dbConnect from '@/lib/dbConnect';
import VideoCourse from '@/models/VideoCourse';
import { auth } from '@/auth';

const BUCKET_NAME = 'course-videos';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const courseId = formData.get('courseId') as string;
    const lessonTitle = formData.get('lessonTitle') as string;

    if (!file || !courseId || !lessonTitle) {
      return NextResponse.json({ error: 'file, courseId, lessonTitle required' }, { status: 400 });
    }

    await dbConnect();
    const course = await VideoCourse.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Create file path: course-slug/lesson-title-timestamp.ext
    const slug = course.slug || course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const ext = file.name.split('.').pop() || 'mp4';
    const safeName = lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filePath = `${slug}/${safeName}-${Date.now()}.${ext}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await getSupabaseAdmin().storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type || 'video/mp4',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      filePath,
      courseId,
      lessonTitle,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
