import { NextRequest, NextResponse } from 'next/server';
import { postToGoogleBusinessProfile } from '@/services/googleBusiness';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, excerpt, slug, image } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'title and slug are required' }, { status: 400 });
    }

    const result = await postToGoogleBusinessProfile({ title, excerpt, slug, image });

    if (result.success) {
      return NextResponse.json({ success: true, postId: result.postId });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
