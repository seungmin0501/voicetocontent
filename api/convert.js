import Anthropic from '@anthropic-ai/sdk';
import formidable from 'formidable';
import fs from 'fs';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

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
    }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse form data
        const form = formidable({
            maxFileSize: 25 * 1024 * 1024, // 25MB
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve([fields, files]);
            });
        });

        const audioFile = files.audio[0];
        const platforms = JSON.parse(fields.platforms[0]);
        const tone = fields.tone[0];

        // Step 1: Transcribe audio using OpenAI Whisper
        const audioBuffer = fs.readFileSync(audioFile.filepath);
        const transcript = await transcribeAudio(audioBuffer, audioFile.originalFilename);

        // Detect language from transcript
        const language = detectLanguage(transcript);

        // Step 2: Generate posts for each platform
        const posts = await Promise.all(
            platforms.map(platform => generatePost(transcript, platform, tone, language))
        );

        // Clean up temp file
        fs.unlinkSync(audioFile.filepath);

        res.status(200).json({ posts });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function transcribeAudio(audioBuffer, filename) {
    try {
        // Use OpenAI Whisper API
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: createWhisperFormData(audioBuffer, filename)
        });

        if (!response.ok) {
            throw new Error('Whisper API error');
        }

        const data = await response.json();
        return data.text;

    } catch (error) {
        console.error('Transcription error:', error);
        throw new Error('Failed to transcribe audio');
    }
}

function createWhisperFormData(audioBuffer, filename) {
    const FormData = require('form-data');
    const formData = new FormData();
    
    formData.append('file', audioBuffer, {
        filename: filename || 'audio.webm',
        contentType: 'audio/webm'
    });
    formData.append('model', 'whisper-1');
    
    return formData;
}

function detectLanguage(text) {
    // Simple language detection
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const japaneseRegex = /[ぁ-んァ-ン一-龯]/;
    const spanishRegex = /[áéíóúñüÁÉÍÓÚÑÜ¿¡]/;
    
    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
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
        console.error(`Error generating ${platform} post:`, error);
        throw new Error(`Failed to generate ${platform} post`);
    }
}