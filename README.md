# WordPress to Next.js Migration Baseline

This folder contains the first migration baseline of your WordPress site into a Next.js App Router project.

## What is already migrated

- Next.js application scaffold in `nextjs-migration`.
- Home page structure recreated with React components and Elementor-inspired styling.
- Theme tokens and typography adapted from the WordPress design.
- Global site shell added with shared header/footer components.
- Migration content model added in `src/data/siteContent.ts`.
- Service route model added in `src/data/services.ts`.
- New route pages: `src/app/servicios/page.tsx` and `src/app/servicios/[slug]/page.tsx`.
- Additional migrated pages: `src/app/nosotros/page.tsx` and `src/app/contacto/page.tsx`.
- Shared business profile data in `src/data/companyProfile.ts`.
- Contact form connected to API route (`src/app/api/contact/route.ts`).
- SEO baseline routes added: `src/app/robots.ts` and `src/app/sitemap.ts`.
- Initial plugin replacement mapping added in `docs/plugin-mapping.md`.
- Homepage critical backgrounds moved to local assets in `public/images/`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validation commands

```bash
npm run lint
npm run build
```

Both commands are currently passing.

Deployment handoff guide: [docs/production-deploy.md](docs/production-deploy.md).

## Important migration notes

- Hero and key section backgrounds now use local assets from `public/images/`.
- Contact API accepts submissions and validates payloads.
- Optional outbound forwarding can be configured with `CONTACT_WEBHOOK_URL` in `.env.local` (see `.env.example`).
- Full webhook configuration guide: `docs/contact-webhook-setup.md`.
- Direct SMTP email delivery is supported (HostGator compatible) using `SMTP_*` plus `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`.
- Optional analytics and chat can be enabled with `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_CLICK_GUARDIAN_KEY`, `NEXT_PUBLIC_CLIENGO_SCRIPT_URL`, and `NEXT_PUBLIC_WHATSAPP_*` vars.
- Google reviews section can use live Google Places data with `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`.
- Analytics, chat widget, and CMS content sync are pending.

## Production env checklist

Set these variables in your hosting provider before go-live:

Required for current contact flow (SMTP):

```bash
SMTP_HOST=mail.recoverycenter.com.mx
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contacto@recoverycenter.com.mx
SMTP_PASS="your-real-smtp-password"
CONTACT_FROM_EMAIL=contacto@recoverycenter.com.mx
CONTACT_TO_EMAIL=contacto@recoverycenter.com.mx,yessica.torres@recoverycenter.com.mx
```

Recommended public variables:

```bash
NEXT_PUBLIC_SITE_URL=https://recoverycenter.com.mx
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_CLICK_GUARDIAN_KEY=
NEXT_PUBLIC_CLIENGO_SCRIPT_URL=https://s.cliengo.com/weboptimizer/5afb666de4b069d06e9b6e10/5ff5dd29bfa9d5002a878fb8.js
NEXT_PUBLIC_WHATSAPP_NUMBER=5215551851551
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola, quiero informacion sobre recuperacion de datos.
NEXT_PUBLIC_WHATSAPP_DISPLAY=+52 1 55 5185 1551
```

Optional integrations:

```bash
NEXT_PUBLIC_GA_ID=
CONTACT_HEALTHCHECK_TOKEN=
CONTACT_WEBHOOK_URL=
CONTACT_WEBHOOK_SECRET=
CONTACT_WEBHOOK_SECRET_HEADER=x-webhook-secret
```

Notes:

- Keep secrets only in deployment env settings or `.env.local`, never in `.env.example`.
- If `SMTP_PASS` contains `#`, keep it quoted (example: `SMTP_PASS="my#password"`).
- Restart/redeploy after changing env vars.

## Suggested next implementation steps

1. Contact form SMTP delivery is now configured and validated with HostGator, including delivery to multiple recipients.
2. Replace placeholder phone/email/copy in `src/data/companyProfile.ts` with final business content.
3. Add stronger spam protection on top of the existing honeypot before production launch.
4. Prepare production deployment environment variables so SMTP and optional integrations work outside local development.

## To Do (Design-First MVP)

Goal: polish UX/UI and visual consistency to present a strong MVP to the client before production integrations.

1. Update visual identity with final brand assets (logo, color palette, typography scale).
2. Refine homepage hierarchy (hero, service cards, trust signals, primary CTA clarity).
3. Improve responsive behavior for tablet/mobile spacing, typography, and nav usability.
4. Add consistent section-level motion (subtle reveal/hover transitions) with accessibility-safe defaults.
5. Upgrade service pages visual system (card rhythm, iconography, content scanability).
6. Replace placeholder copy and contact details with client-approved content.
7. Add social proof blocks (testimonials, certifications, client logos) where applicable.
8. Build a final QA checklist for the demo: visual consistency, mobile checks, form UX, and basic performance.

After MVP approval, continue with technical production tasks:

1. Connect contact endpoint to provider (Brevo/Resend/Make/Zapier).
2. Add policy/legal pages and footer links.
3. Migrate remaining content pages (blog and additional WordPress landing pages).
