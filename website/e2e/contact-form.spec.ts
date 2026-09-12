import { test, expect } from "@playwright/test";

test.describe("Enquiry form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact/");
  });

  test("required fields block submission (HTML5 validity)", async ({ page }) => {
    const submit = page.getByRole("button", { name: /send enquiry/i });
    await submit.click();
    // Browser-native required validation keeps us on the page — no mailto navigation fired
    const nameInvalid = await page.locator("#name").evaluate(
      (el: HTMLInputElement) => !el.validity.valid,
    );
    expect(nameInvalid).toBe(true);
  });

  test("invalid email format is rejected by the input's type=email validity", async ({
    page,
  }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "not-an-email");
    const emailValid = await page.locator("#email").evaluate(
      (el: HTMLInputElement) => el.validity.valid,
    );
    expect(emailValid).toBe(false);
  });

  test("happy path: filling all required fields enables a valid submission", async ({
    page,
  }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.selectOption("#service", "SEO / Technical SEO");
    await page.fill("#message", "We need help ranking for local SEO in Ahmedabad.");

    const formValid = await page.evaluate(() => {
      const form = document.querySelector("form");
      return form ? form.checkValidity() : false;
    });
    expect(formValid).toBe(true);
  });

  // Security: XSS payload in free-text fields must not execute or break the page
  test("XSS payload in message field does not execute and page stays intact", async ({
    page,
  }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.selectOption("#service", "Not sure yet — need guidance");
    await page.fill(
      "#message",
      '<script>window.__xss = true;</script><img src=x onerror="window.__xss=true">',
    );

    const xssFired = await page.evaluate(
      () => (window as unknown as { __xss?: boolean }).__xss,
    );
    expect(xssFired).toBeFalsy();
    // Page must still be functional after the payload is entered
    await expect(page.getByRole("button", { name: /send enquiry/i })).toBeEnabled();
  });

  // Boundary: very long input must not crash the form or the page
  test("oversized message input does not break the form", async ({ page }) => {
    const longText = "A".repeat(20000);
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.selectOption("#service", "SEO / Technical SEO");
    await page.fill("#message", longText);
    await expect(page.locator("#message")).toHaveValue(longText);
  });

  test("phone field is optional — form is valid without it", async ({ page }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.selectOption("#service", "SEO / Technical SEO");
    await page.fill("#message", "Looking for a website redesign.");
    const formValid = await page.evaluate(() =>
      document.querySelector("form")?.checkValidity(),
    );
    expect(formValid).toBe(true);
  });
});
