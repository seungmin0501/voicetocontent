import { test, expect } from '@playwright/test';

test.describe('업그레이드 모달 테스트', () => {
  test('모달이 정상적으로 열리는가', async ({ page }) => {
    await page.goto('/');

    // showUpgradeModal 호출
    await page.evaluate(() => {
      window.showUpgradeModal();
    });

    await page.waitForTimeout(500);

    const modal = page.locator('#upgradeModal');
    await expect(modal).not.toHaveClass(/hidden/);
  });

  test('X 버튼으로 모달이 닫히는가', async ({ page }) => {
    await page.goto('/');

    // 모달 열기
    await page.evaluate(() => {
      document.getElementById('upgradeModal').classList.remove('hidden');
    });

    await expect(page.locator('#upgradeModal')).not.toHaveClass(/hidden/);

    // X 버튼 클릭
    await page.click('#modalClose');
    await page.waitForTimeout(500);

    await expect(page.locator('#upgradeModal')).toHaveClass(/hidden/);
  });

  test('Maybe Later 버튼으로 모달이 닫히는가', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      document.getElementById('upgradeModal').classList.remove('hidden');
    });

    await page.click('#modalCancel');
    await page.waitForTimeout(500);

    await expect(page.locator('#upgradeModal')).toHaveClass(/hidden/);
  });

  test('오버레이 클릭으로 모달이 닫히는가', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      document.getElementById('upgradeModal').classList.remove('hidden');
    });

    // 오버레이 클릭 이벤트를 직접 dispatch
    await page.evaluate(() => {
      document.getElementById('modalOverlay').click();
    });
    await page.waitForTimeout(500);

    await expect(page.locator('#upgradeModal')).toHaveClass(/hidden/);
  });

  test('Monthly와 Annual 플랜이 모두 표시되는가', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => {
      document.getElementById('upgradeModal').classList.remove('hidden');
    });

    // Monthly 플랜
    await expect(page.locator('.plan-btn[data-plan="monthly"]')).toBeVisible();

    // Annual 플랜
    await expect(page.locator('.plan-btn[data-plan="annual"]')).toBeVisible();

    // Save 17% 배지
    await expect(page.locator('.plan-badge')).toContainText('Save 17%');
  });
});
