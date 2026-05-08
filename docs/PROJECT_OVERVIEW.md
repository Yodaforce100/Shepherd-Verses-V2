# Shepherd Verses — Project Overview

## 🎯 Mission

Create a peaceful, comforting daily app that sends spoken Bible verses and Christian affirmations based on the user's current mood/emotion. Help people find spiritual peace, hope, and guidance through personalized scripture delivery.

## 📊 Business Model

**Product:** Daily personalized scripture voice messages + affirmations

**Pricing:**
- Monthly Companion: $5.95/month (after 3-day free trial)
- Annual Companion: $59.50/year (after 3-day free trial)

**Revenue Target:** 100 subscribers @ $5/month = $500/month MRR

**Customer Acquisition:** 
- Predis.ai (automated social media: TikTok, Instagram, Facebook, YouTube)
- Organic traffic from website
- Future: Ad revenue from social channels

## 🕯️ Brand Identity

### Emotional Tone
- Peaceful
- Comforting
- Spiritual
- Hopeful
- Gentle
- Trustworthy
- Warm

### Visual Style
- Clean and elegant
- Minimal, uncluttered
- Serene atmosphere
- Calming visual hierarchy

### Color Palette
```
Primary Background:     #F2F1EE (warm cream)
Primary Text:           #3A4A5A (dark blue-grey)
Secondary Text:         #4A5B6B (medium blue-grey)
Accent Light:           #A9C3D6 (soft blue)
Accent Warm:            #E7DED2 (soft taupe)
Accent Warm Dark:       #D88C7A (warm terracotta)
```

### Typography
- **Headings:** Lora (serif, spiritual, elegant)
- **Body Text:** Inter (sans-serif, clean, readable)

## 📱 Core Features

### User Journey (11 Steps)

**Steps 1-6: Onboarding (100% COMPLETE)**
1. Landing page → Browse plans
2. Select subscription tier
3. Signup form (email, country, timezone)
4. Stripe checkout
5. Payment confirmed → Webhook creates subscriber
6. Welcome screen + Telegram connection instructions

**Steps 7-8: Daily Messages (90% IN PROGRESS)**
7. Telegram bot receives email confirmation → Links account → Collects timezone + preferred time
8. Daily message scheduler → Sends personalized scripture + affirmation + mantra at preferred time

**Steps 9-11: Account Management (NOT STARTED)**
9. Account dashboard (view subscription, update timezone, view trial date)
10. Update payment method (via Stripe Customer Portal)
11. Cancel subscription (with Stripe)

### Scripture Library

**16 Emotions/Moods:**
- Anxiety, Stress, Sadness, Fear, Guilt, Anger, Disgust
- Loneliness, Joy, Gratitude, Love, Pride, Contentment
- Excitement, Frustration, Jealousy

**Current Library:**
- 640 verses total (40 per emotion)
- Each verse: 3-4 sentences (never truncated)
- Each emotion has: Scripture reference + scripture text + affirmation + mantra

**Future Expansion:**
- Plan to expand to 60+ verses per emotion
- Add variant affirmations (currently generated dynamically)
- Pre-cache affirmations in database (reduce API costs)

## 🚀 Launch Timeline

| Phase | Status | Target Date |
|-------|--------|-------------|
| MVP Build | 95% Complete | May 8-10, 2026 |
| Step 7 (Bot Linking) | In Progress | May 8-9, 2026 |
| Steps 8-11 Build | Not Started | May 8-12, 2026 |
| Beta Testing | Not Started | May 12-15, 2026 |
| Public Launch | Not Started | May 15+, 2026 |

## 💰 Financial Targets

| Metric | Target | Timeline |
|--------|--------|----------|
| MRR | $500 | Month 1 |
| Subscribers | 100 | Month 1 |
| Monthly Churn | <5% | Ongoing |
| CAC | <$5 | Via organic/social |
| LTV | $60+ | (12 months retention) |

## 🛠️ Tech Stack at a Glance

| Component | Technology | Status |
|-----------|-----------|--------|
| Website | Next.js 15 + Vercel | Live ✅ |
| Database | Supabase (PostgreSQL) | Live ✅ |
| Payments | Stripe | Live (test mode) ✅ |
| Voice | ElevenLabs TTS | Live ✅ |
| Bot | Telegram + Telegraf.js | 90% built |
| Auth | Email + Magic Links | Not built |
| Social | Predis.ai (future) | Planned |
| Accounting | Xero (future) | Planned |

## 📊 Current Metrics (May 8, 2026)

- Live website visitors: N/A (soft launch only)
- Test subscribers: 11
- Real subscribers: 0
- Verses in library: 640
- Bot coverage: 16 emotions
- Code completion: ~60%

## 🎯 Success Criteria for MVP

- ✅ Website live and accepting payments
- ✅ Webhook integration tested (subscriber data flowing to Supabase)
- ✅ Telegram bot connects users to account
- ⏳ Daily messages sending at preferred time
- ⏳ Account dashboard functional
- ⏳ Zero critical bugs in production

## 🔐 Security & Compliance

- All real API keys stored locally in `.env.local` only
- No hardcoded secrets in code
- Stripe test mode for development
- Supabase RLS policies (in progress)
- Email-based auth (magic links, no passwords)
- GDPR-ready (privacy policy pending)

## 📝 Next Steps (For Claude Code)

1. **Complete Step 7:** Fix Telegram email linking (RLS issue)
2. **Build Step 8:** Daily message scheduler
3. **Build Steps 9-11:** Account management flows
4. **Infrastructure:** Move bot to persistent hosting
5. **Testing:** End-to-end tests, load testing
6. **Launch:** Soft launch to beta testers, then public

See CLAUDE-CODE-HANDOFF.md for detailed technical tasks.
