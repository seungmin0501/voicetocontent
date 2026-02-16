// ============================================
// STATE MANAGEMENT
// ============================================
let mediaRecorder;
let audioChunks = [];
let recordingStartTime;
let timerInterval;
let currentAudioBlob = null;
let currentAudioFile = null;

const FREE_DAILY_LIMIT = 3;
const FREE_RECORDING_MAX_MINUTES = 3;
const FREE_FILE_MAX_MB = 10;
const PREMIUM_RECORDING_MAX_MINUTES = 10;
const PREMIUM_FILE_MAX_MB = 25;

// ============================================
// COOKIE & USAGE MANAGEMENT
// ============================================
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function checkCookieConsent() {
    const consent = getCookie('cookieConsent');
    if (!consent) {
        document.getElementById('cookieBanner').classList.remove('hidden');
    }
    return consent === 'accepted';
}

function getTodayUsage() {
    if (!checkCookieConsent()) return 0;
    
    const today = new Date().toDateString();
    const lastDate = getCookie('usageDate');
    
    if (lastDate !== today) {
        setCookie('usageDate', today, 1);
        setCookie('usageCount', '0', 1);
        return 0;
    }
    
    return parseInt(getCookie('usageCount') || '0');
}

function incrementUsage() {
    const current = getTodayUsage();
    setCookie('usageCount', (current + 1).toString(), 1);
    updateUsageDisplay();
}

function updateUsageDisplay() {
    const usage = getTodayUsage();
    const usageElement = document.getElementById('usageCount');
    
    if (checkCookieConsent() && usage > 0) {
        usageElement.textContent = `${usage}/${FREE_DAILY_LIMIT} used today`;
        usageElement.classList.remove('hidden');
    } else {
        usageElement.classList.add('hidden');
    }
}

function checkUsageLimit() {
    if (!checkCookieConsent()) {
        alert('Please accept cookies to use the free tier. Cookies are only used to track your daily usage limit.');
        return false;
    }
    
    const usage = getTodayUsage();
    if (usage >= FREE_DAILY_LIMIT) {
        showUpgradeModal();
        return false;
    }
    return true;
}

// ============================================
// UPGRADE MODAL
// ============================================
function showUpgradeModal() {
    document.getElementById('upgradeModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideUpgradeModal() {
    document.getElementById('upgradeModal').classList.add('hidden');
    document.body.style.overflow = '';
}

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
    alert('Without cookies, you cannot use the free tier. Please upgrade to Premium or accept cookies.');
});

// ============================================
// LANGUAGE DETECTION
// ============================================
function detectLanguage(text) {
    // Simple language detection based on character patterns
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const japaneseRegex = /[ぁ-んァ-ン一-龯]/;
    const spanishRegex = /[áéíóúñ¿¡]/i;
    
    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
    if (spanishRegex.test(text)) return 'es';
    return 'en';
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
// RECORDING FUNCTIONALITY
// ============================================
document.getElementById('startRecord').addEventListener('click', async () => {
    if (!checkUsageLimit()) return;
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            currentAudioBlob = audioBlob;
            displayAudioPreview(audioBlob);
            stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorder.start();
        recordingStartTime = Date.now();
        
        document.getElementById('startRecord').classList.add('hidden');
        document.getElementById('stopRecord').classList.remove('hidden');
        document.getElementById('recordTimer').classList.remove('hidden');
        
        startTimer();
        
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check your browser permissions.');
    }
});

document.getElementById('stopRecord').addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        stopTimer();
        
        document.getElementById('startRecord').classList.remove('hidden');
        document.getElementById('stopRecord').classList.add('hidden');
        document.getElementById('recordTimer').classList.add('hidden');
    }
});

function startTimer() {
    const maxSeconds = FREE_RECORDING_MAX_MINUTES * 60;
    
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        document.getElementById('recordTimer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (elapsed >= maxSeconds) {
            document.getElementById('stopRecord').click();
            alert(`Recording stopped at ${FREE_RECORDING_MAX_MINUTES} minutes (free tier limit). Upgrade for longer recordings!`);
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ============================================
// FILE UPLOAD FUNCTIONALITY
// ============================================
const uploadZone = document.getElementById('uploadZone');
const audioFileInput = document.getElementById('audioFile');

uploadZone.addEventListener('click', () => {
    audioFileInput.click();
});

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragging');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragging');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragging');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
        handleFileUpload(file);
    } else {
        alert('Please upload an audio file (MP3, M4A, WAV, etc.)');
    }
});

audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

function handleFileUpload(file) {
    if (!checkUsageLimit()) return;
    
    // Check file size
    const maxSize = FREE_FILE_MAX_MB * 1024 * 1024;
    if (file.size > maxSize) {
        alert(`File too large! Free tier limit: ${FREE_FILE_MAX_MB}MB. Upgrade to Premium for ${PREMIUM_FILE_MAX_MB}MB files.`);
        return;
    }
    
    currentAudioFile = file;
    currentAudioBlob = file;
    
    // Display file info
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileInfo').classList.remove('hidden');
    
    // Show audio preview
    displayAudioPreview(file);
}

document.getElementById('removeFile').addEventListener('click', () => {
    currentAudioFile = null;
    currentAudioBlob = null;
    audioFileInput.value = '';
    document.getElementById('fileInfo').classList.add('hidden');
    document.getElementById('audioPreview').classList.add('hidden');
    document.getElementById('optionsSection').classList.add('hidden');
});

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
// CONVERSION PROCESS
// ============================================

// Random loading messages
const loadingMessages = [
    '🎤 Listening to your voice...',
    '🤖 AI is thinking hard...',
    '✨ Crafting the perfect words...',
    '📝 Almost there...',
    '🚀 Polishing your posts...'
];

let loadingMessageInterval;

document.getElementById('convertBtn').addEventListener('click', async () => {
    if (!currentAudioBlob) {
        alert('Please record or upload audio first!');
        return;
    }
    
    if (!checkUsageLimit()) return;
    
    // Get selected platforms
    const platformCheckboxes = document.querySelectorAll('input[name="platform"]:checked');
    if (platformCheckboxes.length === 0) {
        alert('Please select at least one platform!');
        return;
    }
    
    const platforms = Array.from(platformCheckboxes).map(cb => cb.value);
    
    // Get selected tone
    const tone = document.querySelector('input[name="tone"]:checked').value;
    
    // Show loading state
    let messageIndex = 0;
    updateLoadingStep(loadingMessages[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });  // ← 추가!
    showLoading();

    // Start rotating loading messages
    loadingMessageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        updateLoadingStep(loadingMessages[messageIndex]);
    }, 3000); // Change every 3 seconds
    
    try {
        // Send everything in one API call
        const formData = new FormData();
        formData.append('audio', currentAudioBlob, 'audio.webm');
        formData.append('platforms', JSON.stringify(platforms));
        formData.append('tone', tone);
        
        const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API error:', errorData);
            throw new Error('Conversion failed');
        }
        
        const data = await response.json();
        console.log('Received posts:', data.posts);
        
        // Stop loading messages
        clearInterval(loadingMessageInterval);
        
        // Display results
        displayResults(data.posts);
        
        // Increment usage
        incrementUsage();
        
    } catch (error) {
        console.error('Conversion error:', error);
        clearInterval(loadingMessageInterval);
        alert('Something went wrong. Please try again.');
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


// ============================================
// DISPLAY RESULTS
// ============================================
function displayResults(posts) {
    document.getElementById('loadingState').classList.add('hidden');
    
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    const platformNames = {
        twitter: 'X/Twitter Thread',
        linkedin: 'LinkedIn Post',
        instagram: 'Instagram Caption'
    };
    
    posts.forEach(post => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        
        resultCard.innerHTML = `
            <div class="result-header">
                <span class="platform-badge">${platformNames[post.platform]}</span>
                <button class="copy-btn" data-content="${escapeHtml(post.content)}">
                    📋 Copy
                </button>
            </div>
            <div class="result-content">${escapeHtml(post.content)}</div>
        `;
        
        resultsContainer.appendChild(resultCard);
    });
    
    // Add copy functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const content = e.target.dataset.content;
            copyToClipboard(content);
            
            e.target.textContent = '✓ Copied!';
            e.target.classList.add('copied');
            
            setTimeout(() => {
                e.target.textContent = '📋 Copy';
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
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Copy failed:', err);
        // Fallback method
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

// ============================================
// NEW CONVERSION
// ============================================
document.getElementById('newConversion').addEventListener('click', () => {
    resetUI();
});

function resetUI() {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide results
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('inputSection').classList.remove('hidden');
    
    // Reset audio
    currentAudioBlob = null;
    currentAudioFile = null;
    audioFileInput.value = '';
    
    // Reset UI elements
    document.getElementById('audioPreview').classList.add('hidden');
    document.getElementById('optionsSection').classList.add('hidden');
    document.getElementById('fileInfo').classList.add('hidden');
    
    // Reset recording
    document.getElementById('startRecord').classList.remove('hidden');
    document.getElementById('stopRecord').classList.add('hidden');
    document.getElementById('recordTimer').classList.add('hidden');
    document.getElementById('recordTimer').textContent = '00:00';
}

// ============================================
// UPGRADE BUTTON
// ============================================
document.getElementById('upgradeBtn').addEventListener('click', () => {
    alert('Premium upgrade coming soon! For now, enjoy the free tier. 🚀');
    // TODO: Integrate Lemon Squeezy
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkCookieConsent();
    updateUsageDisplay();
    
    // Modal event listeners
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalClose) modalClose.addEventListener('click', hideUpgradeModal);
    if (modalCancel) modalCancel.addEventListener('click', hideUpgradeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', hideUpgradeModal);
    
    // Upgrade buttons
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.target.dataset.plan;
            if (plan === 'monthly') {
                window.location.href = 'https://voicetocontent.lemonsqueezy.com/checkout/buy/1313542';
            } else if (plan === 'annual') {
                window.location.href = 'https://voicetocontent.lemonsqueezy.com/checkout/buy/1313544';
            }
        });
    });
});