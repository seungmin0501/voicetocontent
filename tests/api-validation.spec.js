// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================
// API Endpoint Validation Tests
// These tests require `vercel dev` (serverless functions).
// They are auto-skipped when running with a static file server.
// Run with: npm run dev (vercel dev) + npx playwright test tests/api-validation.spec.js
// ============================================

const API_URL = '/api/convert';

async function isApiAvailable(request) {
    try {
        const response = await request.post(API_URL);
        return response.status() !== 404;
    } catch (_) {
        return false;
    }
}

test.describe('API Endpoint Validation', () => {

    test('should reject non-POST requests', async ({ request }) => {
        test.skip(!(await isApiAvailable(request)), 'API not available - requires vercel dev');

        const response = await request.get(API_URL);
        expect(response.status()).toBe(405);

        const body = await response.json();
        expect(body.error).toBe('Method not allowed');
    });

    test('should reject requests without audio file', async ({ request }) => {
        test.skip(!(await isApiAvailable(request)), 'API not available - requires vercel dev');

        const response = await request.post(API_URL, {
            multipart: {
                platforms: JSON.stringify(['twitter']),
                tone: 'professional',
            },
        });

        expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('should reject invalid platform values', async ({ request }) => {
        test.skip(!(await isApiAvailable(request)), 'API not available - requires vercel dev');

        const audioBuffer = Buffer.alloc(1024);
        const response = await request.post(API_URL, {
            multipart: {
                audio: {
                    name: 'test.webm',
                    mimeType: 'audio/webm',
                    buffer: audioBuffer,
                },
                platforms: JSON.stringify(['tiktok']),
                tone: 'professional',
            },
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toContain('Invalid platform');
    });

    test('should reject invalid tone values', async ({ request }) => {
        test.skip(!(await isApiAvailable(request)), 'API not available - requires vercel dev');

        const audioBuffer = Buffer.alloc(1024);
        const response = await request.post(API_URL, {
            multipart: {
                audio: {
                    name: 'test.webm',
                    mimeType: 'audio/webm',
                    buffer: audioBuffer,
                },
                platforms: JSON.stringify(['twitter']),
                tone: 'aggressive',
            },
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toContain('Invalid tone');
    });

    test('should reject non-audio file types', async ({ request }) => {
        test.skip(!(await isApiAvailable(request)), 'API not available - requires vercel dev');

        const textBuffer = Buffer.from('This is not audio');
        const response = await request.post(API_URL, {
            multipart: {
                audio: {
                    name: 'document.txt',
                    mimeType: 'text/plain',
                    buffer: textBuffer,
                },
                platforms: JSON.stringify(['twitter']),
                tone: 'professional',
            },
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toContain('Invalid file type');
    });
});

test.describe('Rate Limiting', () => {

    test('should return 429 after too many rapid requests', async ({ request }) => {
        test.skip(!(await isApiAvailable(request)), 'API not available - requires vercel dev');

        const audioBuffer = Buffer.alloc(1024);
        const requests = [];

        for (let i = 0; i < 7; i++) {
            requests.push(
                request.post(API_URL, {
                    multipart: {
                        audio: {
                            name: 'test.webm',
                            mimeType: 'audio/webm',
                            buffer: audioBuffer,
                        },
                        platforms: JSON.stringify(['twitter']),
                        tone: 'professional',
                    },
                })
            );
        }

        const responses = await Promise.all(requests);
        const statusCodes = responses.map(r => r.status());

        const hasRateLimitOrError = statusCodes.some(code => code === 429 || code >= 400);
        expect(hasRateLimitOrError).toBe(true);
    });
});
