import { NextResponse } from "next/server";
import type { GoogleReview, GoogleReviewsPayload } from "@/data/googleReviews";

export const runtime = "nodejs";

type GooglePlaceReview = {
  author_name?: string;
  relative_time_description?: string;
  text?: string;
  rating?: number;
  profile_photo_url?: string;
};

type GooglePlacesResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlaceReview[];
  };
  status?: string;
  error_message?: string;
};

const GOOGLE_PLACES_ENDPOINT =
  "https://maps.googleapis.com/maps/api/place/details/json";

function toInternalReview(review: GooglePlaceReview): GoogleReview {
  return {
    author: review.author_name || "Cliente verificado",
    date: review.relative_time_description || "Reseña reciente",
    rating: Math.max(1, Math.min(5, Math.round(review.rating || 5))),
    text: review.text || "Excelente servicio.",
    avatarUrl: review.profile_photo_url,
  };
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        message: "Faltan GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID.",
      },
      { status: 400 },
    );
  }

  const url = new URL(GOOGLE_PLACES_ENDPOINT);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("language", "es");
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Google Places rechazo la solicitud.",
        },
        { status: 502 },
      );
    }

    const data = (await response.json()) as GooglePlacesResponse;

    if (data.status !== "OK") {
      return NextResponse.json(
        {
          message: "Google Places devolvio un estado invalido.",
          status: data.status,
          error: data.error_message,
        },
        { status: 502 },
      );
    }

    const reviews = (data.result?.reviews || []).slice(0, 12).map(toInternalReview);

    const payload: GoogleReviewsPayload = {
      source: "google_places",
      placeName: data.result?.name,
      rating: data.result?.rating,
      userRatingsTotal: data.result?.user_ratings_total,
      reviews,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "No se pudo obtener reseñas en vivo.",
        error: error instanceof Error ? error.message : "unknown",
      },
      { status: 502 },
    );
  }
}
