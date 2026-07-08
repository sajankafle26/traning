import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import dbConnect from '@/lib/dbConnect';
import VideoCourse from '@/models/VideoCourse';
import User from '@/models/User';
import { auth } from '@/auth';
import { getCache, setCache, buildCacheKey } from '@/lib/cache';
import { rateLimitMiddleware } from '@/lib/rate-limit';

const BUCKET_NAME = 'course-videos';
const SIGNED_URL_EXPIRY = 3600; // 1 hour
const CACHE_TTL = SIGNED_URL_EXPIRY - 60; // cache for 59 minutes (renew before expiry)

export async function POST(req: Request) {
  try {
    // Rate limit: 20 requests per minute per user
    const rateLimitResponse = await rateLimitMiddleware(req, "video-stream");
    if (rateLimitResponse) return rateLimitResponse;

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId, lessonId } = await req.json();
    if (!courseId || !lessonId) {
      return NextResponse.json({ error: 'courseId and lessonId required' }, { status: 400 });
    }

    // Check Redis for cached signed URL
    const cacheKey = buildCacheKey("signed-url", courseId, lessonId);
    const cached = await getCache<{ signedUrl: string; expiresIn: number }>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    await dbConnect();

    // Verify user is enrolled / has paid
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isEnrolled = user.enrolledCourses?.some(
      (c: any) => c.toString() === courseId
    );

    // Also check orders
    const Order = (await import('@/models/Order')).default;
    const hasOrder = await Order.findOne({
      userId: user._id,
      courseId,
      status: 'completed',
    });

    if (!isEnrolled && !hasOrder) {
      return NextResponse.json({ error: 'Not enrolled. Please complete payment.' }, { status: 403 });
    }

    // Find the lesson
    const course = await VideoCourse.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const lesson = course.lessons?.find((l: any) => l._id?.toString() === lessonId);
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Get the file path from the lesson's videoUrl field
    // Expected format: "course-videos/course-slug/lesson-filename.mp4"
    // or just the storage path like "course-slug/lesson-filename.mp4"
    let filePath = lesson.videoUrl;

    // If it's a full Supabase URL, extract the path
    if (filePath?.includes('/storage/v1/object/')) {
      const urlParts = filePath.split(`${BUCKET_NAME}/`);
      filePath = urlParts[1] || filePath;
    }

    // If it starts with the bucket name, remove it
    if (filePath?.startsWith(`${BUCKET_NAME}/`)) {
      filePath = filePath.replace(`${BUCKET_NAME}/`, '');
    }

    if (!filePath) {
      return NextResponse.json({ error: 'Video path not configured for this lesson' }, { status: 404 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
    }

    // Generate signed URL
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, SIGNED_URL_EXPIRY);

    if (error) {
      console.error('Supabase signed URL error:', error);
      return NextResponse.json({ error: 'Failed to generate video URL' }, { status: 500 });
    }

    // Cache the signed URL so we don't regenerate during its validity window
    const result = { signedUrl: data.signedUrl, expiresIn: SIGNED_URL_EXPIRY };
    await setCache(cacheKey, result, CACHE_TTL);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Video stream error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
