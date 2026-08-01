import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  sourcePath?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBHOOK_TIMEOUT_MS = 8000;

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  toEmails: string[];
  fromEmail: string;
};

function sanitize(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

function validate(payload: ContactPayload): string | null {
  const name = sanitize(payload.name || "");
  const email = sanitize(payload.email || "");
  const message = sanitize(payload.message || "");

  if (!name || name.length < 2 || name.length > 120) {
    return "Nombre invalido. Usa entre 2 y 120 caracteres.";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Correo invalido.";
  }

  if (!message || message.length < 10 || message.length > 4000) {
    return "Mensaje invalido. Usa entre 10 y 4000 caracteres.";
  }

  return null;
}

function parseRecipientList(rawRecipients: string): string[] {
  const recipients = rawRecipients
    .split(",")
    .map((recipient) => sanitize(recipient))
    .filter(Boolean);

  if (recipients.length === 0) {
    throw new Error("CONTACT_TO_EMAIL invalido.");
  }

  const invalidRecipient = recipients.find((recipient) => !EMAIL_REGEX.test(recipient));
  if (invalidRecipient) {
    throw new Error("CONTACT_TO_EMAIL invalido.");
  }

  return recipients;
}

function parseSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const portRaw = process.env.SMTP_PORT?.trim() || "465";
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase() || "true";

  if (!host || !user || !pass || !toEmail || !fromEmail) {
    return null;
  }

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("SMTP_PORT invalido.");
  }

  return {
    host,
    port,
    secure: secureRaw === "true",
    user,
    pass,
    toEmails: parseRecipientList(toEmail),
    fromEmail,
  };
}

async function sendBySmtp(config: SmtpConfig, payload: ReturnType<typeof normalizePayload>) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const textBody = [
    "Nuevo mensaje desde el formulario de contacto",
    "",
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Origen: ${payload.sourcePath}`,
    `Fecha: ${payload.receivedAt}`,
    "",
    "Mensaje:",
    payload.message,
  ].join("\n");

  const htmlBody = `
    <h2>Nuevo mensaje desde el formulario de contacto</h2>
    <p><strong>Nombre:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Origen:</strong> ${payload.sourcePath}</p>
    <p><strong>Fecha:</strong> ${payload.receivedAt}</p>
    <hr />
    <p><strong>Mensaje:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
  `;

  await transporter.sendMail({
    from: config.fromEmail,
    to: config.toEmails,
    replyTo: payload.email,
    subject: `Nuevo contacto: ${payload.name}`,
    text: textBody,
    html: htmlBody,
  });
}

function normalizePayload(payload: ContactPayload) {
  return {
    name: sanitize(payload.name || ""),
    email: sanitize(payload.email || ""),
    message: sanitize(payload.message || ""),
    sourcePath: sanitize(payload.sourcePath || "/"),
    receivedAt: new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "No se pudo procesar la solicitud." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept bot requests to avoid signal.
  if (payload.company && payload.company.trim().length > 0) {
    return NextResponse.json({ message: "Mensaje recibido." }, { status: 200 });
  }

  const errorMessage = validate(payload);
  if (errorMessage) {
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }

  const normalized = normalizePayload(payload);

  const requestMeta = {
    requestId: crypto.randomUUID(),
    ip:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
    referer: request.headers.get("referer") || "unknown",
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const webhookSecret = process.env.CONTACT_WEBHOOK_SECRET;
  const webhookSecretHeader =
    process.env.CONTACT_WEBHOOK_SECRET_HEADER || "x-webhook-secret";

  try {
    const smtpConfig = parseSmtpConfig();
    if (smtpConfig) {
      await sendBySmtp(smtpConfig, normalized);

      console.info("[contact-form] SMTP delivered", {
        requestId: requestMeta.requestId,
      });

      return NextResponse.json(
        {
          message:
            "Gracias. Recibimos tu mensaje y te responderemos a la brevedad.",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("[contact-form] SMTP failed", {
      requestId: requestMeta.requestId,
      error: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json(
      { message: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 502 },
    );
  }

  if (webhookUrl) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhookSecret
            ? {
                [webhookSecretHeader]: webhookSecret,
              }
            : {}),
        },
        body: JSON.stringify({
          ...normalized,
          meta: requestMeta,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!webhookResponse.ok) {
        console.error("[contact-form] Webhook rejected", {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          requestId: requestMeta.requestId,
        });

        return NextResponse.json(
          { message: "No se pudo enviar el mensaje. Intenta de nuevo." },
          { status: 502 },
        );
      }

      console.info("[contact-form] Webhook delivered", {
        requestId: requestMeta.requestId,
      });
    } catch (error) {
      clearTimeout(timeoutId);

      console.error("[contact-form] Webhook failed", {
        requestId: requestMeta.requestId,
        error: error instanceof Error ? error.message : "unknown",
      });

      return NextResponse.json(
        { message: "No se pudo enviar el mensaje. Intenta de nuevo." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact-form] Submission received", {
      ...normalized,
      meta: requestMeta,
    });
  }

  return NextResponse.json(
    {
      message:
        "Gracias. Recibimos tu mensaje y te responderemos a la brevedad.",
    },
    { status: 200 },
  );
}
