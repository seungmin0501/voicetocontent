// ============================================
// COOKIE & USAGE MANAGEMENT
// ============================================
const FREE_DAILY_LIMIT = 3;
const FREE_RECORDING_MAX_MINUTES = 3;
const FREE_FILE_MAX_MB = 10;
const PREMIUM_RECORDING_MAX_MINUTES = 10;
const PREMIUM_FILE_MAX_MB = 25;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const secure = location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${secure}`;
}

function checkCookieConsent() {
    const consent = getCookie('cookieConsent');
    if (!consent) {
        document.getElementById('cookieBanner').classList.remove('hidden');
    }
    return consent === 'accepted';
}

function getTodayUsage() {
    if (getCookie('cookieConsent') !== 'accepted') return 0;

    const today = new Date().toDateString();
    const lastDate = getCookie('usageDate');

    if (lastDate !== today) {
        setCookie('usageDate', today, 1);
        setCookie('usageCount', '0', 1);
        return 0;
    }

    return parseInt(getCookie('usageCount') || '0');
}

async function updateUsageDisplay() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const usageElement = document.getElementById('usageCount');
    if (!usageElement) return;

    if (user) {
        const usage = (typeof getSupabaseUsage === 'function') ? (await getSupabaseUsage() || 0) : 0;
        if (usage > 0) {
            usageElement.textContent = t('usageCount')
                .replace('{used}', usage)
                .replace('{limit}', FREE_DAILY_LIMIT);
            usageElement.classList.remove('hidden');
        } else {
            usageElement.classList.add('hidden');
        }
        return;
    }

    const usage = getTodayUsage();
    if (getCookie('cookieConsent') === 'accepted' && usage > 0) {
        usageElement.textContent = t('usageCount')
            .replace('{used}', usage)
            .replace('{limit}', FREE_DAILY_LIMIT);
        usageElement.classList.remove('hidden');
    } else {
        usageElement.classList.add('hidden');
    }
}

async function checkUsageLimit() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    if (user) {
        const usage = (typeof getSupabaseUsage === 'function') ? (await getSupabaseUsage() || 0) : 0;
        if (usage >= FREE_DAILY_LIMIT) {
            showUpgradeModal();
            return false;
        }
        return true;
    }

    if (!checkCookieConsent()) {
        showToast(t('alertCookieRequired'), 'warning');
        return false;
    }

    const usage = getTodayUsage();
    if (usage >= FREE_DAILY_LIMIT) {
        showUpgradeModal();
        return false;
    }
    return true;
}

async function incrementUsage() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    if (user && typeof incrementSupabaseUsage === 'function') {
        await incrementSupabaseUsage();
        updateUsageDisplay();
        return;
    }

    const current = getTodayUsage();
    setCookie('usageCount', (current + 1).toString(), 1);
    updateUsageDisplay();
}
