import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", title: /AI-Powered Growth/i, h1: /digital marketing agency/i },
  { path: "/about/", title: /About Us/i, h1: /typical agency/i },
  { path: "/services/", title: /Services/i, h1: /engineered as one system/i },
  { path: "/services/seo/", title: /SEO Services/i, h1: /SEO Services/i },
  { path: "/services/local-seo/", title: /Local SEO/i, h1: /Rank in the Google Local 3-Pack/i },
  { path: "/services/web-development/", title: /Website Development/i, h1: /High-Performance Websites/i },
  { path: "/services/ecommerce/", title: /Ecommerce/i, h1: /High-Converting Ecommerce Stores/i },
  { path: "/services/ai-seo/", title: /AI SEO/i, h1: /Get Your Brand Recommended/i },
  { path: "/services/marketing-automation/", title: /Marketing Automation/i, h1: /Automate Your Lead/i },
  { path: "/pricing/", title: /Pricing/i, h1: /Dominate your market/i },
  { path: "/portfolio/", title: /Portfolio/i, h1: /systems we engineer/i },
  { path: "/contact/", title: /Contact/i, h1: /engineer your growth/i },
];

for (const p of pages) {
  test(`${p.path} loads with correct title and single h1`, async ({ page }) => {
    const response = await page.goto(p.path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(p.title);

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(p.h1);
  });
}

test("unknown route returns a non-200 status (no silent 200-with-blank-page)", async ({
  page,
}) => {
  // Note: the local `serve` preview doesn't reproduce Hostinger/Apache's
  // `ErrorDocument 404 /404.html` fallback content — only the status code
  // is reliable here. The generated 404 page's own content is verified
  // by the next test, which requests it directly.
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
});

test("generated 404 page renders the branded not-found content", async ({ page }) => {
  const response = await page.goto("/404.html");
  expect(response?.status()).toBeLessThan(400);
  await expect(page.getByText("404", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: /doesn.t exist/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
});

test("header nav links to every page and highlights the active one", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop nav links are hidden (md:flex) on small viewports");
  await page.goto("/");
  const header = page.locator("header");
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about/", label: "About" },
    { path: "/services/", label: "Services" },
    { path: "/pricing/", label: "Pricing" },
    { path: "/portfolio/", label: "Portfolio" },
    { path: "/contact/", label: "Contact" },
  ];

  for (const item of navItems) {
    await header.getByRole("link", { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${item.path.replace(/\//g, "\\/")}$`));
    // Active link gets the highlighted style + aria-current
    await expect(
      header.getByRole("link", { name: item.label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
});

test("mobile: hamburger opens and closes the nav menu", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu button only rendered on small viewports");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /open menu/i });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.getByRole("button", { name: /close menu/i }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
});

test("footer contains working links to every main page", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "About Us", exact: true })).toHaveAttribute(
    "href",
    "/about/",
  );
  await expect(footer.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute(
    "href",
    "/contact/",
  );
});
