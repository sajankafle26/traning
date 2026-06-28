import { NextRequest, NextResponse } from 'next/server';

// Google Reviews via Places API (Legacy)
async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return { reviews: [], configured: false, working: false };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.status !== 'OK' || !data.result?.reviews) {
      console.log('Google Places API not working:', data.status || data.error_message);
      return { reviews: [], configured: true, working: false };
    }

    const reviews = data.result.reviews.slice(0, 10).map((review: any) => ({
      id: `google_${review.time}`,
      name: review.author_name,
      quote: review.text,
      rating: review.rating,
      image: review.profile_photo_url || `https://i.pravatar.cc/150?u=${review.author_name}`,
      source: 'google' as const,
      time: review.time,
      author_url: review.author_url,
    }));

    return { reviews, configured: true, working: true, totalRatings: data.result?.user_ratings_total || reviews.length };
  } catch (error) {
    console.error('Google Reviews fetch error:', error);
    return { reviews: [], configured: true, working: false, totalRatings: 0 };
  }
}

// Facebook Reviews via Graph API
async function fetchFacebookReviews() {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!accessToken || !pageId) {
    return { reviews: [], configured: false, working: false };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${pageId}/ratings?access_token=${accessToken}&fields=reviewer,rating,review_text,created_time&limit=10`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (!data.data || data.error) {
      return { reviews: [], configured: true, working: false };
    }

    const reviews = data.data
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

    return { reviews, configured: true, working: true };
  } catch (error) {
    console.error('Facebook Reviews fetch error:', error);
    return { reviews: [], configured: true, working: false };
  }
}

export async function GET(request: NextRequest) {
  try {
    const [google, facebook] = await Promise.all([
      fetchGoogleReviews(),
      fetchFacebookReviews(),
    ]);

    const allReviews = [...google.reviews, ...facebook.reviews]
      .sort((a, b) => (b.time || 0) - (a.time || 0))
      .slice(0, 20);

    return NextResponse.json({
      reviews: allReviews,
      stats: {
        google: { count: google.reviews.length, configured: google.configured, working: google.working, totalRatings: google.totalRatings || 0 },
        facebook: { count: facebook.reviews.length, configured: facebook.configured, working: facebook.working },
        totalReviews: (google.totalRatings || 0) + (facebook.reviews.length || 0),
      },
    });
  } catch (error) {
    console.error('Reviews API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [], stats: { google: { count: 0, configured: false, working: false }, facebook: { count: 0, configured: false, working: false } } },
      { status: 500 }
    );
  }
}
