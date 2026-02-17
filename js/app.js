// ============================================
// CONFIG
// ============================================
const APP_CONFIG = {
    lemonSqueezy: {
        monthly: 'https://voicetocontent.lemonsqueezy.com/checkout/buy/1313542',
        annual: 'https://voicetocontent.lemonsqueezy.com/checkout/buy/1313544',
    }
};

// ============================================
// SHARED STATE
// ============================================
let currentAudioBlob = null;
let currentAudioFile = null;

// ============================================
// AUDIO PREVIEW
// ============================================
function displayAudioPreview(audioBlob) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioURL = URL.createObjectURL(audioBlob);
    audioPlayer.src = audioURL;

    document.getElementById('audioPreview').classList.remove('hidden');
    document.getElementById('optionsSection').classList.remove('hidden');
}

// ============================================
// UPGRADE MODAL
// ============================================
let previouslyFocusedElement = null;

function showUpgradeModal() {
    previouslyFocusedElement = document.activeElement;
    const modal = document.getElementById('upgradeModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
}

function hideUpgradeModal() {
    document.getElementById('upgradeModal').classList.add('hidden');
    document.body.style.overflow = '';

    // Restore focus
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

// ============================================
// INPUT METHOD SWITCHING
// ============================================
document.getElementById('recordBtn').addEventListener('click', () => {
    document.getElementById('recordBtn').classList.add('active');
    document.getElementById('uploadBtn').classList.remove('active');
    document.getElementById('recordInterface').classList.remove('hidden');
    document.getElementById('uploadInterface').classList.add('hidden');
    resetUI();
});

document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('uploadBtn').classList.add('active');
    document.getElementById('recordBtn').classList.remove('active');
    document.getElementById('uploadInterface').classList.remove('hidden');
    document.getElementById('recordInterface').classList.add('hidden');
    resetUI();
});

// ============================================
// COOKIE CONSENT HANDLERS
// ============================================
document.getElementById('acceptCookies').addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted', 365);
    document.getElementById('cookieBanner').classList.add('hidden');
    updateUsageDisplay();
});

document.getElementById('declineCookies').addEventListener('click', () => {
    setCookie('cookieConsent', 'declined', 365);
    document.getElementById('cookieBanner').classList.add('hidden');
    showToast(t('alertCookieDeclined'), 'info');
});

// ============================================
// RESET UI & NEW CONVERSION
// ============================================
document.getElementById('newConversion').addEventListener('click', () => {
    resetUI();
});

function resetUI() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('inputSection').classList.remove('hidden');

    currentAudioBlob = null;
    currentAudioFile = null;
    const audioFileInput = document.getElementById('audioFile');
    if (audioFileInput) audioFileInput.value = '';

    document.getElementById('audioPreview').classList.add('hidden');
    document.getElementById('optionsSection').classList.add('hidden');
    document.getElementById('fileInfo').classList.add('hidden');

    document.getElementById('startRecord').classList.remove('hidden');
    document.getElementById('stopRecord').classList.add('hidden');
    document.getElementById('recordTimer').classList.add('hidden');
    document.getElementById('recordTimer').textContent = '00:00';
}

// ============================================
// UPGRADE BUTTON
// ============================================
document.getElementById('upgradeBtn').addEventListener('click', () => {
    showToast(t('alertUpgradeComingSoon'), 'info');
});

// ============================================
// LANGUAGE DETECTION (frontend)
// ============================================
function detectLanguage(text) {
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const japaneseRegex = /[ぁ-んァ-ン一-龯]/;
    const spanishRegex = /[áéíóúñ¿¡]/i;

    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
    if (spanishRegex.test(text)) return 'es';
    return 'en';
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const detectedLang = detectBrowserLanguage();
    setLanguage(detectedLang);

    document.getElementById('languageSelect').addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    checkCookieConsent();
    updateUsageDisplay();

    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modalClose) modalClose.addEventListener('click', hideUpgradeModal);
    if (modalCancel) modalCancel.addEventListener('click', hideUpgradeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', hideUpgradeModal);

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('upgradeModal');
            if (modal && !modal.classList.contains('hidden')) {
                hideUpgradeModal();
            }
        }
    });

    // Focus trap inside modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const focusable = modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.target.dataset.plan;
            if (plan === 'monthly') {
                window.location.href = APP_CONFIG.lemonSqueezy.monthly;
            } else if (plan === 'annual') {
                window.location.href = APP_CONFIG.lemonSqueezy.annual;
            }
        });
    });
});
