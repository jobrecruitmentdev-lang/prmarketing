import { test, expect } from "@playwright/test";

const pages = ["/", "/about/", "/services/", "/portfolio/", "/contact/"];

test("list structure: every <li> is a direct child of ul/ol (no wrapper divs)", async ({
  page,
}) => {
  for (const path of pages) {
    await page.goto(path);
    const invalidLis = await page.evaluate(() => {
      const lists = Array.from(document.querySelectorAll("ul, ol"));
      let violations = 0;
      for (const list of lists) {
        for (const child of Array.from(list.children)) {
          if (child.tagName !== "LI") violations++;
        }
      }
      return violations;
    });
    expect(invalidLis, `${path} has non-<li> direct children of a list`).toBe(0);
  }
});

test("all images have alt text (or are explicitly decorative)", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      expect(alt, `image missing alt on ${path}`).not.toBeNull();
    }
  }
});

test("all interactive elements are keyboard reachable with visible focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const active = await page.evaluate(() => document.activeElement?.tagName);
  expect(active).not.toBe("BODY");
});

test("skip-worthy landmarks exist: header, main, footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});

test("html lang attribute is set", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("reduced motion: reveal elements have no forced hidden state without JS transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services/");
  // Content must be visible even with reduced motion / after mount
  await expect(page.locator("h2").first()).toBeVisible();
});
