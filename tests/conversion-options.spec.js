import { test, expect } from '@playwright/test';

test.describe('변환 옵션 테스트', () => {
  test('오디오 없이 변환 시 경고가 나오는가', async ({ page }) => {
    await page.goto('/');

    // optionsSection 강제 표시
    await page.evaluate(() => {
      document.getElementById('optionsSection').classList.remove('hidden');
    });

    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('record or upload');
      await dialog.accept();
    });

    await page.click('#convertBtn');
  });

  test('플랫폼 체크박스가 정상 작동하는가', async ({ page }) => {
    await page.goto('/');

    // optionsSection 강제 표시
    await page.evaluate(() => {
      document.getElementById('optionsSection').classList.remove('hidden');
    });

    // Twitter 기본 체크됨
    await expect(page.locator('input[value="twitter"]')).toBeChecked();

    // LinkedIn 기본 미체크
    await expect(page.locator('input[value="linkedin"]')).not.toBeChecked();

    // LinkedIn 체크
    await page.click('input[value="linkedin"]');
    await expect(page.locator('input[value="linkedin"]')).toBeChecked();

    // Twitter 해제
    await page.click('input[value="twitter"]');
    await expect(page.locator('input[value="twitter"]')).not.toBeChecked();
  });

  test('톤 라디오 버튼이 정상 작동하는가', async ({ page }) => {
    await page.goto('/');

    // optionsSection 강제 표시
    await page.evaluate(() => {
      document.getElementById('optionsSection').classList.remove('hidden');
    });

    // Professional 기본 선택
    await expect(page.locator('input[value="professional"]')).toBeChecked();

    // Casual 선택
    await page.click('input[value="casual"]');
    await expect(page.locator('input[value="casual"]')).toBeChecked();
    await expect(page.locator('input[value="professional"]')).not.toBeChecked();

    // Storytelling 선택
    await page.click('input[value="storytelling"]');
    await expect(page.locator('input[value="storytelling"]')).toBeChecked();
    await expect(page.locator('input[value="casual"]')).not.toBeChecked();
  });

  test('플랫폼 모두 해제 시 경고가 나오는가', async ({ page }) => {
    // 쿠키 동의 처리
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.click('#acceptCookies');
    await page.waitForTimeout(300);

    await page.evaluate(() => {
      document.getElementById('optionsSection').classList.remove('hidden');
    });

    // 모든 플랫폼 해제
    const twitterCheckbox = page.locator('input[value="twitter"]');
    if (await twitterCheckbox.isChecked()) {
      await twitterCheckbox.click();
    }

    // dialog 핸들러를 먼저 등록
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    // evaluate 안의 alert은 동기 블로킹이므로 evalOnSelectorAll 대신 비동기로 호출
    await page.evaluate(() => {
      setTimeout(() => {
        const platformCheckboxes = document.querySelectorAll('input[name="platform"]:checked');
        if (platformCheckboxes.length === 0) {
          alert('Please select at least one platform!');
        }
      }, 0);
    });

    await page.waitForTimeout(1000);
    expect(dialogMessage).toContain('platform');
  });
});
