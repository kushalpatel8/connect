import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  
  try {
    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 2000));
    
    // Fill out the signup form
    await page.type('input[name="firstname"]', 'Test');
    await page.type('input[name="lastname"]', 'User');
    await page.type('input[name="email"]', 'testuser123456@test.com');
    await page.type('input[name="password"]', 'password123');
    await page.type('input[name="confirmpass"]', 'password123');
    
    // Click submit
    await page.click('button[type="submit"]');
    
    // Wait for the result
    await new Promise(r => setTimeout(r, 3000));
    
    // See if URL changed or if there's an error on the page
    console.log("CURRENT URL:", page.url());
    const text = await page.evaluate(() => document.body.innerText);
    console.log("PAGE TEXT:", text);
    
  } catch (err) {
    console.error("Puppeteer Error:", err);
  } finally {
    await browser.close();
  }
})();
