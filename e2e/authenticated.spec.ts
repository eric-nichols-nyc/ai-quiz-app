import { test, expect } from "@playwright/test";

test.describe("authenticated tests", () => {
  test("already signed in", async ({ page }) => {
    await page.goto("/categories");
    await page.waitForSelector("h1:has-text('Your Categories')");
  });

  test("can logout successfully", async ({ page }) => {
    // Navigate to a protected page first
    await page.goto("/categories");
    await page.waitForSelector("h1:has-text('Your Categories')");

    // Click the sign out button directly (no menu needed)
    await page.getByRole('button', { name: 'Sign Out' }).click();

    // Verify redirect to landing page or sign-in page
    await expect(page).toHaveURL(/\/(sign-in|landing)?$/);

    // Verify we can't access protected routes anymore
    await page.goto("/categories");
    await expect(page).toHaveURL(/\/sign-in/);
  });
});
