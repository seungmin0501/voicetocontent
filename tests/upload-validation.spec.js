import { test, expect } from '@playwright/test';

test.describe('파일 업로드 검증 테스트', () => {
  test('업로드 영역이 클릭 가능한가', async ({ page }) => {
    await page.goto('/');

    // Upload 탭으로 전환
    await page.click('#uploadBtn');
    await page.waitForTimeout(300);

    const uploadZone = page.locator('#uploadZone');
    await expect(uploadZone).toBeVisible();
  });

  test('파일 업로드 후 파일명이 표시되는가', async ({ page }) => {
    await page.goto('/');

    // 쿠키 동의
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.click('#acceptCookies');
    await page.waitForTimeout(300);

    // Upload 탭으로 전환
    await page.click('#uploadBtn');
    await page.waitForTimeout(300);

    // 테스트용 오디오 파일 생성 (작은 WAV 파일)
    const buffer = Buffer.alloc(44); // 최소 WAV 헤더
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(1, 22);
    buffer.writeUInt32LE(44100, 24);
    buffer.writeUInt32LE(88200, 28);
    buffer.writeUInt16LE(2, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(0, 40);

    const fileInput = page.locator('#audioFile');
    await fileInput.setInputFiles({
      name: 'test-audio.wav',
      mimeType: 'audio/wav',
      buffer: buffer,
    });

    await page.waitForTimeout(500);

    // 파일명 표시 확인
    await expect(page.locator('#fileName')).toContainText('test-audio.wav');
    await expect(page.locator('#fileInfo')).not.toHaveClass(/hidden/);
  });

  test('파일 제거 버튼이 작동하는가', async ({ page }) => {
    await page.goto('/');

    // 쿠키 동의
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForTimeout(500);
    await page.click('#acceptCookies');
    await page.waitForTimeout(300);

    // Upload 탭으로 전환
    await page.click('#uploadBtn');
    await page.waitForTimeout(300);

    // 파일 업로드
    const buffer = Buffer.alloc(44);
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36, 4);
    buffer.write('WAVE', 8);

    const fileInput = page.locator('#audioFile');
    await fileInput.setInputFiles({
      name: 'test.wav',
      mimeType: 'audio/wav',
      buffer: buffer,
    });

    await page.waitForTimeout(500);

    // 제거 버튼 클릭
    await page.click('#removeFile');
    await page.waitForTimeout(300);

    // 파일 정보 숨김
    await expect(page.locator('#fileInfo')).toHaveClass(/hidden/);
    await expect(page.locator('#audioPreview')).toHaveClass(/hidden/);
    await expect(page.locator('#optionsSection')).toHaveClass(/hidden/);
  });
});
