import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('i').nth(1).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Username').press('Tab');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await page.getByRole('button', { name: 'Apply Leave' }).click();
  await expect(page.getByRole('heading', { name: 'Apply Leave' })).toBeVisible();

//apply
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'CAN - FMLA' }).click();
  await page.locator('form i').nth(2).click();
  await page.getByText('7', { exact: true }).click();
  await page.locator('form i').nth(3).click();
  await page.getByText('8', { exact: true }).click();
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Start Day Only' }).click();
  await page.getByText('-- Select --').click();
  await page.getByText('Half Day - Morning').click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('gg my name 1');
  await page.getByRole('button', { name: 'Apply' }).click();

//update
  await page.getByRole('link', { name: 'My Leave' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Add Comment').click();
  await page.getByPlaceholder('Comment here').click();
  await page.getByPlaceholder('Comment here').fill('gg name 2');
  await page.getByRole('button', { name: 'Save' }).click();

  
  await expect(page.getByText('gg name')).toBeVisible();

//delete
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
  await expect(page.getByText('Cancelled (1.50)')).toBeVisible();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList#');
  await page.goto('chrome-error://chromewebdata/');
});