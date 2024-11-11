import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Add your global setup logic here
  // For example: authentication setup, data seeding, etc.
  
  await browser.close();
}

export default globalSetup;
