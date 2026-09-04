const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://blazebyte-restaurent.vercel.app/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'public/images/blazebyte-restaurant.png', fullPage: false });
    console.log('Screenshot saved to public/images/blazebyte-restaurant.png');
    
    // Also save mobile screenshot
    await page.setViewport({ width: 390, height: 844 });
    await page.screenshot({ path: 'public/images/blazebyte-restaurant-mobile.png', fullPage: false });
    console.log('Screenshot saved to public/images/blazebyte-restaurant-mobile.png');

    await browser.close();
  } catch (err) {
    console.error('Error taking screenshot:', err);
  }
})();
