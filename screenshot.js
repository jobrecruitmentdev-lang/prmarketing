const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Dell/.gemini/antigravity-cli/brain/46718ff0-7667-4156-9610-17244a52334f/pr_marketing_brochure.html', { waitUntil: 'networkidle' });
  
  // Set viewport to roughly A4 size portrait (210mm x 297mm at 96 PPI)
  await page.setViewportSize({ width: 794, height: 1123 });
  
  await page.screenshot({ 
    path: 'C:/Users/Dell/.gemini/antigravity-cli/brain/46718ff0-7667-4156-9610-17244a52334f/scratch/brochure_cover_preview.png',
    clip: { x: 0, y: 0, width: 794, height: 1123 }
  });
  
  await browser.close();
})();
