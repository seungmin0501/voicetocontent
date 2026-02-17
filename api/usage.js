// ============================================
// Server-side Usage Tracking
// ============================================
// Uses Vercel KV (Redis) when available, falls back to in-memory tracking.
// To enable Vercel KV: connect a KV store in Vercel dashboard,
// then install @vercel/kv and set KV_REST_API_URL / KV_REST_API_TOKEN env vars.

const FREE_DAILY_LIMIT = 3;

// In-memory fallback (resets on cold start, per-instance)
const memoryStore = new Map();

function getTodayKey(ip) {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return `usage:${ip}:${today}`;
}

async function getUsageFromKV(key) {
    try {
        const { kv } = await import('@vercel/kv');
        const count = await kv.get(key);
        return count ? parseInt(count, 10) : 0;
    } catch (_) {
        return null; // KV not available
    }
}

async function incrementUsageInKV(key) {
    try {
        const { kv } = await import('@vercel/kv');
        const newCount = await kv.incr(key);
        // Expire at end of day (max 24 hours)
        await kv.expire(key, 86400);
        return newCount;
    } catch (_) {
        return null;
    }
}

function getUsageFromMemory(key) {
    const entry = memoryStore.get(key);
    if (!entry) return 0;
    return entry.count;
}

function incrementUsageInMemory(key) {
    const entry = memoryStore.get(key);
    if (!entry) {
        memoryStore.set(key, { count: 1, createdAt: Date.now() });
        return 1;
    }
    entry.count++;
    return entry.count;
}

// Clean up old memory entries every 10 minutes
setInterval(() => {
    const oneDayAgo = Date.now() - 86400 * 1000;
    for (const [key, entry] of memoryStore) {
        if (entry.createdAt < oneDayAgo) {
            memoryStore.delete(key);
        }
    }
}, 10 * 60 * 1000);

export async function checkUsage(ip) {
    const key = getTodayKey(ip);

    // Try KV first
    const kvCount = await getUsageFromKV(key);
    if (kvCount !== null) {
        return { count: kvCount, limit: FREE_DAILY_LIMIT, allowed: kvCount < FREE_DAILY_LIMIT };
    }

    // Fallback to memory
    const memCount = getUsageFromMemory(key);
    return { count: memCount, limit: FREE_DAILY_LIMIT, allowed: memCount < FREE_DAILY_LIMIT };
}

export async function incrementUsage(ip) {
    const key = getTodayKey(ip);

    // Try KV first
    const kvCount = await incrementUsageInKV(key);
    if (kvCount !== null) {
        return kvCount;
    }

    // Fallback to memory
    return incrementUsageInMemory(key);
}
