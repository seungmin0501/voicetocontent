import js from '@eslint/js';
import globals from 'globals';

// Shared globals across browser script files (loaded via <script> tags in order)
const sharedBrowserGlobals = {
    // translations.js
    t: 'readonly',
    currentLanguage: 'writable',
    translations: 'readonly',
    detectBrowserLanguage: 'readonly',
    setLanguage: 'readonly',
    updateUI: 'readonly',
    // js/toast.js
    showToast: 'readonly',
    // js/cookies.js
    setCookie: 'readonly',
    getCookie: 'readonly',
    checkCookieConsent: 'readonly',
    updateUsageDisplay: 'readonly',
    incrementUsage: 'readonly',
    checkUsageLimit: 'readonly',
    FREE_RECORDING_MAX_MINUTES: 'readonly',
    FREE_FILE_MAX_MB: 'readonly',
    PREMIUM_RECORDING_MAX_MINUTES: 'readonly',
    PREMIUM_FILE_MAX_MB: 'readonly',
    // js/app.js
    currentAudioBlob: 'writable',
    currentAudioFile: 'writable',
    displayAudioPreview: 'readonly',
    showUpgradeModal: 'readonly',
    hideUpgradeModal: 'readonly',
    resetUI: 'readonly',
    APP_CONFIG: 'readonly',
    // js/recording.js
    getRecordingMimeType: 'readonly',
};

export default [
    js.configs.recommended,
    // Ignore patterns
    {
        ignores: ['node_modules/', 'test-results/', '.vercel/', '.claude/'],
    },
    // Backend (API) files - Node.js ES modules
    {
        files: ['api/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'eqeqeq': 'error',
            'no-var': 'error',
            'prefer-const': 'warn',
            'no-empty': ['error', { allowEmptyCatch: true }],
        },
    },
    // Frontend script files - shared global scope via <script> tags
    {
        files: ['js/**/*.js', 'translations.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...sharedBrowserGlobals,
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'eqeqeq': 'error',
            'no-var': 'error',
            'prefer-const': 'warn',
            'no-redeclare': 'off',
        },
    },
    // Test files - Playwright
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
    // Config files (playwright.config.js, etc.)
    {
        files: ['*.config.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
    },
    // Service worker
    {
        files: ['sw.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                ...globals.serviceworker,
            },
        },
    },
];
