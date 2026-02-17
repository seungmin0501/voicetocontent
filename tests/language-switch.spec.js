import { test, expect } from '@playwright/test';

test.describe('언어 전환 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // localStorage 초기화 후 페이지 로드
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('vtc-language'));
    await page.reload();
    await page.waitForTimeout(500);
  });

  test('언어 선택기가 표시되는가', async ({ page }) => {
    const select = page.locator('#languageSelect');
    await expect(select).toBeVisible();

    // 5개 언어 옵션 확인
    const options = select.locator('option');
    await expect(options).toHaveCount(5);
  });

  test('한국어로 전환 시 UI가 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#heroHeading')).toHaveText('음성 메모를 소셜 포스트로 변환');
    await expect(page.locator('#heroSubtitle')).toContainText('AI가');
    await expect(page.locator('#recordBtnText')).toHaveText('음성 녹음');
    await expect(page.locator('#uploadBtnText')).toHaveText('파일 업로드');
    await expect(page.locator('#startRecordText')).toHaveText('녹음 시작');
    await expect(page.locator('#upgradeLink')).toHaveText('업그레이드');
    await expect(page.locator('#featuresTitle')).toHaveText('왜 VoiceToContent인가요?');
    await expect(page.locator('#pricingTitle')).toHaveText('심플한 요금제');
  });

  test('일본어로 전환 시 UI가 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ja');
    await page.waitForTimeout(300);

    await expect(page.locator('#heroHeading')).toHaveText('音声メモをソーシャル投稿に変換');
    await expect(page.locator('#recordBtnText')).toHaveText('音声録音');
    await expect(page.locator('#uploadBtnText')).toHaveText('ファイルアップロード');
    await expect(page.locator('#upgradeLink')).toHaveText('アップグレード');
    await expect(page.locator('#featuresTitle')).toHaveText('なぜVoiceToContent？');
  });

  test('스페인어로 전환 시 UI가 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'es');
    await page.waitForTimeout(300);

    await expect(page.locator('#heroHeading')).toHaveText('Convierte Memos de Voz en Posts Sociales');
    await expect(page.locator('#recordBtnText')).toHaveText('Grabar Audio');
    await expect(page.locator('#uploadBtnText')).toHaveText('Subir Archivo');
    await expect(page.locator('#upgradeLink')).toHaveText('Mejorar');
    await expect(page.locator('#featuresTitle')).toHaveText('¿Por qué VoiceToContent?');
  });

  test('중국어로 전환 시 UI가 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'zh');
    await page.waitForTimeout(300);

    await expect(page.locator('#heroHeading')).toHaveText('将语音备忘录转为社交帖子');
    await expect(page.locator('#recordBtnText')).toHaveText('录制音频');
    await expect(page.locator('#uploadBtnText')).toHaveText('上传文件');
    await expect(page.locator('#upgradeLink')).toHaveText('升级');
    await expect(page.locator('#featuresTitle')).toHaveText('为什么选择 VoiceToContent？');
  });

  test('영어로 전환 시 UI가 원래대로 돌아오는가', async ({ page }) => {
    // 먼저 한국어로 변경
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);
    await expect(page.locator('#heroHeading')).toHaveText('음성 메모를 소셜 포스트로 변환');

    // 다시 영어로 변경
    await page.selectOption('#languageSelect', 'en');
    await page.waitForTimeout(300);

    await expect(page.locator('#heroHeading')).toHaveText('Turn Voice Memos into Social Posts');
    await expect(page.locator('#recordBtnText')).toHaveText('Record Audio');
    await expect(page.locator('#uploadBtnText')).toHaveText('Upload File');
    await expect(page.locator('#upgradeLink')).toHaveText('Upgrade');
    await expect(page.locator('#featuresTitle')).toHaveText('Why VoiceToContent?');
  });

  test('언어 선택이 localStorage에 저장되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ja');
    await page.waitForTimeout(300);

    const savedLang = await page.evaluate(() => localStorage.getItem('vtc-language'));
    expect(savedLang).toBe('ja');
  });

  test('페이지 새로고침 후 선택한 언어가 유지되는가', async ({ page }) => {
    // 한국어 선택
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    // 페이지 새로고침
    await page.reload();
    await page.waitForTimeout(500);

    // 한국어가 유지되는지 확인
    await expect(page.locator('#languageSelect')).toHaveValue('ko');
    await expect(page.locator('#heroHeading')).toHaveText('음성 메모를 소셜 포스트로 변환');
    await expect(page.locator('#recordBtnText')).toHaveText('음성 녹음');
  });

  test('쿠키 배너 텍스트가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.context().clearCookies();

    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#cookieMessage')).toContainText('쿠키를 사용합니다');
    await expect(page.locator('#acceptCookies')).toHaveText('수락');
    await expect(page.locator('#declineCookies')).toHaveText('거절');
  });

  test('옵션 섹션 텍스트가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#optionsTitle')).toHaveText('변환 옵션');
    await expect(page.locator('#platformsLabel')).toHaveText('플랫폼:');
    await expect(page.locator('#platformTwitterLabel')).toHaveText('X/트위터 스레드');
    await expect(page.locator('#toneLabel')).toHaveText('톤:');
    await expect(page.locator('#toneProfessionalLabel')).toHaveText('전문적');
    await expect(page.locator('#toneCasualLabel')).toHaveText('캐주얼');
    await expect(page.locator('#generateBtnText')).toHaveText('포스트 생성');
  });

  test('Pricing 섹션 텍스트가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#pricingTitle')).toHaveText('심플한 요금제');
    await expect(page.locator('#pricingFreeTitle')).toHaveText('무료');
    await expect(page.locator('#pricingPremiumTitle')).toHaveText('프리미엄');
    await expect(page.locator('#pricingPremiumBadge')).toHaveText('가장 인기');
  });

  test('모달 텍스트가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#modalTitle')).toHaveText('⚡ 프리미엄으로 업그레이드');
    await expect(page.locator('#modalDesc')).toContainText('무료 변환 3회를 모두 사용');
    await expect(page.locator('#modalMonthlyTitle')).toHaveText('월간');
    await expect(page.locator('#modalAnnualTitle')).toHaveText('연간');
    await expect(page.locator('#modalCancel')).toHaveText('나중에');
  });

  test('Footer 텍스트가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#footerCredit')).toContainText('❤️를 담아 만든');
    await expect(page.locator('#footerDesc')).toContainText('#BuildInPublic');
  });

  test('Features 카드 텍스트가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    await expect(page.locator('#feature1Title')).toHaveText('30초 만에 생성');
    await expect(page.locator('#feature2Title')).toHaveText('플랫폼 최적화');
    await expect(page.locator('#feature3Title')).toHaveText('이동 중 생성');
    await expect(page.locator('#feature4Title')).toHaveText('당신의 목소리, 더 세련되게');
  });

  test('토스트 메시지가 언어에 맞게 변경되는가', async ({ page }) => {
    await page.selectOption('#languageSelect', 'ko');
    await page.waitForTimeout(300);

    // optionsSection을 보이게 한 뒤 convertBtn 클릭 (오디오 없이 변환 시도)
    await page.evaluate(() => {
      document.getElementById('optionsSection').classList.remove('hidden');
    });
    await page.click('#convertBtn');
    await page.waitForTimeout(500);

    // alert() 대신 토스트 알림이 표시되는지 확인
    const toast = page.locator('.toast');
    await expect(toast.first()).toBeVisible();
    const toastText = await toast.first().textContent();
    expect(toastText).toBe('먼저 오디오를 녹음하거나 업로드해 주세요!');
  });

  test('5개 언어 순차 전환이 정상 작동하는가', async ({ page }) => {
    const languages = [
      { code: 'ko', heading: '음성 메모를 소셜 포스트로 변환' },
      { code: 'en', heading: 'Turn Voice Memos into Social Posts' },
      { code: 'ja', heading: '音声メモをソーシャル投稿に変換' },
      { code: 'es', heading: 'Convierte Memos de Voz en Posts Sociales' },
      { code: 'zh', heading: '将语音备忘录转为社交帖子' },
    ];

    for (const lang of languages) {
      await page.selectOption('#languageSelect', lang.code);
      await page.waitForTimeout(300);
      await expect(page.locator('#heroHeading')).toHaveText(lang.heading);
    }
  });
});
