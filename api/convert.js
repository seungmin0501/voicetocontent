import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import formidable from 'formidable';
import fs from 'fs';
import { checkUsage, incrementUsage } from './usage.js';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// ============================================
// RATE LIMITING (in-memory, per Vercel instance)
// ============================================
const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;       // max 5 requests per minute per IP

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (!entry) {
        rateLimit.set(ip, { count: 1, startTime: now });
        return false;
    }

    if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimit.set(ip, { count: 1, startTime: now });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimit) {
        if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
            rateLimit.delete(ip);
        }
    }
}, 5 * 60 * 1000);

// ============================================
// FILE VALIDATION
// ============================================
const ALLOWED_AUDIO_TYPES = [
    'audio/webm', 'audio/wav', 'audio/wave', 'audio/x-wav',
    'audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/x-m4a',
    'audio/ogg', 'audio/flac', 'audio/aac',
    'video/webm', 'video/mp4', // browsers sometimes tag audio recordings as video
];

const ALLOWED_EXTENSIONS = [
    '.webm', '.wav', '.mp3', '.m4a', '.ogg', '.flac', '.aac', '.mp4', '.mpeg',
];

function isValidAudioFile(file) {
    const mimeOk = ALLOWED_AUDIO_TYPES.some(type =>
        file.mimetype && file.mimetype.toLowerCase().startsWith(type.split('/')[0]) &&
        ALLOWED_AUDIO_TYPES.includes(file.mimetype.toLowerCase())
    );

    const ext = (file.originalFilename || '').toLowerCase().match(/\.[^.]+$/);
    const extOk = ext ? ALLOWED_EXTENSIONS.includes(ext[0]) : false;

    return mimeOk || extOk;
}

// Multi-language prompts
const SYSTEM_PROMPTS = {
    en: {
        twitter: "You are a social media expert. Convert the following transcript into an engaging Twitter/X thread. Use clear formatting with numbered tweets. Make it concise, engaging, and include relevant emojis. Maximum 280 characters per tweet.",
        linkedin: "You are a LinkedIn content strategist. Convert the following transcript into a professional LinkedIn post. Use paragraphs, include insights, and make it valuable for professionals. Add relevant hashtags at the end.",
        instagram: "You are an Instagram content creator. Convert the following transcript into an engaging Instagram caption. Make it authentic, use line breaks for readability, include emojis, and add relevant hashtags at the end."
    },
    ko: {
        twitter: "당신은 소셜 미디어 전문가입니다. 다음 음성 내용을 매력적인 트위터/X 스레드로 변환하세요. 번호가 매겨진 트윗으로 명확하게 포맷하세요. 간결하고 흥미롭게 만들고 관련 이모지를 포함하세요. 트윗당 최대 280자.",
        linkedin: "당신은 LinkedIn 콘텐츠 전략가입니다. 다음 음성 내용을 전문적인 LinkedIn 게시물로 변환하세요. 단락을 사용하고 인사이트를 포함하며 전문가들에게 가치 있게 만드세요. 마지막에 관련 해시태그를 추가하세요.",
        instagram: "당신은 Instagram 콘텐츠 크리에이터입니다. 다음 음성 내용을 매력적인 Instagram 캡션으로 변환하세요. 진정성 있게 만들고 가독성을 위해 줄 바꿈을 사용하며 이모지를 포함하고 마지막에 관련 해시태그를 추가하세요."
    },
    es: {
        twitter: "Eres un experto en redes sociales. Convierte la siguiente transcripción en un hilo atractivo de Twitter/X. Usa formato claro con tweets numerados. Hazlo conciso, atractivo e incluye emojis relevantes. Máximo 280 caracteres por tweet.",
        linkedin: "Eres un estratega de contenido de LinkedIn. Convierte la siguiente transcripción en una publicación profesional de LinkedIn. Usa párrafos, incluye perspectivas y hazlo valioso para profesionales. Añade hashtags relevantes al final.",
        instagram: "Eres un creador de contenido de Instagram. Convierte la siguiente transcripción en un caption atractivo de Instagram. Hazlo auténtico, usa saltos de línea para legibilidad, incluye emojis y añade hashtags relevantes al final."
    },
    ja: {
        twitter: "あなたはソーシャルメディアの専門家です。次の音声内容を魅力的なTwitter/Xスレッドに変換してください。番号付きツイートで明確にフォーマットしてください。簡潔で魅力的に、関連する絵文字を含めてください。ツイートあたり最大280文字。",
        linkedin: "あなたはLinkedInコンテンツストラテジストです。次の音声内容をプロフェッショナルなLinkedIn投稿に変換してください。段落を使用し、洞察を含め、プロフェッショナルにとって価値のあるものにしてください。最後に関連するハッシュタグを追加してください。",
        instagram: "あなたはInstagramコンテンツクリエイターです。次の音声内容を魅力的なInstagramキャプションに変換してください。本物らしく、読みやすさのために改行を使用し、絵文字を含め、最後に関連するハッシュタグを追加してください。"
    },
    zh: {
        twitter: "你是社交媒体专家。将以下语音内容转换为吸引人的Twitter/X帖子串。使用编号推文格式清晰呈现。保持简洁、有吸引力，并包含相关表情符号。每条推文最多280个字符。",
        linkedin: "你是LinkedIn内容策略师。将以下语音内容转换为专业的LinkedIn帖子。使用段落，包含见解，使其对专业人士有价值。在末尾添加相关话题标签。",
        instagram: "你是Instagram内容创作者。将以下语音内容转换为吸引人的Instagram说明。保持真实，使用换行提高可读性，包含表情符号，并在末尾添加相关话题标签。"
    }
};

const TONE_MODIFIERS = {
    en: {
        professional: "Maintain a professional and polished tone.",
        casual: "Use a friendly, conversational, and casual tone.",
        storytelling: "Use narrative storytelling techniques with emotional engagement."
    },
    ko: {
        professional: "전문적이고 세련된 톤을 유지하세요.",
        casual: "친근하고 대화형의 캐주얼한 톤을 사용하세요.",
        storytelling: "감정적 참여를 위한 내러티브 스토리텔링 기법을 사용하세요."
    },
    es: {
        professional: "Mantén un tono profesional y pulido.",
        casual: "Usa un tono amigable, conversacional y casual.",
        storytelling: "Usa técnicas de narración narrativa con compromiso emocional."
    },
    ja: {
        professional: "プロフェッショナルで洗練されたトーンを維持してください。",
        casual: "フレンドリーで会話的なカジュアルなトーンを使用してください。",
        storytelling: "感情的な関与を伴うナラティブストーリーテリング技法を使用してください。"
    },
    zh: {
        professional: "保持专业而精致的语气。",
        casual: "使用友好、对话式的休闲语气。",
        storytelling: "使用叙事讲故事技巧，注重情感参与。"
    }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
        || req.headers['x-real-ip']
        || req.socket?.remoteAddress
        || 'unknown';

    if (isRateLimited(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // Server-side usage limit check
    const usage = await checkUsage(clientIp);
    if (!usage.allowed) {
        return res.status(403).json({
            error: 'Daily limit reached',
            usage: { count: usage.count, limit: usage.limit }
        });
    }

    try {
        // Parse form data
        const form = formidable({
            maxFileSize: 25 * 1024 * 1024,
            keepExtensions: true,
        });

        const parseResult = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });

        const { fields, files } = parseResult;

        // Extract audio file
        let audioFile;
        if (Array.isArray(files.audio)) {
            audioFile = files.audio[0];
        } else if (files.audio) {
            audioFile = files.audio;
        } else {
            throw new Error('No audio file received');
        }

        // Validate audio file type
        if (!isValidAudioFile(audioFile)) {
            try { fs.unlinkSync(audioFile.filepath); } catch (_) {}
            return res.status(400).json({ error: 'Invalid file type. Please upload an audio file.' });
        }

        // Extract and validate fields
        const platforms = JSON.parse(Array.isArray(fields.platforms) ? fields.platforms[0] : fields.platforms);
        const tone = Array.isArray(fields.tone) ? fields.tone[0] : fields.tone;

        const validPlatforms = ['twitter', 'linkedin', 'instagram'];
        const validTones = ['professional', 'casual', 'storytelling'];

        if (!Array.isArray(platforms) || !platforms.every(p => validPlatforms.includes(p))) {
            return res.status(400).json({ error: 'Invalid platform selection.' });
        }
        if (!validTones.includes(tone)) {
            return res.status(400).json({ error: 'Invalid tone selection.' });
        }

        // Step 1: Transcribe audio using OpenAI Whisper SDK
        const transcript = await transcribeAudio(audioFile.filepath);

        // Detect language from transcript
        const language = detectLanguage(transcript);

        // Step 2: Generate posts for each platform (partial success supported)
        const results = await Promise.allSettled(
            platforms.map(platform => generatePost(transcript, platform, tone, language))
        );

        const posts = [];
        const errors = [];
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                posts.push(result.value);
            } else {
                errors.push(platforms[i]);
            }
        });

        // Clean up temp file
        try {
            fs.unlinkSync(audioFile.filepath);
        } catch (_) {}

        if (posts.length === 0) {
            return res.status(500).json({ error: 'Failed to generate posts for all platforms.' });
        }

        // Increment server-side usage after successful conversion
        await incrementUsage(clientIp);

        res.status(200).json({ posts, failedPlatforms: errors.length > 0 ? errors : undefined });

    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

async function transcribeAudio(filepath) {
    try {
        // Use OpenAI SDK - much cleaner!
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filepath),
            model: 'whisper-1',
        });

        return transcription.text;

    } catch (error) {
        throw new Error('Failed to transcribe audio');
    }
}

function detectLanguage(text) {
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const japaneseRegex = /[ぁ-んァ-ン]/;
    const chineseRegex = /[\u4e00-\u9fff]/;
    const spanishRegex = /[áéíóúñüÁÉÍÓÚÑÜ¿¡]/;

    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
    if (chineseRegex.test(text)) return 'zh';
    if (spanishRegex.test(text)) return 'es';
    return 'en';
}

async function generatePost(transcript, platform, tone, language) {
    try {
        const systemPrompt = SYSTEM_PROMPTS[language][platform];
        const toneModifier = TONE_MODIFIERS[language][tone];

        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
                role: 'user',
                content: `${systemPrompt}\n\n${toneModifier}\n\nTranscript:\n${transcript}`
            }]
        });

        const content = message.content[0].text;

        return {
            platform,
            content
        };

    } catch (error) {
        throw new Error(`Failed to generate ${platform} post`);
    }
}