"use client";

import Script from "next/script";

const ALLOWED_OPTIONAL_SCRIPT_HOSTS = new Set(["s.cliengo.com"]);

function getAllowedOptionalScriptUrl(rawUrl: string | undefined): string | null {
  if (!rawUrl) {
    return null;
  }

  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol !== "https:") {
      return null;
    }

    return ALLOWED_OPTIONAL_SCRIPT_HOSTS.has(parsed.hostname) ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export default function OptionalScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  const cliengoScriptUrl = getAllowedOptionalScriptUrl(
    process.env.NEXT_PUBLIC_CLIENGO_SCRIPT_URL,
  );
  const gtagIds = [gaId, googleAdsId].filter((id): id is string => Boolean(id));

  return (
    <>
      {gtagIds.length ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`}
            strategy="afterInteractive"
          />
          <Script id="ga-script" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gtagIds.map((id) => `gtag('config', '${id}');`).join("\n")}
            `}
          </Script>
        </>
      ) : null}

      {cliengoScriptUrl ? (
        <Script src={cliengoScriptUrl} strategy="afterInteractive" />
      ) : null}
    </>
  );
}
