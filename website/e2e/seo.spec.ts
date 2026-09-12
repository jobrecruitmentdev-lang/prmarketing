import { test, expect } from "@playwright/test";

const pages = [
  "/",
  "/about/",
  "/services/",
  "/services/seo/",
  "/services/local-seo/",
  "/services/web-development/",
  "/services/ecommerce/",
  "/services/ai-seo/",
  "/services/marketing-automation/",
  "/pricing/",
  "/portfolio/",
  "/contact/",
];

for (const path of pages) {
  test(`${path} has canonical, meta description, and valid JSON-LD`, async ({ page }) => {
    await page.goto(path);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /^https:\/\/prmarketingventures\.com/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.{20,}/);

    // og:image must resolve to the build-time generated image, not be missing
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/,
    );

    const ldJsonBlocks = await page.locator('script[type="application/ld+json"]').all();
    expect(ldJsonBlocks.length).toBeGreaterThan(0);
    for (const block of ldJsonBlocks) {
      const raw = await block.textContent();
      expect(() => JSON.parse(raw ?? "")).not.toThrow();
    }
  });
}

test("sitemap.xml lists all pages", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  for (const path of pages) {
    expect(body).toContain(`prmarketingventures.com${path}`);
  }
});

test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/Allow:\s*\//i);
  expect(body).toMatch(/Sitemap:.*sitemap\.xml/i);
});

test("only one h1 exists per page (SEO/a11y heading structure)", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});
