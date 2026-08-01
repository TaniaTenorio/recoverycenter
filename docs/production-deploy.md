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

## 4) Post-deploy smoke test

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

## 5) Fast troubleshooting

- Contact form fails with 502: check SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_SECURE.
- SMTP auth errors: re-check mailbox password and quoting rules for special characters.
- No chat widget: verify NEXT_PUBLIC_CLIENGO_SCRIPT_URL.
- Wrong WhatsApp destination/message: verify NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_WHATSAPP_MESSAGE.
- Reviews not updating: verify GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.

## 6) Rollback plan

If a release fails:

1. Roll back to the previous deployment in your hosting provider.
2. Restore previous env variable values.
3. Re-run smoke tests.
