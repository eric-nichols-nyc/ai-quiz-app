import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { chromium, FullConfig } from '@playwright/test';
import path from "path";
import fs from 'fs/promises';

const authFile = path.join(__dirname, "../playwright/.clerk/user.json");

async function globalSetup(config: FullConfig) {
  await clerkSetup();

  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables."
    );
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/sign-in");
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });
  
  await page.goto("http://localhost:3000");
  await page.waitForSelector("h1:has-text('Flashcard App')");

  // Ensure the directory exists before saving the storage state
  await fs.mkdir(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });

  await browser.close();
}

export default globalSetup;
