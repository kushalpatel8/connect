import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  try {
    await page.goto('http://localhost:5173/auth');
    await new Promise(r => setTimeout(r, 2000));
    
    await page.evaluate(() => {
       const spans = document.querySelectorAll('span');
       for (const span of spans) {
           if (span.innerText.includes('Already have an account')) {
               span.click();
           }
       }
    });
    
    await new Promise(r => setTimeout(r, 500));
    
    await page.type('input[name="email"]', 'testuser123456@test.com');
    await page.type('input[name="password"]', 'password123');
    
    await page.click('button[type="submit"]');
    
    await new Promise(r => setTimeout(r, 3000));
    
    console.log("CURRENT URL:", page.url());
    const text = await page.evaluate(() => document.body.innerText);
    console.log("PAGE TEXT:", text);
    
  } catch (err) {
    console.error("Puppeteer Error:", err);
  } finally {
    await browser.close();
  }
})();
