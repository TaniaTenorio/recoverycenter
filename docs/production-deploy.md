# Production Deployment Checklist

This document is a handoff guide to publish the Next.js migration in production.

## 1) Environment variables

Set these variables in your hosting provider.

### Required (contact form SMTP)

```bash
SMTP_HOST=mail.recoverycenter.com.mx
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contacto@recoverycenter.com.mx
SMTP_PASS="your-real-smtp-password"
CONTACT_FROM_EMAIL=contacto@recoverycenter.com.mx
CONTACT_TO_EMAIL=contacto@recoverycenter.com.mx,yessica.torres@recoverycenter.com.mx
```

### Recommended public variables

```bash
NEXT_PUBLIC_SITE_URL=https://recoverycenter.com.mx
NEXT_PUBLIC_CLIENGO_SCRIPT_URL=https://s.cliengo.com/weboptimizer/5afb666de4b069d06e9b6e10/5ff5dd29bfa9d5002a878fb8.js
NEXT_PUBLIC_WHATSAPP_NUMBER=5215551851551
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola, quiero informacion sobre recuperacion de datos.
NEXT_PUBLIC_WHATSAPP_DISPLAY=+52 1 55 5185 1551
```

### Optional variables

```bash
NEXT_PUBLIC_GA_ID=
CONTACT_HEALTHCHECK_TOKEN=
CONTACT_WEBHOOK_URL=
CONTACT_WEBHOOK_SECRET=
CONTACT_WEBHOOK_SECRET_HEADER=x-webhook-secret
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
```

## 2) Security notes

- Keep secrets only in platform env settings or .env.local.
- Never store real secrets in .env.example.
- If SMTP_PASS contains #, keep it quoted.

## 3) Build and release

Run before release:

```bash
npm run lint
npm run build
```

Deploy the generated application with your provider workflow.

## 4) GitHub Actions setup

This repository includes:

- .github/workflows/ci.yml: runs lint + build on push and pull requests to main.
- .github/workflows/deploy-vercel.yml: deploys to Vercel on push to main.

Add these GitHub repository secrets before enabling production deploys:

```bash
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

How to get each value:

1. VERCEL_TOKEN: Vercel dashboard -> Settings -> Tokens -> Create Token.
2. VERCEL_ORG_ID and VERCEL_PROJECT_ID: run `vercel link` locally once, then copy from `.vercel/project.json`.

Optional first-run test:

1. Go to Actions in GitHub.
2. Run workflow: "Deploy to Vercel" using workflow_dispatch.
3. Confirm a production URL is created.

## 5) Branch protection recommendation (main)

In GitHub: Settings -> Branches -> Add rule (or ruleset) for main.

Recommended minimum:

1. Require a pull request before merging.
2. Require status checks to pass before merging.
3. Select check: `CI / quality-and-build`.
4. Restrict direct pushes to main (optional but recommended).

## 6) Post-deploy smoke test

Run these checks after deployment:

1. Open home page, services, contact, and about pages.
2. Submit a contact form from /contacto.
3. Confirm delivery in both inboxes:
   - contacto@recoverycenter.com.mx
   - yessica.torres@recoverycenter.com.mx
4. Verify chat and CTA integrations:
   - Cliengo widget appears.
   - WhatsApp launcher opens a prefilled conversation.
5. Verify sitemap and robots:
   - /sitemap.xml
   - /robots.txt

## 7) Fast troubleshooting

- Contact form fails with 502: check SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_SECURE.
- SMTP auth errors: re-check mailbox password and quoting rules for special characters.
- No chat widget: verify NEXT_PUBLIC_CLIENGO_SCRIPT_URL.
- Wrong WhatsApp destination/message: verify NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_WHATSAPP_MESSAGE.
- Reviews not updating: verify GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.

## 8) Rollback plan

If a release fails:

1. Roll back to the previous deployment in your hosting provider.
2. Restore previous env variable values.
3. Re-run smoke tests.
