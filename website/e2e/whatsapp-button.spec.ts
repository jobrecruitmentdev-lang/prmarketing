import { test, expect } from "@playwright/test";

const testRoutes = ["/", "/about/", "/services/", "/contact/", "/tools/"];

test.describe("WhatsApp Scrolling Floating Button", () => {
  for (const route of testRoutes) {
    test(`is visible, fixed, and properly linked on ${route}`, async ({ page }) => {
      await page.goto(route);

      const whatsappBtn = page.locator('aside[aria-label="WhatsApp quick contact"] a');
      await expect(whatsappBtn).toBeVisible();

      // Check href contains wa.me and official phone number
      await expect(whatsappBtn).toHaveAttribute("href", /https:\/\/wa\.me\/918160666408/);
      await expect(whatsappBtn).toHaveAttribute("target", "_blank");
      await expect(whatsappBtn).toHaveAttribute("rel", /noopener/);

      // Verify it stays in viewport after scrolling down
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(150);
      await expect(whatsappBtn).toBeInViewport();
    });
  }

  test("is accessible and has proper labels", async ({ page }) => {
    await page.goto("/");
    const whatsappBtn = page.locator('aside[aria-label="WhatsApp quick contact"] a');
    await expect(whatsappBtn).toHaveAttribute("aria-label", /WhatsApp/i);
    await expect(whatsappBtn).toHaveAttribute("title", /WhatsApp/i);
  });
});
