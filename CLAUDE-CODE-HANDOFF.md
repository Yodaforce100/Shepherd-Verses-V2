# Shepherd Verses — Complete Handoff for Claude Code

**Date:** May 8, 2026  
**Status:** 60% complete (Steps 1-6 live, Step 7 debugging, Steps 8-11 pending)  
**Target Launch:** May 15, 2026 (7 days)

---

## 👋 Welcome, Claude Code

This handoff document contains everything you need to complete Shepherd Verses. The project is 60% built and working. You're being handed a **live, functional product** with clear next steps.

**Your mission:** Build the remaining 40% and prepare for public launch.

---

## 📚 BEFORE YOU START — PLEASE READ

### For Claude Code — Critical Instructions

1. **Do a full codebase audit first**
   - Read through the main files listed below
   - Understand the current architecture
   - Identify any tech debt or issues
   - Ask Gareth questions if unclear

2. **Work VERY slowly**
   - Explain everything like Gareth is a complete beginner
   - Show each code change before implementing
   - One feature at a time, wait for confirmation
   - Test thoroughly after each change

3. **NEVER hardcode real API keys**
   - Always use `process.env.VAR_NAME`
   - Never paste real keys in code
   - Gareth keeps all real keys in local `.env.local` and `.env`
   - Check `.env.example` for what variables are needed

4. **Ask before changing anything major**
   - Architecture decisions: ask first
   - Database schema changes: ask first
   - Third-party service integrations: ask first
   - File structure reorganization: ask first

5. **Document as you go**
   - Add comments explaining your code
   - Update README.md with setup steps
   - Keep CLAUDE-CODE-HANDOFF.md updated with progress

6. **Run tests after each step**
   - Verify functionality locally
   - Check for errors
   - Test on real payments/data
   - Don't move to next step if previous step breaks

---

## 🎯 PROJECT OVERVIEW

**Project Name:** Shepherd Verses

**Vision:** A peaceful, comforting daily app that sends spoken Bible verses and Christian affirmations based on the user's current mood/emotion.

**Brand Essence:**
- Emotional tone: peaceful, comforting, spiritual, hopeful, gentle
- Visual style: clean, elegant, minimal, serene
- Colors: #F2F1EE, #3A4A5A, #4A5B6B, #A9C3D6, #E7DED2, #D88C7A
- Fonts: Lora (headings), Inter (body)

**Business Model:**
- Monthly subscription: $5.95/month (after 3-day free trial)
- Annual subscription: $59.50/year (after 3-day free trial)
- Revenue target: 100 subscribers = $500/month MRR
- Growth via Predis.ai social media automation

**Scripture Library:**
- 16 emotions/moods
- 640 verses total (40 per emotion currently)
- Future expansion: 60+ per emotion
- Each verse: 3-4 sentences (never truncated)

---

## 🏗️ TECH STACK

| Component | Technology | Status | Notes |
|-----------|-----------|--------|-------|
| **Website** | Next.js 15 + Vercel | Live ✅ | App Router, Tailwind, shadcn/ui |
| **Database** | Supabase (PostgreSQL) | Live ✅ | Pro tier, 72-column subscribers table |
| **Payments** | Stripe | Test mode ✅ | Webhooks configured, test payments working |
| **Voice** | ElevenLabs TTS | Live ✅ | $0.30 per 1K characters |
| **Bot** | Telegram + Telegraf.js | 90% built ⏳ | Running locally, needs persistent hosting |
| **AI** | Anthropic Claude Haiku | Live ✅ | ~$0.008 per message |
| **Hosting** | Vercel (website) + Local (bot) | Partial ⏳ | Bot needs Railway/Heroku migration |
| **Auth** | Email + Magic Links | Not built ⏳ | Needed for Step 9 |
| **Future** | Predis.ai, WhatsApp, Xero | Planned | Not in MVP scope |

---

## ✅ WHAT'S BUILT (60%)

### Steps 1-6: Onboarding Flow (100% COMPLETE)

**Step 1: Landing Page** ✅
- Hero section, plans, how-it-works, FAQ
- File: `/app/page.tsx` + `/components/*.tsx`

**Step 2: Plan Selection** ✅
- Monthly/Annual toggle
- File: `/components/plans.tsx`

**Step 3: Signup Form** ✅
- Email, country, timezone fields
- Geolocation auto-detect
- localStorage saves email before Stripe redirect
- File: `/components/signup-form.tsx`

**Step 4: Stripe Checkout** ✅
- Creates session, passes metadata
- File: `/app/api/create-checkout/route.ts`

**Step 5: Webhook + Database** ✅
- Listens for `checkout.session.completed`
- Creates subscriber in Supabase
- File: `/app/api/webhook/route.ts`

**Step 6: Welcome Screen** ✅
- Post-payment confirmation page
- Encodes email in Telegram link (base64)
- Two CTAs: Bot or Email
- File: `/app/welcome/page.tsx`

### Step 7: Telegram Bot Integration (90% BUILT)
- `/start` command handler ✅
- Email decoding ✅
- Supabase query by email ✅
- Timezone selection keyboard ✅
- Emotion grid (16 emotions) ✅
- Message + voice generation ✅
- ❌ **BLOCKER:** `telegram_user_id` UPDATE not working (RLS issue)

### Scripture Library (100% COMPLETE)
- 640 verses (40 per emotion × 16 emotions)
- Each verse: reference + text + affirmation + mantra
- File: `/shepherd-verses-bot/verse-library-expanded.js`
- Also in Supabase `verses` table (not currently used)

### Database Schema (100% COMPLETE)
- 72-column `subscribers` table
- `verses` table with all 640 verses
- `message_history` for tracking sent messages
- File: `/shepherd-verses-bot/database-schema.sql`

---

## ⏳ WHAT NEEDS TO BE BUILT (40%)

### CRITICAL BLOCKERS (Must fix first)

**Issue 1: Step 7 Email Linking Broken**
- **Problem:** Bot can't UPDATE `telegram_user_id` due to Supabase RLS
- **Solution:** Add SERVICE_ROLE_KEY to bot `.env`
- **Fix time:** 30 minutes
- **Files:** `/shepherd-verses-bot/bot.js`, `/shepherd-verses-bot/.env`
- **Blocker until:** May 8 (TODAY)

**Issue 2: Bot Not Persistent**
- **Problem:** Runs locally, dies on restart
- **Solution:** Deploy to Railway.app or use PM2
- **Fix time:** 1-2 hours (Railway) or 15 min (PM2)
- **Blocker until:** May 10

**Issue 3: Daily Messages Not Sending**
- **Problem:** Step 8 scheduler not built
- **Solution:** Build `/api/schedule-messages` endpoint
- **Fix time:** 2-3 hours
- **Blocker until:** May 10

### HIGH PRIORITY (Blocks MVP)

**Step 8: Daily Message Scheduler** (2-3 hours)
- Query subscribers by timezone + time
- Send personalized messages
- Files to create: `/app/api/schedule-messages/route.ts`

**Step 9: Account Dashboard** (3-4 hours)
- User login with magic links
- View subscription status
- Change timezone/preferred time
- Files to create: `/app/account/page.tsx`, `/app/auth/magic-link/route.ts`

**Step 10: Payment Updates** (1 hour)
- "Update Payment Method" button
- Stripe Customer Portal integration
- Files to create: `/app/api/create-portal-session/route.ts`

**Step 11: Cancel Subscription** (1.5 hours)
- "Cancel Subscription" button with confirmation
- Stripe API integration
- Files to create: `/app/api/cancel-subscription/route.ts`

### INFRASTRUCTURE (High Priority)

**Deploy Bot to Persistent Hosting** (1-2 hours)
- Move from local Node.js to Railway.app (recommended)
- Or use PM2 for local persistence
- Create `Dockerfile` for containerization

**Add Error Logging** (45 min)
- Sentry integration for error tracking
- Better Uptime monitoring for availability

---

## 📁 CODEBASE STRUCTURE

```
workspace/
├── docs/                           # NEW DOCUMENTATION
│   ├── PROJECT_OVERVIEW.md        # Vision, timeline, metrics
│   ├── BRAND_GUIDE.md             # Brand identity, voice, tone
│   ├── CURRENT_FEATURES.md        # What's built, status matrix
│   ├── MVP_ROADMAP.md             # Phase-by-phase timeline
│   └── KNOWN_ISSUES.md            # Blockers, bugs, workarounds
│
├── shepherd-verses-bot/
│   ├── bot.js                     # Main bot (660 lines) ⚠️ RLS BUG HERE
│   ├── .env                       # ⚠️ NEEDS SERVICE_ROLE_KEY ADDED
│   ├── verse-library-expanded.js  # 640 verses (hardcoded)
│   ├── generate-personalized-message.js
│   ├── generate-voice.js
│   ├── package.json
│   └── database-schema.sql
│
├── GitHub/Shepherd-Verses-V2/
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── welcome/page.tsx       # Post-payment (NEW)
│   │   ├── success/page.tsx       # Redirect handler
│   │   ├── account/               # Account dashboard (TO BUILD)
│   │   ├── auth/                  # Magic link auth (TO BUILD)
│   │   ├── api/
│   │   │   ├── create-checkout/route.ts
│   │   │   ├── webhook/route.ts
│   │   │   ├── send-telegram-link/route.ts
│   │   │   ├── get-session-data/route.ts
│   │   │   ├── schedule-messages/route.ts (TO BUILD)
│   │   │   ├── create-portal-session/route.ts (TO BUILD)
│   │   │   └── cancel-subscription/route.ts (TO BUILD)
│   │   ├── components/
│   │   │   ├── signup-form.tsx
│   │   │   ├── signup-modal.tsx
│   │   │   ├── plans.tsx
│   │   │   ├── hero.tsx
│   │   │   └── ... other sections
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── lib/
│   │   └── stripe.ts
│   ├── .env.local                 # Real keys (NOT in GitHub)
│   ├── .env.example               # Placeholders only
│   ├── .gitignore                 # Excludes .env*
│   ├── tailwind.config.js
│   └── package.json
│
├── memory/                         # Daily session notes
│   ├── 2026-05-03.md
│   ├── 2026-05-06.md
│   └── ...
│
├── MEMORY.md                       # Operating principles
├── IDENTITY.md                     # Business details
├── HEARTBEAT.md                    # Daily checklist
├── CLAUDE-CODE-HANDOFF.md         # THIS FILE
└── .env.example                    # Environment template (NEW)
```

---

## 🔑 ENVIRONMENT VARIABLES

### Website (.env.local in Shepherd-Verses-V2)
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Bot (.env in shepherd-verses-bot)
```
TELEGRAM_BOT_TOKEN=...
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... ← ADD THIS (blocking issue #1)
ELEVENLABS_API_KEY=...
ANTHROPIC_API_KEY=sk-ant...
WEBSITE_URL=https://shepherdverses.com
GARETH_TELEGRAM_ID=8758884128
```

See `.env.example` for all variables.

**🔐 CRITICAL:** Never commit real `.env` files. Use `.env.local` locally, set secrets in Vercel/Railway dashboard.

---

## 🚀 QUICK START FOR CLAUDE CODE

### Day 1: Audit & Planning
1. Read this file completely
2. Read `/docs/PROJECT_OVERVIEW.md` for context
3. Read `/docs/CURRENT_FEATURES.md` to understand what's built
4. Read `/docs/KNOWN_ISSUES.md` to see blockers
5. Ask Gareth any clarifying questions

### Day 2: Fix Critical Issues
1. **Fix Issue #1:** Add SERVICE_ROLE_KEY to bot (30 min)
2. **Fix Issue #2:** Deploy bot to Railway or PM2 (1-2 hours)
3. **Fix Issue #3:** Build daily message scheduler (2-3 hours)

### Days 3-4: Build MVP Features
1. Build Step 8 (daily scheduler) if not done
2. Build Step 9 (account dashboard)
3. Build Steps 10-11 (payment management)

### Days 5-6: Testing & Infrastructure
1. End-to-end testing
2. Add error logging (Sentry)
3. Add uptime monitoring (Better Uptime)
4. Test on real payments

### Day 7: Launch
1. Final QA
2. Soft launch to beta testers
3. Monitor for issues
4. Fix any bugs found

---

## 📊 DELIVERABLES CHECKLIST

**For Step 7 (Fix Email Linking):**
- [ ] SERVICE_ROLE_KEY added to `.env`
- [ ] Bot restarted with new key
- [ ] Test payment made
- [ ] Telegram link clicked
- [ ] `telegram_user_id` populated in Supabase
- [ ] Timezone selection working

**For Step 8 (Daily Scheduler):**
- [ ] `/api/schedule-messages` endpoint created
- [ ] Cron job configured
- [ ] Test message sent successfully
- [ ] Message contains verse + affirmation + mantra
- [ ] Voice generation working
- [ ] Database logging working

**For Step 9 (Account Dashboard):**
- [ ] Magic link email authentication working
- [ ] Account page accessible after login
- [ ] Can view subscription status
- [ ] Can change timezone
- [ ] Can change preferred time
- [ ] Preferences saved to Supabase

**For Steps 10-11 (Payment Management):**
- [ ] "Update Payment" button working
- [ ] Stripe Customer Portal redirecting correctly
- [ ] "Cancel Subscription" button working
- [ ] Cancellation confirmation modal showing
- [ ] Subscription marked as canceled in Supabase
- [ ] User can still access until period end

**For Infrastructure:**
- [ ] Bot deployed to Railway/Heroku/PM2
- [ ] Bot runs 24/7 (test restart)
- [ ] Sentry error logging configured
- [ ] Better Uptime monitoring configured
- [ ] Logs visible in Sentry/Better Uptime

**For Testing:**
- [ ] 100% manual test checklist passed
- [ ] 0 critical bugs
- [ ] All edge cases handled
- [ ] Performance acceptable

**For Launch:**
- [ ] GitHub main branch clean
- [ ] Documentation updated
- [ ] All secrets in dashboards (not code)
- [ ] Soft launch to 5+ beta testers
- [ ] Beta feedback collected

---

## 🎯 SUCCESS CRITERIA FOR LAUNCH

MVP is ready to launch when:

1. ✅ All 11 steps functional (Steps 1-11)
2. ✅ No critical bugs in production
3. ✅ Bot persistent (24/7)
4. ✅ Daily messages sending on time
5. ✅ Users can manage accounts (change timezone, cancel, etc.)
6. ✅ Error monitoring active (Sentry)
7. ✅ Uptime monitoring active (Better Uptime)
8. ✅ 5+ beta testers satisfied
9. ✅ Database clean and optimized
10. ✅ All secrets properly managed

---

## 📈 TIMELINE (May 8-15, 2026)

| Date | Phase | Tasks | Status |
|------|-------|-------|--------|
| May 8 | Audit | Read docs, ask questions | TO DO |
| May 8-9 | Fix Blockers | Issue #1 (email linking), Issue #2 (bot hosting) | TO DO |
| May 9-11 | Build Step 8 | Daily message scheduler | TO DO |
| May 11-13 | Build Steps 9-11 | Account mgmt, payment flows | TO DO |
| May 13-14 | Infrastructure | Error logging, monitoring | TO DO |
| May 14 | Testing | QA checklist 100% | TO DO |
| May 15 | Launch | Soft launch to beta | TO DO |

**Total coding time:** ~18-20 hours  
**Total time including testing:** ~25-30 hours (3-4 days of focused work)

---

## 🆘 DEBUGGING & SUPPORT

If you get stuck:

1. **Check the docs first**
   - `/docs/KNOWN_ISSUES.md` has solutions
   - `/docs/MVP_ROADMAP.md` has detailed steps

2. **Check the code**
   - Comments explain the logic
   - Look at existing patterns
   - Follow the same style

3. **Ask Gareth**
   - Describe what you tried
   - Show the error message
   - Ask for clarification

4. **Check logs**
   - Vercel Function Logs (website API)
   - Telegram API responses
   - Supabase query logs
   - Bot console output

---

## 💡 TIPS FOR SUCCESS

1. **Test frequently.** Don't build 5 features before testing.
2. **Ask questions.** Better to clarify than build wrong thing.
3. **Keep it simple.** No over-engineering. MVP first.
4. **Document changes.** Future you will thank you.
5. **Commit often.** Small, logical commits are easier to debug.
6. **Don't rush.** Quality > speed.
7. **Celebrate wins.** Each feature is progress toward launch.

---

## 📞 CONTACTS & RESOURCES

**Gareth:** @8758884128 on Telegram (primary contact)

**Dashboards:**
- Vercel: https://vercel.com/lesajackson23-7830s-projects/v0-shepherd-verses-v2
- Supabase: https://supabase.com/dashboard/project/rvaafpzgooyxfsqjsamc
- Stripe: https://dashboard.stripe.com (test mode)
- GitHub: https://github.com/Yodaforce100/Shepherd-Verses-V2

**Bot:** @ShepherdVersesBot on Telegram

**Website:** https://shepherdverses.com (live)

---

## 🎓 LEARNING RESOURCES

**For Next.js:**
- Next.js Docs: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app

**For Supabase:**
- Supabase Docs: https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript

**For Stripe:**
- Stripe Docs: https://stripe.com/docs
- Webhook Events: https://stripe.com/docs/api/events/types

**For Telegram:**
- Telegraf Docs: https://telegraf.js.org
- Telegram API: https://core.telegram.org/bots/api

---

## ✨ FINAL WORDS

This project is **real and working.** You're not building from scratch. You're completing a functional product that's already 60% done.

**What you're doing matters:**
- Real people will use this to find peace through scripture
- Every line of code brings the launch closer
- Quality work builds trust with users

**Go slow, ask questions, test thoroughly.**

You've got this. 🚀

---

**Last updated:** May 8, 2026, 10:30 AM  
**By:** Felix  
**For:** Claude Code  
**Status:** Ready for handoff
