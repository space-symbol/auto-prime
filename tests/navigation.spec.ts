import { test, expect } from '@playwright/test';

test('test navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'store' }).click();
  await page.getByRole('button', { name: 'Развернуть навигацию' }).click();
  await page.getByRole('link', { name: 'Главная' }).click();
  await page.getByRole('link').first().click();
  await page.getByRole('button', { name: 'Свернуть навигацию' }).click();
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.getByRole('button', { name: 'Развернуть навигацию' }).click();
  await page.getByRole('link', { name: 'Каталог' }).click();
});