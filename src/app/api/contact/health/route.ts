import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

function parseSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const portRaw = process.env.SMTP_PORT?.trim() || "465";
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase() || "true";

  if (!host || !user || !pass) {
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
  };
}

function maskUser(user: string): string {
  const [localPart, domain] = user.split("@");
  if (!localPart || !domain) {
    return "hidden";
  }

  const visible = localPart.slice(0, 2);
  return `${visible}***@${domain}`;
}

function isAuthorized(request: Request): boolean {
  const healthToken = process.env.CONTACT_HEALTHCHECK_TOKEN?.trim();
  if (!healthToken) {
    return true;
  }

  const provided = request.headers.get("x-contact-health-token")?.trim();
  return provided === healthToken;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  let smtpConfig: SmtpConfig | null;

  try {
    smtpConfig = parseSmtpConfig();
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Configuracion SMTP invalida.",
      },
      { status: 400 },
    );
  }

  if (!smtpConfig) {
    return NextResponse.json(
      {
        message: "Falta configurar SMTP_HOST, SMTP_USER o SMTP_PASS.",
      },
      { status: 400 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
    connectionTimeout: 7000,
    greetingTimeout: 7000,
    socketTimeout: 7000,
  });

  try {
    await transporter.verify();

    return NextResponse.json(
      {
        ok: true,
        message: "Conexion SMTP verificada.",
        smtp: {
          host: smtpConfig.host,
          port: smtpConfig.port,
          secure: smtpConfig.secure,
          user: maskUser(smtpConfig.user),
        },
        checkedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo verificar la conexion SMTP.",
        error: error instanceof Error ? error.message : "unknown",
      },
      { status: 502 },
    );
  }
}
