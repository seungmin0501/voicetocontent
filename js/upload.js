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
        showToast(t('alertAudioFileOnly'), 'error');
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

    const maxSize = FREE_FILE_MAX_MB * 1024 * 1024;
    if (file.size > maxSize) {
        showToast(t('alertFileTooLarge')
            .replace('{maxFree}', FREE_FILE_MAX_MB)
            .replace('{maxPremium}', PREMIUM_FILE_MAX_MB), 'error');
        return;
    }

    currentAudioFile = file;
    currentAudioBlob = file;

    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileInfo').classList.remove('hidden');

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
