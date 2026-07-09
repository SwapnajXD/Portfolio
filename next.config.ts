import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the site from being embedded in an iframe on another domain
  // (blocks clickjacking attacks)
  { key: "X-Frame-Options", value: "DENY" },

  // Stops browsers from guessing content types, which can be abused to
  // execute disguised scripts
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Limits how much referrer info leaks to other sites when someone
  // clicks a link out of your site
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Disables browser features you don't use, so an XSS bug (if one ever
  // existed) can't escalate into camera/mic/location access etc.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },

  // Forces HTTPS for a year, including subdomains, once a browser has
  // seen it once (only takes effect once actually served over HTTPS,
  // e.g. on Vercel)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // Content Security Policy: restricts what the page is allowed to load
  // and run. 'unsafe-inline' on script-src is required for the theme
  // no-flash init script and Next.js's own hydration data; everything
  // else is locked to same-origin.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.countapi.xyz https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // stop advertising "X-Powered-By: Next.js" to scanners
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
