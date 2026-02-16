import { test, expect } from '@playwright/test';

test.describe('페이지 로드 테스트', () => {
  test('기본 요소가 모두 표시되는가', async ({ page }) => {
    await page.goto('/');

    // 헤더 확인
    await expect(page.locator('h1')).toContainText('VoiceToContent');

    // 녹음 버튼 확인
    await expect(page.locator('#recordBtn')).toBeVisible();

    // 업로드 버튼 확인
    await expect(page.locator('#uploadBtn')).toBeVisible();

    // 녹음 시작 버튼 확인
    await expect(page.locator('#startRecord')).toBeVisible();

    // 업그레이드 링크 확인
    await expect(page.locator('.btn-upgrade')).toBeVisible();
  });

  test('콘솔 에러가 없는가', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');

    // 2초 대기 (모든 스크립트 로드)
    await page.waitForTimeout(2000);

    expect(errors).toHaveLength(0);
  });

  test('Features 섹션이 표시되는가', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.features')).toBeVisible();
    await expect(page.locator('.feature-card')).toHaveCount(4);
  });

  test('Pricing 섹션이 표시되는가', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#pricing')).toBeVisible();
    await expect(page.locator('.pricing-card')).toHaveCount(2);
  });
});
