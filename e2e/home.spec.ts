import { test, expect } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('/');
  
  // Check title
  await expect(page.locator('h1')).toContainText('Flashcard App');
  
  // Check footer links exist
  await expect(page.getByRole('link', { name: 'Learn' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Examples' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Go to nextjs.org/ })).toBeVisible();
});
