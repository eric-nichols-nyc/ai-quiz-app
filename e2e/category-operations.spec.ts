import { test, expect } from '@playwright/test';

test.describe('Category Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the categories page
    await page.goto('/categories');
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('h1:has-text("Your Categories")');
    
    // Debug: Log the page content if there's an issue
    const content = await page.content();
    console.log('Page Content:', content);
  });

  test('should not create category with empty name', async ({ page }) => {
    // Debug: Take a screenshot before clicking
    await page.screenshot({ path: 'before-click.png' });
    
    // Wait for the button to be visible and clickable
    await page.waitForSelector('[data-testid="add-category-button"]', { state: 'visible' });
    
    // Click the add category button
    await page.getByTestId('add-category-button').click();    
    
    // Try to create with empty name
    await page.getByRole('button', { name: /add/i }).click();

    // Verify error message or that the dialog is still open
    await expect(page.getByText(/category name cannot be empty/i)).toBeVisible();
  });

//   test('should add and delete a category', async ({ page }) => {
//     // Generate a unique category name to avoid conflicts
//     const categoryName = `Test Category ${Date.now()}`;

//     // Click the add category button and fill the form
//     await page.getByTestId('add-category-button').click();    
//     await page.getByPlaceholder(/category name/i).fill(categoryName);
//     await page.getByRole('button', { name: /add/i }).click();

//     // Verify the category was created
//     await expect(page.getByText(categoryName)).toBeVisible();

//     // Delete the category
//     const categoryCard = page.getByText(categoryName).locator('..').locator('..');
//     await categoryCard.hover();
//     await categoryCard.getByRole('button', { name: /delete/i }).click();

//     // Confirm deletion in the dialog
//     await page.getByRole('button', { name: /confirm/i }).click();

//     // Verify the category was deleted
//     await expect(page.getByText(categoryName)).not.toBeVisible();
//   });

}); 