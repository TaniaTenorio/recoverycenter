"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  fallbackGoogleReviews,
  type GoogleReview,
  type GoogleReviewsPayload,
} from "@/data/googleReviews";

const TARGET_REVIEW_COUNT = 12;

function normalizeReviewKey(review: GoogleReview): string {
  return `${review.author.toLowerCase()}|${review.text.toLowerCase()}`;
}

function buildDisplayReviews(liveReviews: GoogleReview[]): GoogleReview[] {
  const merged = [...liveReviews, ...fallbackGoogleReviews];
  const unique: GoogleReview[] = [];
  const seen = new Set<string>();

  for (const review of merged) {
    const key = normalizeReviewKey(review);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(review);

    if (unique.length >= TARGET_REVIEW_COUNT) {
      break;
    }
  }

  return unique;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="google-stars" aria-label={`Calificacion ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true" className="google-star">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ratingHeadline(rating: number): string {
  if (rating >= 4.8) {
    return "EXCELENTE";
  }

  if (rating >= 4.4) {
    return "MUY BUENO";
  }

  if (rating >= 4) {
    return "BUENO";
  }

  return "RECOMENDADO";
}

function initialsFromAuthor(author: string): string {
  const parts = author
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return "RC";
  }

  return parts
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase() || "")
    .join("");
}

function Avatar({ review }: { review: GoogleReview }) {
  if (review.avatarUrl) {
    return (
      <Image
        className="review-avatar"
        src={review.avatarUrl}
        alt={`Foto de ${review.author}`}
        width={42}
        height={42}
        loading="lazy"
      />
    );
  }

  return (
    <span className="review-avatar review-avatar--fallback" aria-hidden="true">
      {initialsFromAuthor(review.author)}
    </span>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      className="reviews-slider-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="reviews-slider-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
    </svg>
  );
}

export default function GoogleReviewsSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [payload, setPayload] = useState<GoogleReviewsPayload>({
    source: "fallback",
    reviews: fallbackGoogleReviews,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const refreshSliderButtons = () => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth - 2);
    setCanPrev(viewport.scrollLeft > 2);
    setCanNext(viewport.scrollLeft < maxScrollLeft);
  };

  const slideByViewport = (direction: "prev" | "next") => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollBy({
      left: direction === "next" ? viewport.clientWidth : -viewport.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const response = await fetch("/api/google-reviews", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as GoogleReviewsPayload;
        if (!isMounted || !data.reviews?.length) {
          return;
        }

        setPayload(data);
      } catch {
        // Keep fallback reviews when live feed is unavailable.
      }
    }

    void loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const onScroll = () => refreshSliderButtons();
    const onResize = () => refreshSliderButtons();

    refreshSliderButtons();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [payload.reviews.length]);

  const reviews: GoogleReview[] = buildDisplayReviews(payload.reviews);
  const ratingValue = payload.rating ?? 5;
  const roundedRating = Math.max(1, Math.min(5, Math.round(ratingValue)));
  const totalReviews = Math.max(payload.userRatingsTotal ?? 0, reviews.length);
  const headline = ratingHeadline(ratingValue);

  const toggleExpanded = (key: string) => {
    setExpandedCards((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <section className="section section-light reviews-section" aria-labelledby="resenas-clientes">
      <div className="container">
        <h2 id="resenas-clientes" className="section-title">
          Lo que opinan nuestros clientes
        </h2>

        <div className="reviews-summary reviews-summary--google" role="note">
          <div className="reviews-summary__fade">
            <p className="reviews-summary__headline">{headline}</p>
            <div className="reviews-summary__stars">
              <Stars rating={roundedRating} />
            </div>
            <p className="reviews-summary__count">
              A base de <strong>{totalReviews} reseñas</strong>
            </p>
            <div className="reviews-summary__logo">
              <Image
                src="https://cdn.trustindex.io/assets/platform/Google/logo.svg"
                alt="Google"
                width={150}
                height={35}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="reviews-slider-shell">
          {canPrev ? (
            <button
              type="button"
              className="reviews-slider-btn reviews-slider-btn--prev"
              onClick={() => slideByViewport("prev")}
              aria-label="Ver reseñas anteriores"
            >
              <ChevronLeftIcon />
            </button>
          ) : null}

          <div className="reviews-viewport" ref={viewportRef}>
            <div className="reviews-track">
              {reviews.map((review, index) => {
                const reviewKey = `${review.author}-${review.date}-${index}`;
                const shouldTruncate = review.text.length > 180;
                const isExpanded = Boolean(expandedCards[reviewKey]);

                return (
                  <article
                    key={reviewKey}
                    className={`review-card ${isExpanded ? "is-expanded" : ""}`}
                  >
                    <div className="review-card__head">
                      <div className="review-profile">
                        <Avatar review={review} />
                        <div>
                          <p className="review-author">{review.author}</p>
                          <p className="review-date">{review.date}</p>
                        </div>
                      </div>
                    </div>
                    <Stars rating={review.rating} />
                    <p className={`review-text ${!isExpanded ? "is-clamped" : ""}`}>
                      {review.text}
                    </p>
                    {shouldTruncate ? (
                      <button
                        type="button"
                        className="review-toggle"
                        onClick={() => toggleExpanded(reviewKey)}
                      >
                        {isExpanded ? "Ver menos" : "Ver más"}
                      </button>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="reviews-slider-btn reviews-slider-btn--next"
            onClick={() => slideByViewport("next")}
            disabled={!canNext}
            aria-label="Ver reseñas siguientes"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
