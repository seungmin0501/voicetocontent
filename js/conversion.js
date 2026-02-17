// ============================================
// CONVERSION PROCESS & RESULTS
// ============================================
let loadingMessageInterval;

document.getElementById('convertBtn').addEventListener('click', async () => {
    if (!currentAudioBlob) {
        showToast(t('alertNoAudio'), 'warning');
        return;
    }

    if (!checkUsageLimit()) return;

    const platformCheckboxes = document.querySelectorAll('input[name="platform"]:checked');
    if (platformCheckboxes.length === 0) {
        showToast(t('alertNoPlatform'), 'warning');
        return;
    }

    const platforms = Array.from(platformCheckboxes).map(cb => cb.value);
    const tone = document.querySelector('input[name="tone"]:checked').value;

    const loadingMessages = t('loadingMessages');
    let messageIndex = 0;
    updateLoadingStep(loadingMessages[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showLoading();

    loadingMessageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        updateLoadingStep(loadingMessages[messageIndex]);
    }, 3000);

    try {
        const formData = new FormData();
        const mimeType = getRecordingMimeType();
        const ext = mimeType.includes('mp4') ? 'mp4'
            : mimeType.includes('ogg') ? 'ogg'
            : mimeType.includes('wav') ? 'wav'
            : 'webm';
        const fileName = currentAudioFile ? currentAudioFile.name : `audio.${ext}`;
        formData.append('audio', currentAudioBlob, fileName);
        formData.append('platforms', JSON.stringify(platforms));
        formData.append('tone', tone);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData,
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 429) {
                throw new Error('rate_limit');
            }
            throw new Error('Conversion failed');
        }

        const data = await response.json();

        clearInterval(loadingMessageInterval);
        displayResults(data.posts);
        incrementUsage();

    } catch (error) {
        clearInterval(loadingMessageInterval);
        if (error.name === 'AbortError') {
            showToast(t('alertTimeout') || 'Request timed out. Please try with a shorter audio.', 'error');
        } else if (error.message === 'rate_limit') {
            showToast(t('alertRateLimit') || 'Too many requests. Please wait a moment.', 'warning');
        } else {
            showToast(t('alertConversionError'), 'error');
        }
        hideLoading();
    }
});

function showLoading() {
    document.getElementById('inputSection').classList.add('hidden');
    document.getElementById('loadingState').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('inputSection').classList.remove('hidden');
}

function updateLoadingStep(message) {
    document.getElementById('loadingStep').textContent = message;
}

function displayResults(posts) {
    document.getElementById('loadingState').classList.add('hidden');

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    const platformNames = t('platformNames');

    posts.forEach(post => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';

        resultCard.innerHTML = `
            <div class="result-header">
                <span class="platform-badge">${platformNames[post.platform]}</span>
                <button class="copy-btn" data-content="${escapeHtml(post.content)}">
                    ${t('copyBtn')}
                </button>
            </div>
            <div class="result-content">${escapeHtml(post.content)}</div>
        `;

        resultsContainer.appendChild(resultCard);
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const content = e.target.dataset.content;
            copyToClipboard(content);

            e.target.textContent = t('copiedBtn');
            e.target.classList.add('copied');

            setTimeout(() => {
                e.target.textContent = t('copyBtn');
                e.target.classList.remove('copied');
            }, 2000);
        });
    });

    document.getElementById('resultsSection').classList.remove('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}
