# 🎙️ VoiceToContent

Transform your voice memos into perfect social media posts in 30 seconds. Built for busy creators.

## ✨ Features

- 🎤 **Voice Recording**: Record directly in browser (max 3 min free / 10 min premium)
- 📁 **File Upload**: Upload audio files (max 10MB free / 25MB premium)
- 🤖 **AI-Powered**: Uses OpenAI Whisper + Claude for transcription & content generation
- 🌍 **Multi-Language**: English, Korean, Spanish, Japanese support
- 🎯 **Platform-Optimized**: Generate posts for X/Twitter, LinkedIn, Instagram
- 🎨 **Tone Options**: Professional, Casual, Storytelling
- 🍪 **Cookie-Based Limits**: Free tier = 3 conversions/day (tracked via cookies)

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Vercel Serverless Functions
- **AI APIs**: OpenAI Whisper (transcription) + Anthropic Claude (content generation)
- **Deployment**: Vercel

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/seungmin0501/voicetocontent.git
cd voicetocontent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key
```

Get your API keys:
- Anthropic: https://console.anthropic.com/
- OpenAI: https://platform.openai.com/api-keys

### 4. Run Locally

```bash
npm run dev
```

Visit: http://localhost:3000

## 🌐 Deploy to Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy

```bash
vercel
```

### 3. Add Environment Variables

```bash
vercel env add ANTHROPIC_API_KEY
vercel env add OPENAI_API_KEY
```

### 4. Deploy to Production

```bash
vercel --prod
```

## 💰 Pricing

### Free Tier
- ✅ 3 conversions per day
- ✅ Max 3 minutes recording
- ✅ Max 10MB file upload
- ✅ All platforms (X, LinkedIn, Instagram)
- ✅ Basic tones

### Premium ($9.99/month)
- ✅ Unlimited conversions
- ✅ Max 10 minutes recording
- ✅ Max 25MB file upload
- ✅ All platforms
- ✅ All tones & styles
- ✅ Multi-language support
- ✅ Priority support

## 📁 Project Structure

```
voicetocontent/
├── index.html          # Main HTML
├── styles.css          # Styling
├── script.js           # Frontend logic
├── api/
│   └── convert.js      # Serverless API (Whisper + Claude)
├── vercel.json         # Vercel configuration
├── package.json        # Dependencies
└── README.md           # Documentation
```

## 🔧 How It Works

1. **User records or uploads audio** → Frontend captures audio as Blob
2. **Audio sent to API** → `/api/convert` receives audio file
3. **Whisper transcribes** → OpenAI Whisper API converts speech to text
4. **Language detection** → Detects Korean/English/Spanish/Japanese
5. **Claude generates posts** → Anthropic Claude creates platform-optimized content
6. **Results displayed** → User can copy posts for each platform

## 🎯 Usage Tracking

- Uses **localStorage + cookies** to track free tier usage (3/day)
- Cookie consent banner (GDPR-friendly)
- Usage resets daily at midnight (local time)
- Premium users bypass all limits (TODO: Lemon Squeezy integration)

## 🛣️ Roadmap

- [ ] Lemon Squeezy payment integration
- [ ] Multi-language UI (currently English only)
- [ ] Audio file format validation
- [ ] Post editing before copying
- [ ] Schedule posts directly to platforms
- [ ] Analytics dashboard

## 🐛 Known Issues

- WebM audio format may not work on Safari (need MP3 conversion)
- Large files (>20MB) may timeout on Vercel (15s limit)

## 📄 License

MIT License - Feel free to use for personal/commercial projects

## 👨‍💻 Author

Built with ❤️ by [@seungmin_builds](https://twitter.com/seungmin_builds)

Part of the **#BuildInPublic** journey | Product #2 of 10 in 2026

## 🔗 Links

- Live Demo: [voicetocontent.vercel.app](https://voicetocontent.vercel.app)
- Twitter: [@seungmin_builds](https://twitter.com/seungmin_builds)
- Related Product: [ContentSplitter](https://content-splitter.vercel.app)

---

⭐ If you find this useful, please star the repo!