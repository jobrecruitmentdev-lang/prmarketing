import { test, expect } from "@playwright/test";

const targetPages = [
  { path: "/", name: "Homepage" },
  { path: "/about/", name: "About Page" },
  { path: "/services/", name: "Services Page" },
  { path: "/contact/", name: "Contact Page" },
];

test.describe("PR & SEO Hero Card Showcase", () => {
  for (const pageInfo of targetPages) {
    test(`is visible, properly linked, and responsive on ${pageInfo.name} (${pageInfo.path})`, async ({
      page,
    }) => {
      await page.goto(pageInfo.path);

      // Card link exists and points to /services/seo/
      const cardLink = page.locator('a[href="/services/seo/"]').first();
      await expect(cardLink).toBeVisible();

      // Card contains the PR SEO consultant image
      const image = cardLink.locator('img[src*="pr-seo-consultant"]');
      await expect(image).toBeVisible();

      // Ensure no horizontal scrollbar / overflow
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth,
      );
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
