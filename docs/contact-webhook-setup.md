# Contact Webhook Setup

This project sends contact form submissions to `CONTACT_WEBHOOK_URL` when configured.

## 1) Configure `.env.local`

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
CONTACT_WEBHOOK_URL=https://your-webhook-endpoint
CONTACT_WEBHOOK_SECRET=replace-with-strong-secret
CONTACT_WEBHOOK_SECRET_HEADER=x-webhook-secret
```

If your provider does not require a secret header, leave `CONTACT_WEBHOOK_SECRET` empty.

## 2) Payload format

`POST` JSON payload sent to your webhook:

```json
{
  "name": "Nombre del cliente",
  "email": "cliente@email.com",
  "message": "Descripcion del caso",
  "sourcePath": "/contacto",
  "receivedAt": "2026-07-24T00:00:00.000Z",
  "meta": {
    "requestId": "uuid",
    "ip": "x.x.x.x",
    "userAgent": "browser user agent",
    "referer": "page referer"
  }
}
```

## 3) Recommended provider mappings

- Make / Zapier:
  - Trigger: Webhook Catch Hook
  - Action: Email / CRM / Slack notification
  - Validate `CONTACT_WEBHOOK_SECRET` against configured header
- Brevo Transactional API:
  - Use Make/Zapier webhook as adapter or point to your own serverless relay
- Resend:
  - Point webhook to your own relay endpoint that calls Resend API

## 4) Reliability behavior in this app

- Request timeout: 8 seconds
- Webhook errors return HTTP 502 to the frontend
- Success response to user is only returned when webhook accepts the request
- If no webhook is configured, submissions are logged server-side for local testing
