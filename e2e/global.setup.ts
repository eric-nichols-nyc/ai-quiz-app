import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { chromium, FullConfig } from '@playwright/test';
import path from "path";
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const authFile = path.join(__dirname, "../playwright/.clerk/user.json");

async function globalSetup(config: FullConfig) {
  try {
    await clerkSetup();

    if (!process.env.E2E_CLERK_USER_USERNAME || !process.env.E2E_CLERK_USER_PASSWORD) {
      throw new Error(
        "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables."
      );
    }

    const browser = await chromium.launch();
    const context = await browser.newContext({
      baseURL: 'http://localhost:3000',
    });
    const page = await context.newPage();

    // Ensure the directory exists before starting
    await fs.mkdir(path.dirname(authFile), { recursive: true });

    try {
      await page.goto("/sign-in");
      
      // Wait for sign-in page to be ready
      await page.waitForLoadState('networkidle');
      
      await clerk.signIn({
        page,
        signInParams: {
          strategy: "password",
          identifier: process.env.E2E_CLERK_USER_USERNAME,
          password: process.env.E2E_CLERK_USER_PASSWORD,
        },
      });

      await page.goto("/");
      await page.waitForSelector("h1:has-text('Flashcard App')");
      
      // Save authentication state
      await context.storageState({ path: authFile });
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    } finally {
      await context.close();
      await browser.close();
    }
  } catch (error) {
    console.error('Global setup failed:', error);
    throw error;
  }
}

export default globalSetup;
