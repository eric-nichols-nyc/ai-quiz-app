import { test, expect } from "@playwright/test";

test.describe("unauthenticated tests", () => {
  test("cannot access protected routes", async ({ page }) => {
    await page.goto("/categories");
    await expect(page).toHaveURL(/\/sign-in/);
  });
});
