import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(3000);

await page.screenshot({ path: 'screenshot-hero.png' });

await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshot-about.png' });

await page.evaluate(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-projects.png' });

const card = await page.$('button');
if (card) { await card.click(); await page.waitForTimeout(500); }
await page.screenshot({ path: 'screenshot-modal.png' });
await page.keyboard.press('Escape');
await page.waitForTimeout(300);

await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-experience.png' });

await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-skills.png' });

await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(700);
await page.screenshot({ path: 'screenshot-contact.png' });

await browser.close();
console.log('Done');
