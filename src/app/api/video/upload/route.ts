import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { auth } from '@/auth';

const BUCKET_NAME = 'course-videos';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admin can upload
    if ((session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string; // e.g. "course-slug/lesson-1.mp4"

    if (!file || !path) {
      return NextResponse.json({ error: 'file and path required' }, { status: 400 });
    }

    // Convert File to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await getSupabaseAdmin().storage
      .from(BUCKET_NAME)
      .upload(path, buffer, {
        contentType: file.type || 'video/mp4',
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the public URL (for reference, actual streaming uses signed URLs)
    const { data: urlData } = getSupabaseAdmin().storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return NextResponse.json({
      message: 'Upload successful',
      path: data.path,
      publicUrl: urlData.publicUrl,
    });
  } catch (error: any) {
    console.error('Video upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a video
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    if (!path) {
      return NextResponse.json({ error: 'path required' }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin().storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
