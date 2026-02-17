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

        // Show warning for partially failed platforms
        if (data.failedPlatforms && data.failedPlatforms.length > 0) {
            const platformNames = t('platformNames');
            const failedNames = data.failedPlatforms.map(p => platformNames[p] || p).join(', ');
            showToast(`${failedNames} ${t('alertPartialFailure') || 'generation failed. Other posts are ready.'}`, 'warning');
        }

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
                <div class="result-actions">
                    <button class="edit-btn" title="${t('editBtn') || 'Edit'}">
                        ${t('editBtn') || 'Edit'}
                    </button>
                    <button class="copy-btn" data-content="${escapeHtml(post.content)}">
                        ${t('copyBtn')}
                    </button>
                </div>
            </div>
            <div class="result-content">${escapeHtml(post.content)}</div>
        `;

        resultsContainer.appendChild(resultCard);
    });

    // Edit button handlers
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.result-card');
            const contentEl = card.querySelector('.result-content');
            const copyBtn = card.querySelector('.copy-btn');
            const isEditing = contentEl.contentEditable === 'true';

            if (isEditing) {
                // Save
                contentEl.contentEditable = 'false';
                contentEl.classList.remove('editing');
                e.target.textContent = t('editBtn') || 'Edit';
                // Update copy button data
                copyBtn.dataset.content = contentEl.textContent;
            } else {
                // Enter edit mode
                contentEl.contentEditable = 'true';
                contentEl.classList.add('editing');
                contentEl.focus();
                e.target.textContent = t('saveBtn') || 'Save';
            }
        });
    });

    // Copy button handlers
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.result-card');
            const contentEl = card.querySelector('.result-content');
            // Always copy current content (may have been edited)
            copyToClipboard(contentEl.textContent);

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
