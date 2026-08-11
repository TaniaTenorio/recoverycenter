import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://s.cliengo.com",
      "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://s.cliengo.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.trustindex.io https://recoverycenter.com.mx https://www.recoverycenter.com.mx https://www.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://www.google.com https://google.com",
      "connect-src 'self' https://maps.googleapis.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://ad.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://google.com",
      "frame-src 'self' https://www.google.com https://www.googletagmanager.com",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "maps.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.trustindex.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
