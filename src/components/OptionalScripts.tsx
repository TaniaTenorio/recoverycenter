"use client";

import Script from "next/script";

export default function OptionalScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  const cliengoScriptUrl = process.env.NEXT_PUBLIC_CLIENGO_SCRIPT_URL;
  const clickGuardianKey = process.env.NEXT_PUBLIC_CLICK_GUARDIAN_KEY?.trim();
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

      {clickGuardianKey ? (
        <>
          <Script id="click-guardian" strategy="afterInteractive">
            {`
              window._cgk = ${JSON.stringify(clickGuardianKey)};
              (function () {
                var _cg = document.createElement('script');
                _cg.type = 'text/javascript';
                _cg.async = true;
                _cg.src = 'https://v2.clickguardian.app/track.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(_cg, s);
              })();
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://v2.clickguardian.app/pixel?tkey=${encodeURIComponent(clickGuardianKey)}`}
              height="1"
              width="1"
              style={{ border: 0 }}
              alt="Click Guardian Tracking Pixel"
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
