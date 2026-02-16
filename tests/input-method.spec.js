import { test, expect } from '@playwright/test';

test.describe('입력 방식 전환 테스트', () => {
  test('Record Audio가 기본 활성 상태인가', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#recordBtn')).toHaveClass(/active/);
    await expect(page.locator('#recordInterface')).not.toHaveClass(/hidden/);
    await expect(page.locator('#uploadInterface')).toHaveClass(/hidden/);
  });

  test('Upload File 클릭 시 인터페이스가 전환되는가', async ({ page }) => {
    await page.goto('/');

    await page.click('#uploadBtn');
    await page.waitForTimeout(300);

    await expect(page.locator('#uploadBtn')).toHaveClass(/active/);
    await expect(page.locator('#recordBtn')).not.toHaveClass(/active/);
    await expect(page.locator('#uploadInterface')).not.toHaveClass(/hidden/);
    await expect(page.locator('#recordInterface')).toHaveClass(/hidden/);
  });

  test('Record Audio로 다시 전환되는가', async ({ page }) => {
    await page.goto('/');

    // Upload로 전환
    await page.click('#uploadBtn');
    await page.waitForTimeout(300);

    // 다시 Record로 전환
    await page.click('#recordBtn');
    await page.waitForTimeout(300);

    await expect(page.locator('#recordBtn')).toHaveClass(/active/);
    await expect(page.locator('#recordInterface')).not.toHaveClass(/hidden/);
    await expect(page.locator('#uploadInterface')).toHaveClass(/hidden/);
  });
});
