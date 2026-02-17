// ============================================
// INTERNATIONALIZATION (i18n)
// ============================================

let currentLanguage = 'en';

const translations = {
    en: {
        // Meta
        pageTitle: 'VoiceToContent - Turn Voice Memos into Social Posts',
        metaDescription: 'Transform your voice memos into perfect social media posts in 30 seconds. For busy creators.',
        keywords: 'voice to text, social media post generator, AI content creator, voice memo, Twitter thread, LinkedIn post, Instagram caption',

        // Header
        headerTitle: '🎙️ VoiceToContent',
        upgrade: 'Upgrade',

        // Hero
        heroHeading: 'Turn Voice Memos into Social Posts',
        heroSubtitle: 'Speak your thoughts. AI transforms them into perfect posts for X, LinkedIn, and Instagram.',

        // Cookie Banner
        cookieMessage: '🍪 We use cookies to track your free usage limit (3 conversions/day). No personal data is collected.',
        cookieAccept: 'Accept',
        cookieDecline: 'Decline',

        // Input Methods
        recordBtn: 'Record Audio',
        uploadBtn: 'Upload File',

        // Recording
        startRecord: 'Start Recording',
        stopRecord: 'Stop Recording',
        recordHint: '💡 Speak naturally about your ideas, thoughts, or experiences',
        recordLimit: 'Free: Max 3 minutes | Premium: Max 10 minutes',

        // Upload
        uploadDropText: 'Click or drag audio file here',
        uploadFormats: 'Supports: MP3, M4A, WAV, WEBM',
        uploadLimit: 'Free: Max 10MB | Premium: Max 25MB',

        // Options
        optionsTitle: 'Conversion Options',
        platformsLabel: 'Platforms:',
        platformTwitter: 'X/Twitter Thread',
        platformLinkedin: 'LinkedIn Post',
        platformInstagram: 'Instagram Caption',
        toneLabel: 'Tone:',
        toneProfessional: 'Professional',
        toneCasual: 'Casual',
        toneStorytelling: 'Storytelling',
        generateBtn: 'Generate Posts',

        // Loading
        loadingTitle: 'Converting your voice to amazing posts...',
        loadingMessages: [
            '🎤 Listening to your voice...',
            '🤖 AI is thinking hard...',
            '✨ Crafting the perfect words...',
            '📝 Almost there...',
            '🚀 Polishing your posts...'
        ],

        // Results
        resultsTitle: '✅ Your Posts Are Ready!',
        newBtn: '🎤 Create Another',
        copyBtn: '📋 Copy',
        copiedBtn: '✓ Copied!',
        platformNames: {
            twitter: 'X/Twitter Thread',
            linkedin: 'LinkedIn Post',
            instagram: 'Instagram Caption'
        },

        // Features
        featuresTitle: 'Why VoiceToContent?',
        feature1Title: '30-Second Creation',
        feature1Desc: 'From voice memo to polished post in half a minute',
        feature2Title: 'Platform-Optimized',
        feature2Desc: 'Each post tailored for X, LinkedIn, or Instagram',
        feature3Title: 'Create On-The-Go',
        feature3Desc: 'Record while driving, walking, or thinking',
        feature4Title: 'Your Voice, Polished',
        feature4Desc: 'Maintains your authenticity while perfecting structure',

        // Pricing
        pricingTitle: 'Simple Pricing',
        pricingFreeTitle: 'Free',
        pricingFreePrice: '$0',
        pricingFreePerMonth: '/month',
        pricingFreeFeatures: [
            '✓ 3 conversions per day',
            '✓ Max 3 minutes recording',
            '✓ Max 10MB file upload',
            '✓ All platforms',
            '✓ Basic tones'
        ],
        pricingFreeBtn: 'Current Plan',
        pricingPremiumBadge: 'Most Popular',
        pricingPremiumTitle: 'Premium',
        pricingPremiumPrice: '$9.99',
        pricingPremiumPerMonth: '/month',
        pricingPremiumFeatures: [
            '✓ Unlimited conversions',
            '✓ Max 10 minutes recording',
            '✓ Max 25MB file upload',
            '✓ All platforms',
            '✓ All tones & styles',
            '✓ Multi-language support',
            '✓ Priority support'
        ],
        pricingPremiumBtn: 'Upgrade Now',

        // Modal
        modalTitle: '⚡ Upgrade to Premium',
        modalDesc: "You've used all 3 free conversions today. Upgrade for unlimited access!",
        modalMonthly: 'Monthly',
        modalMonthlyPrice: '$9.99',
        modalMonthlyPeriod: '/month',
        modalAnnual: 'Annual',
        modalAnnualPrice: '$99',
        modalAnnualPeriod: '/year',
        modalAnnualSavings: 'Just $8.25/month',
        modalSaveBadge: 'Save 17%',
        modalFeatures: [
            '✓ Unlimited conversions',
            '✓ 10-minute audio limit',
            '✓ 25MB file uploads',
            '✓ Priority support'
        ],
        modalUpgradeBtn: 'Upgrade Now',
        modalCancel: 'Maybe Later',

        // Footer
        footerCredit: 'Made with ❤️ by',
        footerDesc: 'Part of the #BuildInPublic journey | Product #2 of 10 in 2026',

        // Alerts
        alertCookieRequired: 'Please accept cookies to use the free tier. Cookies are only used to track your daily usage limit.',
        alertCookieDeclined: 'Without cookies, you cannot use the free tier. Please upgrade to Premium or accept cookies.',
        alertMicError: 'Could not access microphone. Please check your browser permissions.',
        alertRecordingLimit: 'Recording stopped at {minutes} minutes (free tier limit). Upgrade for longer recordings!',
        alertAudioFileOnly: 'Please upload an audio file (MP3, M4A, WAV, etc.)',
        alertFileTooLarge: 'File too large! Free tier limit: {maxFree}MB. Upgrade to Premium for {maxPremium}MB files.',
        alertNoAudio: 'Please record or upload audio first!',
        alertNoPlatform: 'Please select at least one platform!',
        alertConversionError: 'Something went wrong. Please try again.',
        alertUpgradeComingSoon: 'Premium upgrade coming soon! For now, enjoy the free tier. 🚀',
        alertPartialFailure: 'generation failed. Other posts are ready.',

        // Buttons
        editBtn: 'Edit',
        saveBtn: 'Save',

        // Usage
        usageCount: '{used}/{limit} used today'
    },

    ko: {
        pageTitle: 'VoiceToContent - 음성 메모를 소셜 포스트로',
        metaDescription: '30초 만에 음성 메모를 완벽한 소셜 미디어 포스트로 변환하세요. 바쁜 크리에이터를 위해.',
        keywords: '음성 텍스트 변환, 소셜 미디어 글 생성기, AI 콘텐츠 생성, 음성 메모, 트위터 스레드, 링크드인 포스트, 인스타그램 캡션, 보이스투콘텐츠',

        headerTitle: '🎙️ VoiceToContent',
        upgrade: '업그레이드',

        heroHeading: '음성 메모를 소셜 포스트로 변환',
        heroSubtitle: '생각을 말하세요. AI가 X, LinkedIn, Instagram에 맞는 완벽한 포스트로 변환합니다.',

        cookieMessage: '🍪 무료 사용 한도(하루 3회)를 추적하기 위해 쿠키를 사용합니다. 개인 데이터는 수집하지 않습니다.',
        cookieAccept: '수락',
        cookieDecline: '거절',

        recordBtn: '음성 녹음',
        uploadBtn: '파일 업로드',

        startRecord: '녹음 시작',
        stopRecord: '녹음 중지',
        recordHint: '💡 아이디어, 생각, 경험에 대해 자연스럽게 말해보세요',
        recordLimit: '무료: 최대 3분 | 프리미엄: 최대 10분',

        uploadDropText: '오디오 파일을 클릭하거나 여기에 드래그하세요',
        uploadFormats: '지원 형식: MP3, M4A, WAV, WEBM',
        uploadLimit: '무료: 최대 10MB | 프리미엄: 최대 25MB',

        optionsTitle: '변환 옵션',
        platformsLabel: '플랫폼:',
        platformTwitter: 'X/트위터 스레드',
        platformLinkedin: 'LinkedIn 게시물',
        platformInstagram: 'Instagram 캡션',
        toneLabel: '톤:',
        toneProfessional: '전문적',
        toneCasual: '캐주얼',
        toneStorytelling: '스토리텔링',
        generateBtn: '포스트 생성',

        loadingTitle: '음성을 멋진 포스트로 변환 중...',
        loadingMessages: [
            '🎤 음성을 듣고 있습니다...',
            '🤖 AI가 열심히 생각 중...',
            '✨ 완벽한 문구를 만들고 있습니다...',
            '📝 거의 완료...',
            '🚀 포스트를 다듬고 있습니다...'
        ],

        resultsTitle: '✅ 포스트가 준비되었습니다!',
        newBtn: '🎤 새로 만들기',
        copyBtn: '📋 복사',
        copiedBtn: '✓ 복사됨!',
        platformNames: {
            twitter: 'X/트위터 스레드',
            linkedin: 'LinkedIn 게시물',
            instagram: 'Instagram 캡션'
        },

        featuresTitle: '왜 VoiceToContent인가요?',
        feature1Title: '30초 만에 생성',
        feature1Desc: '음성 메모에서 완성된 포스트까지 30초',
        feature2Title: '플랫폼 최적화',
        feature2Desc: 'X, LinkedIn, Instagram에 맞춤 제작',
        feature3Title: '이동 중 생성',
        feature3Desc: '운전, 산책, 생각 중에도 녹음 가능',
        feature4Title: '당신의 목소리, 더 세련되게',
        feature4Desc: '진정성은 유지하면서 구조를 완벽하게',

        pricingTitle: '심플한 요금제',
        pricingFreeTitle: '무료',
        pricingFreePrice: '$0',
        pricingFreePerMonth: '/월',
        pricingFreeFeatures: [
            '✓ 하루 3회 변환',
            '✓ 최대 3분 녹음',
            '✓ 최대 10MB 파일 업로드',
            '✓ 모든 플랫폼',
            '✓ 기본 톤'
        ],
        pricingFreeBtn: '현재 플랜',
        pricingPremiumBadge: '가장 인기',
        pricingPremiumTitle: '프리미엄',
        pricingPremiumPrice: '$9.99',
        pricingPremiumPerMonth: '/월',
        pricingPremiumFeatures: [
            '✓ 무제한 변환',
            '✓ 최대 10분 녹음',
            '✓ 최대 25MB 파일 업로드',
            '✓ 모든 플랫폼',
            '✓ 모든 톤 & 스타일',
            '✓ 다국어 지원',
            '✓ 우선 지원'
        ],
        pricingPremiumBtn: '지금 업그레이드',

        modalTitle: '⚡ 프리미엄으로 업그레이드',
        modalDesc: '오늘 무료 변환 3회를 모두 사용했습니다. 무제한 이용을 위해 업그레이드하세요!',
        modalMonthly: '월간',
        modalMonthlyPrice: '$9.99',
        modalMonthlyPeriod: '/월',
        modalAnnual: '연간',
        modalAnnualPrice: '$99',
        modalAnnualPeriod: '/년',
        modalAnnualSavings: '월 $8.25',
        modalSaveBadge: '17% 할인',
        modalFeatures: [
            '✓ 무제한 변환',
            '✓ 10분 오디오 제한',
            '✓ 25MB 파일 업로드',
            '✓ 우선 지원'
        ],
        modalUpgradeBtn: '지금 업그레이드',
        modalCancel: '나중에',

        footerCredit: '❤️를 담아 만든',
        footerDesc: '#BuildInPublic 여정 | 2026년 10개 중 2번째 프로덕트',

        alertCookieRequired: '무료 티어를 사용하려면 쿠키를 수락해 주세요. 쿠키는 일일 사용량 추적에만 사용됩니다.',
        alertCookieDeclined: '쿠키 없이는 무료 티어를 사용할 수 없습니다. 프리미엄으로 업그레이드하거나 쿠키를 수락해 주세요.',
        alertMicError: '마이크에 접근할 수 없습니다. 브라우저 권한을 확인해 주세요.',
        alertRecordingLimit: '녹음이 {minutes}분에서 중지되었습니다 (무료 티어 제한). 더 긴 녹음을 위해 업그레이드하세요!',
        alertAudioFileOnly: '오디오 파일을 업로드해 주세요 (MP3, M4A, WAV 등)',
        alertFileTooLarge: '파일이 너무 큽니다! 무료 티어 제한: {maxFree}MB. 프리미엄으로 업그레이드하면 {maxPremium}MB까지 가능합니다.',
        alertNoAudio: '먼저 오디오를 녹음하거나 업로드해 주세요!',
        alertNoPlatform: '최소 하나의 플랫폼을 선택해 주세요!',
        alertConversionError: '문제가 발생했습니다. 다시 시도해 주세요.',
        alertUpgradeComingSoon: '프리미엄 업그레이드가 곧 출시됩니다! 지금은 무료 티어를 즐겨주세요. 🚀',
        alertPartialFailure: '생성에 실패했습니다. 나머지 포스트는 준비되었습니다.',

        editBtn: '편집',
        saveBtn: '저장',

        usageCount: '오늘 {used}/{limit} 사용'
    },

    ja: {
        pageTitle: 'VoiceToContent - 音声メモをソーシャル投稿に',
        metaDescription: '30秒で音声メモを完璧なソーシャルメディア投稿に変換。忙しいクリエイターのために。',
        keywords: '音声テキスト変換, SNS投稿作成, AIコンテンツ作成, ボイスメモ, ツイッタースレッド, LinkedIn投稿, インスタグラムキャプション',

        headerTitle: '🎙️ VoiceToContent',
        upgrade: 'アップグレード',

        heroHeading: '音声メモをソーシャル投稿に変換',
        heroSubtitle: '考えを話すだけ。AIがX、LinkedIn、Instagram向けの完璧な投稿に変換します。',

        cookieMessage: '🍪 無料利用制限（1日3回）を追跡するためにCookieを使用しています。個人データは収集しません。',
        cookieAccept: '同意する',
        cookieDecline: '拒否する',

        recordBtn: '音声録音',
        uploadBtn: 'ファイルアップロード',

        startRecord: '録音開始',
        stopRecord: '録音停止',
        recordHint: '💡 アイデア、考え、経験について自然に話してください',
        recordLimit: '無料: 最大3分 | プレミアム: 最大10分',

        uploadDropText: 'クリックまたは音声ファイルをここにドラッグ',
        uploadFormats: '対応形式: MP3, M4A, WAV, WEBM',
        uploadLimit: '無料: 最大10MB | プレミアム: 最大25MB',

        optionsTitle: '変換オプション',
        platformsLabel: 'プラットフォーム:',
        platformTwitter: 'X/Twitterスレッド',
        platformLinkedin: 'LinkedIn投稿',
        platformInstagram: 'Instagramキャプション',
        toneLabel: 'トーン:',
        toneProfessional: 'プロフェッショナル',
        toneCasual: 'カジュアル',
        toneStorytelling: 'ストーリーテリング',
        generateBtn: '投稿を生成',

        loadingTitle: '音声を素晴らしい投稿に変換中...',
        loadingMessages: [
            '🎤 あなたの声を聞いています...',
            '🤖 AIが一生懸命考えています...',
            '✨ 完璧な言葉を作成中...',
            '📝 もうすぐです...',
            '🚀 投稿を仕上げています...'
        ],

        resultsTitle: '✅ 投稿の準備ができました！',
        newBtn: '🎤 新しく作成',
        copyBtn: '📋 コピー',
        copiedBtn: '✓ コピー済み！',
        platformNames: {
            twitter: 'X/Twitterスレッド',
            linkedin: 'LinkedIn投稿',
            instagram: 'Instagramキャプション'
        },

        featuresTitle: 'なぜVoiceToContent？',
        feature1Title: '30秒で作成',
        feature1Desc: '音声メモから完成した投稿まで30秒',
        feature2Title: 'プラットフォーム最適化',
        feature2Desc: 'X、LinkedIn、Instagram向けにカスタマイズ',
        feature3Title: '移動中に作成',
        feature3Desc: '運転中、散歩中、考え中でも録音可能',
        feature4Title: 'あなたの声を洗練',
        feature4Desc: '本物らしさを保ちながら構造を完璧に',

        pricingTitle: 'シンプルな料金',
        pricingFreeTitle: '無料',
        pricingFreePrice: '$0',
        pricingFreePerMonth: '/月',
        pricingFreeFeatures: [
            '✓ 1日3回の変換',
            '✓ 最大3分の録音',
            '✓ 最大10MBファイルアップロード',
            '✓ 全プラットフォーム',
            '✓ 基本トーン'
        ],
        pricingFreeBtn: '現在のプラン',
        pricingPremiumBadge: '最も人気',
        pricingPremiumTitle: 'プレミアム',
        pricingPremiumPrice: '$9.99',
        pricingPremiumPerMonth: '/月',
        pricingPremiumFeatures: [
            '✓ 無制限の変換',
            '✓ 最大10分の録音',
            '✓ 最大25MBファイルアップロード',
            '✓ 全プラットフォーム',
            '✓ 全トーン＆スタイル',
            '✓ 多言語サポート',
            '✓ 優先サポート'
        ],
        pricingPremiumBtn: '今すぐアップグレード',

        modalTitle: '⚡ プレミアムにアップグレード',
        modalDesc: '本日の無料変換3回をすべて使用しました。無制限アクセスのためにアップグレードしてください！',
        modalMonthly: '月額',
        modalMonthlyPrice: '$9.99',
        modalMonthlyPeriod: '/月',
        modalAnnual: '年額',
        modalAnnualPrice: '$99',
        modalAnnualPeriod: '/年',
        modalAnnualSavings: '月あたり$8.25',
        modalSaveBadge: '17%オフ',
        modalFeatures: [
            '✓ 無制限の変換',
            '✓ 10分の音声制限',
            '✓ 25MBファイルアップロード',
            '✓ 優先サポート'
        ],
        modalUpgradeBtn: '今すぐアップグレード',
        modalCancel: 'また後で',

        footerCredit: '❤️を込めて作成',
        footerDesc: '#BuildInPublic の旅 | 2026年10個中2番目のプロダクト',

        alertCookieRequired: '無料プランを使用するにはCookieを受け入れてください。Cookieは日次使用量の追跡にのみ使用されます。',
        alertCookieDeclined: 'Cookieなしでは無料プランを使用できません。プレミアムにアップグレードするかCookieを受け入れてください。',
        alertMicError: 'マイクにアクセスできませんでした。ブラウザの権限を確認してください。',
        alertRecordingLimit: '録音が{minutes}分で停止しました（無料プラン制限）。アップグレードでより長い録音が可能です！',
        alertAudioFileOnly: '音声ファイルをアップロードしてください（MP3, M4A, WAVなど）',
        alertFileTooLarge: 'ファイルが大きすぎます！無料プラン制限: {maxFree}MB。プレミアムなら{maxPremium}MBまで可能です。',
        alertNoAudio: 'まず音声を録音またはアップロードしてください！',
        alertNoPlatform: '少なくとも1つのプラットフォームを選択してください！',
        alertConversionError: '問題が発生しました。もう一度お試しください。',
        alertUpgradeComingSoon: 'プレミアムアップグレードは近日公開予定！今は無料プランをお楽しみください。🚀',
        alertPartialFailure: 'の生成に失敗しました。他の投稿は準備できています。',

        editBtn: '編集',
        saveBtn: '保存',

        usageCount: '本日 {used}/{limit} 使用'
    },

    es: {
        pageTitle: 'VoiceToContent - Convierte Memos de Voz en Posts',
        metaDescription: 'Transforma tus memos de voz en publicaciones perfectas para redes sociales en 30 segundos. Para creadores ocupados.',
        keywords: 'voz a texto, generador de publicaciones, creador de contenido IA, memo de voz, hilo de Twitter, publicación LinkedIn, caption Instagram',

        headerTitle: '🎙️ VoiceToContent',
        upgrade: 'Mejorar',

        heroHeading: 'Convierte Memos de Voz en Posts Sociales',
        heroSubtitle: 'Habla tus ideas. La IA las transforma en posts perfectos para X, LinkedIn e Instagram.',

        cookieMessage: '🍪 Usamos cookies para rastrear tu límite de uso gratuito (3 conversiones/día). No se recopilan datos personales.',
        cookieAccept: 'Aceptar',
        cookieDecline: 'Rechazar',

        recordBtn: 'Grabar Audio',
        uploadBtn: 'Subir Archivo',

        startRecord: 'Iniciar Grabación',
        stopRecord: 'Detener Grabación',
        recordHint: '💡 Habla naturalmente sobre tus ideas, pensamientos o experiencias',
        recordLimit: 'Gratis: Máx 3 minutos | Premium: Máx 10 minutos',

        uploadDropText: 'Haz clic o arrastra un archivo de audio aquí',
        uploadFormats: 'Soporta: MP3, M4A, WAV, WEBM',
        uploadLimit: 'Gratis: Máx 10MB | Premium: Máx 25MB',

        optionsTitle: 'Opciones de Conversión',
        platformsLabel: 'Plataformas:',
        platformTwitter: 'Hilo X/Twitter',
        platformLinkedin: 'Publicación LinkedIn',
        platformInstagram: 'Caption Instagram',
        toneLabel: 'Tono:',
        toneProfessional: 'Profesional',
        toneCasual: 'Casual',
        toneStorytelling: 'Narrativo',
        generateBtn: 'Generar Posts',

        loadingTitle: 'Convirtiendo tu voz en posts increíbles...',
        loadingMessages: [
            '🎤 Escuchando tu voz...',
            '🤖 La IA está pensando...',
            '✨ Creando las palabras perfectas...',
            '📝 Casi listo...',
            '🚀 Puliendo tus posts...'
        ],

        resultsTitle: '✅ ¡Tus Posts Están Listos!',
        newBtn: '🎤 Crear Otro',
        copyBtn: '📋 Copiar',
        copiedBtn: '✓ ¡Copiado!',
        platformNames: {
            twitter: 'Hilo X/Twitter',
            linkedin: 'Publicación LinkedIn',
            instagram: 'Caption Instagram'
        },

        featuresTitle: '¿Por qué VoiceToContent?',
        feature1Title: 'Creación en 30 Segundos',
        feature1Desc: 'De memo de voz a post pulido en medio minuto',
        feature2Title: 'Optimizado por Plataforma',
        feature2Desc: 'Cada post adaptado para X, LinkedIn o Instagram',
        feature3Title: 'Crea en Movimiento',
        feature3Desc: 'Graba mientras conduces, caminas o piensas',
        feature4Title: 'Tu Voz, Pulida',
        feature4Desc: 'Mantiene tu autenticidad mientras perfecciona la estructura',

        pricingTitle: 'Precios Simples',
        pricingFreeTitle: 'Gratis',
        pricingFreePrice: '$0',
        pricingFreePerMonth: '/mes',
        pricingFreeFeatures: [
            '✓ 3 conversiones por día',
            '✓ Máx 3 minutos de grabación',
            '✓ Máx 10MB subida de archivos',
            '✓ Todas las plataformas',
            '✓ Tonos básicos'
        ],
        pricingFreeBtn: 'Plan Actual',
        pricingPremiumBadge: 'Más Popular',
        pricingPremiumTitle: 'Premium',
        pricingPremiumPrice: '$9.99',
        pricingPremiumPerMonth: '/mes',
        pricingPremiumFeatures: [
            '✓ Conversiones ilimitadas',
            '✓ Máx 10 minutos de grabación',
            '✓ Máx 25MB subida de archivos',
            '✓ Todas las plataformas',
            '✓ Todos los tonos y estilos',
            '✓ Soporte multilenguaje',
            '✓ Soporte prioritario'
        ],
        pricingPremiumBtn: 'Mejorar Ahora',

        modalTitle: '⚡ Mejora a Premium',
        modalDesc: 'Has usado las 3 conversiones gratuitas de hoy. ¡Mejora para acceso ilimitado!',
        modalMonthly: 'Mensual',
        modalMonthlyPrice: '$9.99',
        modalMonthlyPeriod: '/mes',
        modalAnnual: 'Anual',
        modalAnnualPrice: '$99',
        modalAnnualPeriod: '/año',
        modalAnnualSavings: 'Solo $8.25/mes',
        modalSaveBadge: 'Ahorra 17%',
        modalFeatures: [
            '✓ Conversiones ilimitadas',
            '✓ Límite de audio de 10 minutos',
            '✓ Subida de archivos de 25MB',
            '✓ Soporte prioritario'
        ],
        modalUpgradeBtn: 'Mejorar Ahora',
        modalCancel: 'Quizás Después',

        footerCredit: 'Hecho con ❤️ por',
        footerDesc: 'Parte del viaje #BuildInPublic | Producto #2 de 10 en 2026',

        alertCookieRequired: 'Por favor acepta las cookies para usar el plan gratuito. Las cookies solo se usan para rastrear tu límite diario.',
        alertCookieDeclined: 'Sin cookies, no puedes usar el plan gratuito. Por favor mejora a Premium o acepta las cookies.',
        alertMicError: 'No se pudo acceder al micrófono. Por favor verifica los permisos del navegador.',
        alertRecordingLimit: '¡Grabación detenida a los {minutes} minutos (límite del plan gratuito). ¡Mejora para grabaciones más largas!',
        alertAudioFileOnly: 'Por favor sube un archivo de audio (MP3, M4A, WAV, etc.)',
        alertFileTooLarge: '¡Archivo demasiado grande! Límite gratuito: {maxFree}MB. Mejora a Premium para archivos de {maxPremium}MB.',
        alertNoAudio: '¡Por favor graba o sube audio primero!',
        alertNoPlatform: '¡Por favor selecciona al menos una plataforma!',
        alertConversionError: 'Algo salió mal. Por favor intenta de nuevo.',
        alertUpgradeComingSoon: '¡Mejora Premium próximamente! Por ahora, disfruta del plan gratuito. 🚀',
        alertPartialFailure: 'generación fallida. Los demás posts están listos.',

        editBtn: 'Editar',
        saveBtn: 'Guardar',

        usageCount: '{used}/{limit} usados hoy'
    },

    zh: {
        pageTitle: 'VoiceToContent - 将语音备忘录转为社交帖子',
        metaDescription: '30秒内将语音备忘录转化为完美的社交媒体帖子。为忙碌的创作者打造。',
        keywords: '语音转文字, 社交媒体帖子生成器, AI内容创作, 语音备忘录, 推特话题, 领英帖子, Instagram标题',

        headerTitle: '🎙️ VoiceToContent',
        upgrade: '升级',

        heroHeading: '将语音备忘录转为社交帖子',
        heroSubtitle: '说出你的想法。AI将其转化为X、LinkedIn和Instagram的完美帖子。',

        cookieMessage: '🍪 我们使用Cookie追踪您的免费使用限制（每天3次转换）。不收集个人数据。',
        cookieAccept: '接受',
        cookieDecline: '拒绝',

        recordBtn: '录制音频',
        uploadBtn: '上传文件',

        startRecord: '开始录制',
        stopRecord: '停止录制',
        recordHint: '💡 自然地谈论你的想法、思考或经历',
        recordLimit: '免费: 最长3分钟 | 高级: 最长10分钟',

        uploadDropText: '点击或拖拽音频文件到这里',
        uploadFormats: '支持格式: MP3, M4A, WAV, WEBM',
        uploadLimit: '免费: 最大10MB | 高级: 最大25MB',

        optionsTitle: '转换选项',
        platformsLabel: '平台:',
        platformTwitter: 'X/Twitter 帖子串',
        platformLinkedin: 'LinkedIn 帖子',
        platformInstagram: 'Instagram 说明',
        toneLabel: '语气:',
        toneProfessional: '专业',
        toneCasual: '休闲',
        toneStorytelling: '叙事',
        generateBtn: '生成帖子',

        loadingTitle: '正在将你的语音转换为精彩帖子...',
        loadingMessages: [
            '🎤 正在聆听你的声音...',
            '🤖 AI正在努力思考...',
            '✨ 正在打造完美文案...',
            '📝 快要完成了...',
            '🚀 正在润色你的帖子...'
        ],

        resultsTitle: '✅ 你的帖子已准备好！',
        newBtn: '🎤 重新创建',
        copyBtn: '📋 复制',
        copiedBtn: '✓ 已复制！',
        platformNames: {
            twitter: 'X/Twitter 帖子串',
            linkedin: 'LinkedIn 帖子',
            instagram: 'Instagram 说明'
        },

        featuresTitle: '为什么选择 VoiceToContent？',
        feature1Title: '30秒创建',
        feature1Desc: '从语音备忘录到精美帖子只需半分钟',
        feature2Title: '平台优化',
        feature2Desc: '每篇帖子针对X、LinkedIn或Instagram量身定制',
        feature3Title: '随时创建',
        feature3Desc: '开车、散步或思考时都能录制',
        feature4Title: '你的声音，更精致',
        feature4Desc: '保持真实性的同时完善结构',

        pricingTitle: '简单定价',
        pricingFreeTitle: '免费',
        pricingFreePrice: '$0',
        pricingFreePerMonth: '/月',
        pricingFreeFeatures: [
            '✓ 每天3次转换',
            '✓ 最长3分钟录制',
            '✓ 最大10MB文件上传',
            '✓ 所有平台',
            '✓ 基本语气'
        ],
        pricingFreeBtn: '当前方案',
        pricingPremiumBadge: '最受欢迎',
        pricingPremiumTitle: '高级版',
        pricingPremiumPrice: '$9.99',
        pricingPremiumPerMonth: '/月',
        pricingPremiumFeatures: [
            '✓ 无限转换',
            '✓ 最长10分钟录制',
            '✓ 最大25MB文件上传',
            '✓ 所有平台',
            '✓ 所有语气和风格',
            '✓ 多语言支持',
            '✓ 优先支持'
        ],
        pricingPremiumBtn: '立即升级',

        modalTitle: '⚡ 升级到高级版',
        modalDesc: '您今天已用完3次免费转换。升级获得无限使用权！',
        modalMonthly: '月付',
        modalMonthlyPrice: '$9.99',
        modalMonthlyPeriod: '/月',
        modalAnnual: '年付',
        modalAnnualPrice: '$99',
        modalAnnualPeriod: '/年',
        modalAnnualSavings: '每月仅$8.25',
        modalSaveBadge: '省17%',
        modalFeatures: [
            '✓ 无限转换',
            '✓ 10分钟音频限制',
            '✓ 25MB文件上传',
            '✓ 优先支持'
        ],
        modalUpgradeBtn: '立即升级',
        modalCancel: '以后再说',

        footerCredit: '用 ❤️ 制作',
        footerDesc: '#BuildInPublic 旅程的一部分 | 2026年10个产品中的第2个',

        alertCookieRequired: '请接受Cookie以使用免费方案。Cookie仅用于追踪您的每日使用限制。',
        alertCookieDeclined: '没有Cookie无法使用免费方案。请升级到高级版或接受Cookie。',
        alertMicError: '无法访问麦克风。请检查浏览器权限。',
        alertRecordingLimit: '录制在{minutes}分钟处停止（免费方案限制）。升级以获得更长的录制时间！',
        alertAudioFileOnly: '请上传音频文件（MP3, M4A, WAV等）',
        alertFileTooLarge: '文件太大！免费方案限制: {maxFree}MB。升级到高级版可上传{maxPremium}MB文件。',
        alertNoAudio: '请先录制或上传音频！',
        alertNoPlatform: '请至少选择一个平台！',
        alertConversionError: '出了点问题。请重试。',
        alertUpgradeComingSoon: '高级版升级即将推出！现在请享受免费方案。🚀',
        alertPartialFailure: '生成失败。其他帖子已准备好。',

        editBtn: '编辑',
        saveBtn: '保存',

        usageCount: '今天已用 {used}/{limit}'
    }
};

// Get translation by key (supports dot notation)
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        if (value === undefined) return key;
        value = value[k];
    }
    return value !== undefined ? value : key;
}

// Detect browser language and map to supported languages
function detectBrowserLanguage() {
    // URL parameter takes highest priority (for hreflang SEO)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && translations[urlLang]) {
        return urlLang;
    }

    const savedLang = localStorage.getItem('vtc-language');
    if (savedLang && translations[savedLang]) {
        return savedLang;
    }

    const browserLang = navigator.language || navigator.userLanguage || 'en';
    const langCode = browserLang.split('-')[0].toLowerCase();

    if (translations[langCode]) {
        return langCode;
    }

    return 'en';
}

// Set language and update UI
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    localStorage.setItem('vtc-language', lang);

    const select = document.getElementById('languageSelect');
    if (select && select.value !== lang) {
        select.value = lang;
    }

    updateUI();
}

// Update all UI text elements
function updateUI() {
    // Page title & meta
    document.title = t('pageTitle');
    document.documentElement.lang = currentLanguage;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'));
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', t('keywords'));

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t('pageTitle'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('metaDescription'));
    const ogLocaleMap = { en: 'en_US', ko: 'ko_KR', ja: 'ja_JP', es: 'es_ES', zh: 'zh_CN' };
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', ogLocaleMap[currentLanguage] || 'en_US');

    // Twitter Card
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', t('pageTitle'));
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', t('metaDescription'));

    // Canonical & OG URL
    const baseUrl = 'https://voicetocontent.vercel.app/';
    const langUrl = currentLanguage === 'en' ? baseUrl : baseUrl + '?lang=' + currentLanguage;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', langUrl);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', langUrl);

    // Header
    const headerTitle = document.getElementById('headerTitle');
    if (headerTitle) headerTitle.textContent = t('headerTitle');
    const upgradeLink = document.getElementById('upgradeLink');
    if (upgradeLink) upgradeLink.textContent = t('upgrade');

    // Hero
    const heroHeading = document.getElementById('heroHeading');
    if (heroHeading) heroHeading.textContent = t('heroHeading');
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = t('heroSubtitle');

    // Cookie banner
    const cookieMsg = document.getElementById('cookieMessage');
    if (cookieMsg) cookieMsg.textContent = t('cookieMessage');
    const acceptBtn = document.getElementById('acceptCookies');
    if (acceptBtn) acceptBtn.textContent = t('cookieAccept');
    const declineBtn = document.getElementById('declineCookies');
    if (declineBtn) declineBtn.textContent = t('cookieDecline');

    // Input methods
    const recordBtnText = document.getElementById('recordBtnText');
    if (recordBtnText) recordBtnText.textContent = t('recordBtn');
    const uploadBtnText = document.getElementById('uploadBtnText');
    if (uploadBtnText) uploadBtnText.textContent = t('uploadBtn');

    // Recording
    const startRecordText = document.getElementById('startRecordText');
    if (startRecordText) startRecordText.textContent = t('startRecord');
    const stopRecordText = document.getElementById('stopRecordText');
    if (stopRecordText) stopRecordText.textContent = t('stopRecord');
    const recordHint = document.getElementById('recordHint');
    if (recordHint) recordHint.textContent = t('recordHint');
    const recordLimitText = document.getElementById('recordLimitText');
    if (recordLimitText) recordLimitText.textContent = t('recordLimit');

    // Upload
    const uploadDropText = document.getElementById('uploadDropText');
    if (uploadDropText) uploadDropText.textContent = t('uploadDropText');
    const uploadFormats = document.getElementById('uploadFormats');
    if (uploadFormats) uploadFormats.textContent = t('uploadFormats');
    const uploadLimitText = document.getElementById('uploadLimitText');
    if (uploadLimitText) uploadLimitText.textContent = t('uploadLimit');

    // Options
    const optionsTitle = document.getElementById('optionsTitle');
    if (optionsTitle) optionsTitle.textContent = t('optionsTitle');
    const platformsLabel = document.getElementById('platformsLabel');
    if (platformsLabel) platformsLabel.textContent = t('platformsLabel');
    const platformTwitter = document.getElementById('platformTwitterLabel');
    if (platformTwitter) platformTwitter.textContent = t('platformTwitter');
    const platformLinkedin = document.getElementById('platformLinkedinLabel');
    if (platformLinkedin) platformLinkedin.textContent = t('platformLinkedin');
    const platformInstagram = document.getElementById('platformInstagramLabel');
    if (platformInstagram) platformInstagram.textContent = t('platformInstagram');
    const toneLabel = document.getElementById('toneLabel');
    if (toneLabel) toneLabel.textContent = t('toneLabel');
    const toneProfessional = document.getElementById('toneProfessionalLabel');
    if (toneProfessional) toneProfessional.textContent = t('toneProfessional');
    const toneCasual = document.getElementById('toneCasualLabel');
    if (toneCasual) toneCasual.textContent = t('toneCasual');
    const toneStorytelling = document.getElementById('toneStorytellingLabel');
    if (toneStorytelling) toneStorytelling.textContent = t('toneStorytelling');
    const generateBtnText = document.getElementById('generateBtnText');
    if (generateBtnText) generateBtnText.textContent = t('generateBtn');

    // Loading
    const loadingTitle = document.getElementById('loadingTitle');
    if (loadingTitle) loadingTitle.textContent = t('loadingTitle');

    // Results
    const resultsTitle = document.getElementById('resultsTitle');
    if (resultsTitle) resultsTitle.textContent = t('resultsTitle');
    const newBtnEl = document.getElementById('newConversion');
    if (newBtnEl) newBtnEl.textContent = t('newBtn');

    // Features
    const featuresTitle = document.getElementById('featuresTitle');
    if (featuresTitle) featuresTitle.textContent = t('featuresTitle');
    for (let i = 1; i <= 4; i++) {
        const fTitle = document.getElementById(`feature${i}Title`);
        if (fTitle) fTitle.textContent = t(`feature${i}Title`);
        const fDesc = document.getElementById(`feature${i}Desc`);
        if (fDesc) fDesc.textContent = t(`feature${i}Desc`);
    }

    // Pricing
    const pricingTitle = document.getElementById('pricingTitle');
    if (pricingTitle) pricingTitle.textContent = t('pricingTitle');
    const pricingFreeTitle = document.getElementById('pricingFreeTitle');
    if (pricingFreeTitle) pricingFreeTitle.textContent = t('pricingFreeTitle');
    const pricingFreePrice = document.getElementById('pricingFreePrice');
    if (pricingFreePrice) pricingFreePrice.innerHTML = t('pricingFreePrice') + '<span>' + t('pricingFreePerMonth') + '</span>';
    const pricingFreeFeatures = document.getElementById('pricingFreeFeatures');
    if (pricingFreeFeatures) {
        pricingFreeFeatures.innerHTML = t('pricingFreeFeatures').map(f => `<li>${f}</li>`).join('');
    }
    const pricingFreeBtn = document.getElementById('pricingFreeBtn');
    if (pricingFreeBtn) pricingFreeBtn.textContent = t('pricingFreeBtn');
    const pricingPremiumBadge = document.getElementById('pricingPremiumBadge');
    if (pricingPremiumBadge) pricingPremiumBadge.textContent = t('pricingPremiumBadge');
    const pricingPremiumTitle = document.getElementById('pricingPremiumTitle');
    if (pricingPremiumTitle) pricingPremiumTitle.textContent = t('pricingPremiumTitle');
    const pricingPremiumPrice = document.getElementById('pricingPremiumPrice');
    if (pricingPremiumPrice) pricingPremiumPrice.innerHTML = t('pricingPremiumPrice') + '<span>' + t('pricingPremiumPerMonth') + '</span>';
    const pricingPremiumFeatures = document.getElementById('pricingPremiumFeatures');
    if (pricingPremiumFeatures) {
        pricingPremiumFeatures.innerHTML = t('pricingPremiumFeatures').map(f => `<li>${f}</li>`).join('');
    }
    const pricingPremiumBtn = document.getElementById('pricingPremiumBtn');
    if (pricingPremiumBtn) pricingPremiumBtn.textContent = t('pricingPremiumBtn');

    // Modal
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) modalTitle.textContent = t('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    if (modalDesc) modalDesc.textContent = t('modalDesc');
    const modalMonthlyTitle = document.getElementById('modalMonthlyTitle');
    if (modalMonthlyTitle) modalMonthlyTitle.textContent = t('modalMonthly');
    const modalMonthlyPrice = document.getElementById('modalMonthlyPrice');
    if (modalMonthlyPrice) modalMonthlyPrice.textContent = t('modalMonthlyPrice');
    const modalMonthlyPeriod = document.getElementById('modalMonthlyPeriod');
    if (modalMonthlyPeriod) modalMonthlyPeriod.textContent = t('modalMonthlyPeriod');
    const modalAnnualTitle = document.getElementById('modalAnnualTitle');
    if (modalAnnualTitle) modalAnnualTitle.textContent = t('modalAnnual');
    const modalAnnualPrice = document.getElementById('modalAnnualPrice');
    if (modalAnnualPrice) modalAnnualPrice.textContent = t('modalAnnualPrice');
    const modalAnnualPeriod = document.getElementById('modalAnnualPeriod');
    if (modalAnnualPeriod) modalAnnualPeriod.textContent = t('modalAnnualPeriod');
    const modalAnnualSavings = document.getElementById('modalAnnualSavings');
    if (modalAnnualSavings) modalAnnualSavings.textContent = t('modalAnnualSavings');
    const modalSaveBadge = document.getElementById('modalSaveBadge');
    if (modalSaveBadge) modalSaveBadge.textContent = t('modalSaveBadge');

    // Modal features
    const modalMonthlyFeatures = document.getElementById('modalMonthlyFeatures');
    if (modalMonthlyFeatures) {
        modalMonthlyFeatures.innerHTML = t('modalFeatures').map(f => `<li>${f}</li>`).join('');
    }
    const modalAnnualFeatures = document.getElementById('modalAnnualFeatures');
    if (modalAnnualFeatures) {
        modalAnnualFeatures.innerHTML = t('modalFeatures').map(f => `<li>${f}</li>`).join('');
    }

    // Modal buttons
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.textContent = t('modalUpgradeBtn');
    });
    const modalCancelBtn = document.getElementById('modalCancel');
    if (modalCancelBtn) modalCancelBtn.textContent = t('modalCancel');

    // Footer
    const footerCredit = document.getElementById('footerCredit');
    if (footerCredit) footerCredit.innerHTML = t('footerCredit') + ' <a href="https://twitter.com/seungmin_builds" target="_blank">@seungmin_builds</a>';
    const footerDesc = document.getElementById('footerDesc');
    if (footerDesc) footerDesc.textContent = t('footerDesc');

    // Update usage display
    if (typeof updateUsageDisplay === 'function') {
        updateUsageDisplay();
    }
}
