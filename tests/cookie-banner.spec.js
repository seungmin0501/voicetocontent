import { test, expect } from '@playwright/test';

test.describe('쿠키 배너 테스트', () => {
  test('처음 방문 시 쿠키 배너가 표시되는가', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(1000);

    const banner = page.locator('#cookieBanner');
    await expect(banner).not.toHaveClass(/hidden/);
  });

  test('Accept 버튼 클릭 시 배너가 사라지는가', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(1000);

    await page.click('#acceptCookies');
    await page.waitForTimeout(500);

    const banner = page.locator('#cookieBanner');
    await expect(banner).toHaveClass(/hidden/);
  });

  test('동의 후 재방문 시 배너가 안 나타나는가', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(1000);

    await page.click('#acceptCookies');
    await page.waitForTimeout(500);

    // 재방문
    await page.reload();
    await page.waitForTimeout(1000);

    const banner = page.locator('#cookieBanner');
    await expect(banner).toHaveClass(/hidden/);
  });

  test('Decline 버튼 클릭 시 경고 후 배너가 사라지는가', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(1000);

    page.on('dialog', dialog => dialog.accept());
    await page.click('#declineCookies');
    await page.waitForTimeout(500);

    const banner = page.locator('#cookieBanner');
    await expect(banner).toHaveClass(/hidden/);
  });
});
