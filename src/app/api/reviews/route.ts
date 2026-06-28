import { NextRequest, NextResponse } from 'next/server';

// Google Reviews via Places API
async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.log('Google Places API not configured');
    return [];
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK' || !data.result?.reviews) {
      return [];
    }

    return data.result.reviews.slice(0, 10).map((review: any) => ({
      id: `google_${review.time}`,
      name: review.author_name,
      quote: review.text,
      rating: review.rating,
      image: review.profile_photo_url || `https://i.pravatar.cc/150?u=${review.author_name}`,
      source: 'google' as const,
      time: review.time,
      author_url: review.author_url,
    }));
  } catch (error) {
    console.error('Google Reviews fetch error:', error);
    return [];
  }
}

// Facebook Reviews via Graph API
async function fetchFacebookReviews() {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!accessToken || !pageId) {
    console.log('Facebook API not configured');
    return [];
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${pageId}/ratings?access_token=${accessToken}&fields=reviewer,rating,review_text,created_time&limit=10`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data || data.error) {
      return [];
    }

    return data.data
      .filter((item: any) => item.review_text)
      .slice(0, 10)
      .map((review: any) => ({
        id: `facebook_${review.created_time}`,
        name: review.reviewer?.name || 'Anonymous',
        quote: review.review_text,
        rating: review.rating || 5,
        image: review.reviewer?.picture?.data?.url || `https://i.pravatar.cc/150?u=${review.reviewer?.name}`,
        source: 'facebook' as const,
        time: new Date(review.created_time).getTime() / 1000,
      }));
  } catch (error) {
    console.error('Facebook Reviews fetch error:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const [googleReviews, facebookReviews] = await Promise.all([
      fetchGoogleReviews(),
      fetchFacebookReviews(),
    ]);

    // Merge and sort by time (newest first)
    const allReviews = [...googleReviews, ...facebookReviews]
      .sort((a, b) => b.time - a.time)
      .slice(0, 20);

    return NextResponse.json({
      reviews: allReviews,
      stats: {
        google: {
          count: googleReviews.length,
          configured: !!(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID),
        },
        facebook: {
          count: facebookReviews.length,
          configured: !!(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.FACEBOOK_PAGE_ID),
        },
      },
    });
  } catch (error) {
    console.error('Reviews API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [] },
      { status: 500 }
    );
  }
}
