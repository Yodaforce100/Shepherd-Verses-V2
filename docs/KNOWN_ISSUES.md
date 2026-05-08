# Shepherd Verses — Known Issues & Blockers

## 🔴 CRITICAL BLOCKERS (Must Fix Before Launch)

### 1. Step 7: Telegram Email Linking Not Working
**Status:** Code ready, Supabase RLS blocking  
**Severity:** CRITICAL (blocks Step 8 entirely)  
**Impact:** New users can't link Telegram accounts → can't receive daily messages

**Symptoms:**
- User clicks "Open Telegram Bot →" on welcome page
- Bot receives email correctly (base64 encoded in URL)
- Bot queries Supabase for subscriber by email ✅
- Bot tries to UPDATE `telegram_user_id` ❌
- Supabase returns success (false positive)
- But `telegram_user_id` remains NULL in database

**Root Cause:**
- Supabase Row Level Security (RLS) policy blocks UPDATE via anon key
- Bot uses `SUPABASE_ANON_KEY` (limited permissions)
- Bot needs `SUPABASE_SERVICE_ROLE_KEY` (full permissions, bypass RLS)

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy `service_role` secret (NOT the anon key)
3. Add to `.env` in bot directory: `SUPABASE_SERVICE_ROLE_KEY=<key>`
4. Modify bot code to use SERVICE_ROLE_KEY for updates:
   ```javascript
   const supabase = createClient(
     process.env.SUPABASE_URL,
     process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
   )
   ```
5. Restart bot
6. Test with real email + Telegram account

**Estimated Fix Time:** 30 minutes  
**Blocker Until:** May 8, 2026

**Files Affected:**
- `/shepherd-verses-bot/bot.js` (line 13)
- `/shepherd-verses-bot/.env` (add SERVICE_ROLE_KEY)

**Test Verification:**
```bash
# After fix, make test payment with email: test-fix@example.com
# Click Telegram link
# Check Supabase: SELECT telegram_user_id FROM subscribers WHERE email='test-fix@example.com'
# Should see a number (Telegram user ID), not NULL
```

---

### 2. Bot Not Persistent (Dies on Restart)
**Status:** Running locally only  
**Severity:** CRITICAL (blocks production)  
**Impact:** Bot goes offline if Mac mini restarts → missed messages

**Symptoms:**
- Bot runs fine locally (`node bot.js`)
- Works until terminal closes or Mac restarts
- After restart, bot is offline
- No alerts that it's down
- Users miss daily messages

**Root Cause:**
- Bot is a Node.js process running in terminal on Mac mini
- No process manager (PM2) or persistent hosting
- Requires human intervention to restart

**Solution Options:**

**Option A: Use PM2 (Local, Recommended for 6-12 months)**
1. Install PM2: `npm install -g pm2`
2. Start bot: `pm2 start bot.js --name "shepherd-bot"`
3. Set to auto-start on reboot: `pm2 startup` + `pm2 save`
4. Bot automatically restarts if it crashes or Mac restarts
5. Monitor with: `pm2 logs shepherd-bot`

**Option B: Move to Railway.app (Recommended for long-term)**
1. Create Railway account (free tier available)
2. Connect GitHub repo
3. Set environment variables
4. Railway auto-deploys and runs 24/7
5. Cost: $0-5/month depending on usage
6. Monitoring built-in

**Option C: Move to Heroku**
1. Create Heroku app
2. Add Procfile: `worker: node bot.js`
3. Deploy
4. Cost: $0 (free tier) or $7+ (paid tier)

**Option D: AWS Lambda + Polling**
1. Most complex but most scalable
2. Estimated 4-6 hours to implement
3. Cost: Free tier covers usage

**Recommended:** Option B (Railway) for long-term viability

**Estimated Fix Time:** 
- Option A (PM2): 15 minutes
- Option B (Railway): 1-2 hours
- Option C (Heroku): 1-2 hours

**Blocker Until:** May 10, 2026

**Files Needed:**
- `Dockerfile` (for Railway/Heroku)
- `.railway.json` or `Procfile` (deployment config)

---

### 3. Affirmations Generated Live (Costly)
**Status:** Works, but expensive  
**Severity:** HIGH (burns budget)  
**Impact:** Every user message costs $0.10-0.30 in Claude API calls

**Symptoms:**
- Each daily message generation calls Claude Haiku API
- Generates custom affirmation text
- 100 subscribers × 2 messages/day = 200 API calls/day
- Daily cost: $0.02-0.06 (seems small)
- Monthly cost: $0.60-1.80 (actually reasonable, but unnecessary)

**Root Cause:**
- Affirmations are generated dynamically via `generatePersonalizedMessage()`
- Should be pre-generated once and stored in database
- Currently 640 verses exist (hardcoded + Supabase)
- But only 1 affirmation per verse (generated live)

**Solution:**
1. **Phase 1 (Temporary):** Use hardcoded affirmations instead of generating
   - Edit `generate-personalized-message.js`
   - Replace dynamic generation with pre-written affirmations
   - Cost reduction: 100% (saves all Claude API calls)
   - Time: 1-2 hours

2. **Phase 2 (Permanent):** Pre-generate 10 affirmations per emotion
   - Use Claude once to generate 160 affirmations (16 emotions × 10)
   - Cost: ~$0.50 (one-time)
   - Store in Supabase `affirmations` table
   - Bot pulls from database instead of API
   - Cost reduction: 100% ongoing
   - Time: 2-3 hours

**Estimated Fix Time:** 1-2 hours (Phase 1) + 2-3 hours (Phase 2)

**Blocker Until:** May 10, 2026 (for launch, can be post-MVP)

**Files Affected:**
- `/shepherd-verses-bot/generate-personalized-message.js`
- `/shepherd-verses-bot/bot.js` (verse pulling logic)
- Database schema (new `affirmations` table)

---

## 🟡 HIGH PRIORITY (Blocks MVP, Should Fix Before Launch)

### 4. Account Dashboard Not Built
**Status:** Not started  
**Severity:** HIGH (users can't self-serve)  
**Impact:** Users can't change timezone, update payment, or cancel after signup

**What's Missing:**
- `/app/account/page.tsx` (dashboard page)
- `/app/auth/magic-link/route.ts` (email login)
- `/components/account-dashboard.tsx` (UI)
- Email authentication system
- Session management

**Why It Matters:**
- User changes plans → needs to update timezone
- User wants different time → can't change without support
- User wants to cancel → stuck (must email support)
- Creates support burden on Gareth

**Solution:** Build Step 9 (Account Dashboard)
- Estimated time: 3-4 hours
- Priority: HIGH
- Deadline: May 12, 2026

**Test Verification:**
```
1. Sign up with email: test-account@example.com
2. Go to /login → enter email
3. Check email inbox (or Supabase) for magic link
4. Click link → logged in
5. Should see account dashboard
6. Should be able to update timezone
7. Should see "Cancel Subscription" button
```

---

### 5. Daily Message Scheduler Not Built
**Status:** Not started  
**Severity:** HIGH (core feature missing)  
**Impact:** Without this, the whole product is non-functional

**What's Missing:**
- `/app/api/schedule-messages/route.ts` (endpoint)
- Cron job configuration (OpenClaw, EasyCron, or Vercel Crons)
- Message delivery logic
- Voice generation (exists, but not wired in)

**Why It Matters:**
- Users sign up → bot connects → never receive message
- The entire value proposition is daily messages
- Without it, product is incomplete

**Solution:** Build Step 8 (Daily Message Scheduler)
- Estimated time: 2-3 hours
- Priority: CRITICAL
- Deadline: May 10, 2026

**Test Verification:**
```
1. Create test subscriber in Supabase with:
   - timezone: AEST (Sydney)
   - preferred_time: 06:00 (6 AM)
   - email: test-scheduler@example.com
   - telegram_user_id: [YOUR_TELEGRAM_ID]
2. Set Supabase clock to 6:00 AM
3. Manually trigger endpoint: curl -X POST https://shepherdverses.com/api/schedule-messages
4. Should receive message in Telegram within 30 seconds
5. Check message_history table for record
```

---

## 🟠 MEDIUM PRIORITY (Should Fix, But Can Be Post-MVP)

### 6. No Error Logging/Monitoring
**Status:** Not configured  
**Severity:** MEDIUM (hard to debug issues)  
**Impact:** Can't see errors in production → users suffer silently

**What's Missing:**
- Sentry integration (error logging)
- Better Uptime monitoring (uptime checks)
- Log aggregation

**Why It Matters:**
- If bot crashes, nobody knows
- If webhook fails, subscriber not created
- If message fails to send, user never gets message
- Hard to debug without logs

**Solution:** Add error monitoring
1. Set up Sentry (free tier)
   - Estimated time: 30 min
   - Cost: Free
2. Set up Better Uptime (free tier)
   - Estimated time: 15 min
   - Cost: Free

**Deadline:** May 13, 2026

---

### 7. No Payment Method Update Flow
**Status:** Partially built (Stripe API ready)  
**Severity:** MEDIUM (users can't update cards)  
**Impact:** Card expires → renewal fails → lost subscriber

**What's Missing:**
- `/app/api/create-portal-session/route.ts` (Stripe Customer Portal)
- "Update Payment" button on account page
- Error handling for expired cards

**Why It Matters:**
- Card expires after 4 years
- Decline rate ~2% per year
- Without update flow, lose 2% subscribers unnecessarily

**Solution:** Wire up Stripe Customer Portal
- Estimated time: 1 hour
- Priority: MEDIUM
- Deadline: May 13, 2026

---

### 8. No Subscription Cancellation Flow
**Status:** Not built  
**Severity:** MEDIUM (users stuck)  
**Impact:** Can't cancel → support emails → negative experience

**What's Missing:**
- `/app/api/cancel-subscription/route.ts` (Stripe cancel API)
- "Cancel Subscription" button on account page
- Confirmation modal

**Why It Matters:**
- Users want out → can't do it themselves
- Forced to email support
- Negative impression
- Actually violates some payment processor requirements

**Solution:** Build subscription cancellation
- Estimated time: 1.5 hours
- Priority: MEDIUM
- Deadline: May 13, 2026

---

### 9. Verses Stored in Two Places (Local + Supabase)
**Status:** Redundant  
**Severity:** LOW (works, but inefficient)  
**Impact:** Hard to update verses, no single source of truth

**Symptoms:**
- 640 verses in `/shepherd-verses-bot/verse-library-expanded.js` (hardcoded)
- 640 verses also loaded in Supabase `verses` table (not used)
- Bot pulls from local JS file only
- To add new verses, must update JS file → restart bot → redeploy

**Why It Matters:**
- Can't update content without code change
- Not scalable if expanding library
- Wasteful (data duplicated)
- One source might get out of sync

**Solution:** Move to single source of truth
1. Delete local verse library
2. Bot pulls all verses from Supabase
3. Can update verses anytime without redeploy
4. Estimated time: 2-3 hours
5. Priority: LOW
6. Deadline: Post-MVP (May 20+)

**Impact:** Low urgency, but improves ops long-term

---

### 10. No Admin Panel
**Status:** Not built  
**Severity:** LOW (not needed for MVP)  
**Impact:** Can't view/manage subscribers without database access

**What's Missing:**
- Admin dashboard (view all subscribers)
- Ability to send announcements
- Subscriber management (pause, reactivate, export)
- Analytics (signups, retention, churn)

**Why It Matters:**
- Currently must use Supabase UI to manage users
- Hard to send broadcast messages
- Can't see health metrics at a glance

**Solution:** Build admin panel (post-MVP)
- Estimated time: 4-6 hours
- Priority: LOW
- Deadline: May 25+

---

## 🔵 LOW PRIORITY (Nice to Have, Post-MVP)

### 11. No Analytics
**Status:** Not configured  
**Severity:** LOW  
**Impact:** Can't track growth, retention, churn

**What's Missing:**
- Signup tracking
- Retention metrics
- Churn analysis
- Revenue dashboard
- User engagement metrics

**Solution:** Add analytics (post-MVP)
- Use Mixpanel or Amplitude
- Estimated time: 2 hours
- Cost: $0 (free tier)
- Deadline: June 2026

---

### 12. No Mobile App
**Status:** Not planned yet  
**Severity:** LOW  
**Impact:** Users access via web only (works, but not optimal)

**Future Consideration:**
- React Native app for iOS/Android
- Web app works fine for now
- Mobile app could increase engagement
- Estimated time to build: 40-60 hours
- Deadline: Q3 2026 (after MVP success)

---

### 13. No Social Sharing
**Status:** Not built  
**Severity:** LOW  
**Impact:** Users can't share verses with friends

**Future Feature:**
- Share button on daily message
- Generates shareable image
- Posts to social media
- Drives organic growth
- Estimated time: 3-4 hours
- Deadline: Q3 2026

---

## 📋 Issue Summary Table

| # | Issue | Severity | Status | Fix Time | Deadline | Blocker |
|---|-------|----------|--------|----------|----------|---------|
| 1 | Telegram email linking | 🔴 CRITICAL | In Progress | 30 min | May 8 | YES |
| 2 | Bot not persistent | 🔴 CRITICAL | Not Started | 15 min - 2 hrs | May 10 | YES |
| 3 | Affirmations costly | 🔴 CRITICAL | Works | 1-2 hrs | May 10 | OPTIONAL |
| 4 | Account dashboard | 🟡 HIGH | Not Started | 3-4 hrs | May 12 | YES |
| 5 | Daily scheduler | 🟡 HIGH | Not Started | 2-3 hrs | May 10 | YES |
| 6 | No monitoring | 🟠 MEDIUM | Not Started | 45 min | May 13 | NO |
| 7 | No payment updates | 🟠 MEDIUM | Not Started | 1 hr | May 13 | NO |
| 8 | No cancellation | 🟠 MEDIUM | Not Started | 1.5 hrs | May 13 | NO |
| 9 | Verses duplicated | 🟠 MEDIUM | Existing | 2-3 hrs | Post-MVP | NO |
| 10 | No admin panel | 🔵 LOW | Not Started | 4-6 hrs | Post-MVP | NO |
| 11 | No analytics | 🔵 LOW | Not Started | 2 hrs | Post-MVP | NO |
| 12 | No mobile app | 🔵 LOW | Not Started | 40-60 hrs | Q3 2026 | NO |
| 13 | No social sharing | 🔵 LOW | Not Started | 3-4 hrs | Q3 2026 | NO |

---

## ✅ Workarounds (While Waiting for Fixes)

### Telegram Linking (Until Fix Deployed)
- Don't test with new subscribers yet
- Wait until SERVICE_ROLE_KEY is added
- Then test thoroughly

### Daily Messages (Until Step 8 Built)
- Can send messages manually via Telegram
- Use this for beta testing to show value
- Scheduler will automate once built

### Account Updates (Until Dashboard Built)
- Users email Gareth for changes
- Gareth makes changes in Supabase directly
- Not scalable, but works for beta

---

## 🚀 Post-Launch Improvements

Once MVP is live and stable:
1. Consolidate verse storage (remove hardcoded JS)
2. Add analytics dashboard
3. Build admin panel
4. Add error monitoring alerts
5. Create content management system (update verses without code)
6. Add A/B testing framework
7. Build mobile app
8. Add social sharing
9. Integrate Predis.ai for content generation
10. Connect Xero for accounting
