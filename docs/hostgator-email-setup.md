# HostGator Email Setup (SMTP)

This project can send contact form submissions directly by SMTP from `src/app/api/contact/route.ts`.

## 1) Create/confirm mailbox in HostGator

In cPanel:

1. Open Email Accounts.
2. Create or verify an account like `contacto@yourdomain.com`.
3. Keep mailbox username and password ready.

## 2) Find SMTP details

Typical HostGator values:

- Host: `mail.yourdomain.com`
- Port: `465`
- Secure/SSL: `true`
- Username: full email address (example: `contacto@yourdomain.com`)
- Password: mailbox password

If your plan shows different server values in cPanel, use those exact values.

## 3) Configure `.env.local`

Add:

```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contacto@yourdomain.com
SMTP_PASS=your-mailbox-password
CONTACT_FROM_EMAIL=Recovery Center <contacto@yourdomain.com>
CONTACT_TO_EMAIL=ventas@yourdomain.com,yessica.torres@yourdomain.com
```

Notes:

- `CONTACT_FROM_EMAIL`: Sender shown in inbox.
- `CONTACT_TO_EMAIL`: Destination inbox for new leads. Use comma-separated emails for multiple recipients.
- `replyTo` is automatically set to the visitor email from the form.

## 4) Restart and test

```bash
npm run dev
```

Then submit `/contacto` and confirm the email arrives.

### Optional: SMTP health check endpoint

You can verify SMTP connectivity directly without sending a lead email:

```bash
curl -sS http://localhost:3000/api/contact/health
```

If you define `CONTACT_HEALTHCHECK_TOKEN`, call it with:

```bash
curl -sS \
	-H "x-contact-health-token: your-token" \
	http://localhost:3000/api/contact/health
```

Expected success response includes `ok: true` and masked SMTP user.

## 5) Troubleshooting

- Authentication error: verify mailbox password and username format (full email).
- TLS/SSL error: ensure port/secure pair is correct (`465/true` or `587/false`).
- Delivery delay/spam: check spam folder and add SPF/DKIM in cPanel DNS zone.
- If SMTP vars are incomplete, the app falls back to webhook mode if `CONTACT_WEBHOOK_URL` is configured.
