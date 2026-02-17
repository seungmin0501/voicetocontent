// ============================================
// RECORDING FUNCTIONALITY
// ============================================
let mediaRecorder;
let audioChunks = [];
let recordingStartTime;
let timerInterval;
let recordingMimeType = 'audio/webm';

// Detect best supported audio format (Safari doesn't support WebM)
function getSupportedMimeType() {
    const types = [
        'audio/webm',
        'audio/webm;codecs=opus',
        'audio/mp4',
        'audio/mp4;codecs=mp4a.40.2',
        'audio/ogg;codecs=opus',
        'audio/wav',
    ];
    for (const type of types) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
            return type;
        }
    }
    return '';
}

function getRecordingMimeType() {
    return recordingMimeType;
}

document.getElementById('startRecord').addEventListener('click', async () => {
    if (!checkUsageLimit()) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recordingMimeType = getSupportedMimeType();
        const recorderOptions = recordingMimeType ? { mimeType: recordingMimeType } : {};
        mediaRecorder = new MediaRecorder(stream, recorderOptions);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: recordingMimeType || 'audio/webm' });
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
        showToast(t('alertMicError'), 'error');
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
            showToast(t('alertRecordingLimit').replace('{minutes}', FREE_RECORDING_MAX_MINUTES), 'warning');
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
