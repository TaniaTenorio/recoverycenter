# WordPress Plugin to Next.js Mapping

This document maps the current WordPress plugins to equivalent Next.js integrations.

## Core migration assumptions

- Frontend is rebuilt in Next.js App Router.
- Existing WordPress site remains online until content and SEO parity is complete.
- Forms, analytics, SEO metadata, and messaging integrations are replaced incrementally.

## Plugin replacement table

| WordPress plugin | Purpose today | Next.js replacement |
| --- | --- | --- |
| elementor + king-addons + drozd-addons-for-elementor | Page builder and widgets | Native React components, section-driven content model, custom CSS modules/global CSS |
| astra (theme) | Theme, layout, typography, header/footer conventions | App Router layout in [src/app/layout.tsx](../src/app/layout.tsx) + global tokens in [src/app/globals.css](../src/app/globals.css) |
| contact-form-7 | Contact forms | Next.js Route Handler (`src/app/api/contact/route.ts`) + provider (Resend, SendGrid, Mailgun) |
| wordpress-seo (Yoast) | Meta tags, OpenGraph, sitemaps | Next.js Metadata API + `next-sitemap` package |
| google-site-kit | GA/GTM/Search Console tooling | `@next/third-parties/google` + manual Search Console verification |
| header-and-footer-scripts | Inject scripts/snippets | `src/app/layout.tsx` with `<Script />` from `next/script` |
| creame-whatsapp-me / cliengo | WhatsApp/chat widgets | Official widget snippet loaded through `next/script` |
| smart-slider-3 / popup-builder | Sliders and popups | React carousel library (Swiper/Embla) + lightweight modal component |
| mailin (Brevo) | Email marketing + forms + tracking | Brevo API from Route Handlers + webhooks |
| wp-reviews-plugin-for-google | Google reviews widget | Google Places API fetch + custom reviews component |
| duplicate-page / wp-rollback / one-click-demo-import | Admin/dev utilities | Not needed in production Next.js runtime |
| mantenimiento-web | Maintenance mode | Middleware redirect or hosting-level maintenance page |

## Recommended next implementation order

1. Migrate homepage sections and visual styles.
2. Implement contact API endpoint and wire the form.
3. Recreate all important service pages as route segments.
4. Add SEO metadata and XML sitemap.
5. Add analytics/tag manager scripts.
6. Add chat/WhatsApp widget.
7. Run Lighthouse and compare with WordPress baseline.

## Data and media strategy

- Keep current uploads available from WordPress CDN/domain during phase 1.
- Move critical assets to `public/` for long-term control.
- Normalize media names to ASCII-safe slugs before bulk migration.
