import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173/map', { waitUntil: 'networkidle0' });
  
  const mapElement = await page.$('section.bg-stone-200 > div');
  if (mapElement) {
    const box = await mapElement.boundingBox();
    console.log('Map Container Box:', box);
  } else {
    console.log('Map container div not found inside section');
  }
  
  console.log('Page loaded successfully');
  await browser.close();
})();
