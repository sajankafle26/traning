const GBP_API_BASE = 'https://businessprofile.googleapis.com/v2';

interface GBPPost {
  name: string;
  languageCode: string;
  summary: string;
  topicType: string;
  callToAction?: {
    actionType: string;
    url: string;
  };
  media?: Array<{
    mediaFormat: string;
    sourceUrl: string;
  }>;
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GBP_CLIENT_ID;
  const clientSecret = process.env.GBP_CLIENT_SECRET;
  const refreshToken = process.env.GBP_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Google Business Profile credentials not configured. Add GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN to .env.local');
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get access token: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function postToGoogleBusinessProfile(params: {
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
}): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const locationId = process.env.GBP_LOCATION_ID;
    if (!locationId) {
      return { success: false, error: 'GBP_LOCATION_ID not set in .env.local' };
    }

    const accessToken = await getAccessToken();

    const postBody: GBPPost = {
      name: `locations/${locationId}`,
      languageCode: 'en',
      summary: `${params.title}\n\n${params.excerpt}\n\nRead more: https://sangalotech.com/blog/${params.slug}`,
      topicType: 'STANDARD',
      callToAction: {
        actionType: 'LEARN_MORE',
        url: `https://sangalotech.com/blog/${params.slug}`,
      },
    };

    if (params.image) {
      postBody.media = [{
        mediaFormat: 'PHOTO',
        sourceUrl: params.image,
      }];
    }

    const res = await fetch(
      `${GBP_API_BASE}/locations/${locationId}/localPosts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[GBP] Post failed:', err);
      return { success: false, error: err };
    }

    const data = await res.json();
    console.log('[GBP] Post created:', data.name);
    return { success: true, postId: data.name };
  } catch (err: any) {
    console.error('[GBP] Error:', err.message);
    return { success: false, error: err.message };
  }
}

export async function deleteGBPPost(postName: string): Promise<boolean> {
  try {
    const locationId = process.env.GBP_LOCATION_ID;
    if (!locationId) return false;

    const accessToken = await getAccessToken();

    const res = await fetch(
      `${GBP_API_BASE}/${postName}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return res.ok;
  } catch {
    return false;
  }
}
