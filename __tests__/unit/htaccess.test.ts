import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/* .htaccess directives only take effect on Apache/LiteSpeed (Hostinger) —
   the local static preview server (`serve`/http.server) does not process
   them, so we audit the config file directly rather than live headers. */
const htaccess = readFileSync(
  path.resolve(__dirname, "../../public/.htaccess"),
  "utf-8",
);

describe(".htaccess security headers", () => {
  it("sets X-Content-Type-Options: nosniff", () => {
    expect(htaccess).toMatch(/X-Content-Type-Options\s+"nosniff"/);
  });

  it("sets X-Frame-Options to prevent clickjacking", () => {
    expect(htaccess).toMatch(/X-Frame-Options\s+"SAMEORIGIN"/);
  });

  it("sets a Content-Security-Policy with no wildcard script-src", () => {
    const match = htaccess.match(/Content-Security-Policy\s+"([^"]+)"/);
    expect(match).not.toBeNull();
    const csp = match![1];
    expect(csp).toContain("default-src 'self'");
    expect(csp).not.toMatch(/script-src[^;]*\*/);
    expect(csp).toContain("object-src 'none'");
  });

  it("sets Referrer-Policy", () => {
    expect(htaccess).toMatch(/Referrer-Policy\s+"strict-origin-when-cross-origin"/);
  });

  it("disables directory listing", () => {
    expect(htaccess).toMatch(/Options\s+-Indexes/);
  });

  it("routes 404s to the generated 404 page", () => {
    expect(htaccess).toMatch(/ErrorDocument 404 \/404\.html/);
  });

  it("caches hashed build assets immutably but revalidates HTML", () => {
    expect(htaccess).toMatch(/js\|css\|woff2[\s\S]*?immutable/);
    expect(htaccess).toMatch(/html\|xml\|txt[\s\S]*?must-revalidate/);
  });
});
