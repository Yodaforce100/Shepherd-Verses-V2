# Shepherd Verses — Current Features (May 8, 2026)

## ✅ Completed Features

### Step 1: Landing Page (100% Complete)
**File:** `/app/page.tsx` + `/components/*.tsx`

**Features:**
- ✅ Hero section with image, headline, CTA button
- ✅ Plans section (Monthly $5.95, Annual $59.50)
- ✅ How-it-works section (3 steps)
- ✅ FAQ section (collapsible Q&A)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Brand colors + typography applied
- ✅ Navigation header with logo
- ✅ Footer with links

**User Experience:**
- Clean, peaceful design
- Clear CTA: "Begin Your Free Trial"
- Mobile-optimized
- Fast load time (Vercel CDN)

---

### Step 2: Plan Selection (100% Complete)
**File:** `/components/plans.tsx`

**Features:**
- ✅ Monthly vs. Annual toggle
- ✅ Plan cards showing price, trial duration, benefits
- ✅ CTA buttons: "Start Free Trial" (opens signup modal)
- ✅ Responsive layout
- ✅ Price highlighting (best value shown)

**User Experience:**
- Single choice trigger: Click "Begin Your Free Trial"
- Modal popup appears for signup
- Plan selected in URL/session

---

### Step 3: Signup Form (100% Complete)
**File:** `/components/signup-form.tsx`, `/components/signup-modal.tsx`

**Features:**
- ✅ Email field
- ✅ Country dropdown (50+ countries)
- ✅ Timezone selector (auto-detects based on country)
- ✅ Geolocation auto-detect for country
- ✅ Form validation (email, required fields)
- ✅ localStorage stores email before Stripe redirect
- ✅ Modal popup UI

**Data Captured:**
- Email address
- Country
- Timezone (stored in Supabase)

**User Experience:**
- 3 fields, simple
- Auto-detect country (reduces friction)
- Clear error messages
- Timezone pre-populated

---

### Step 4: Stripe Checkout (100% Complete)
**File:** `/app/api/create-checkout/route.ts`

**Features:**
- ✅ Creates Stripe checkout session
- ✅ Passes metadata (tier, email, country, timezone)
- ✅ Redirects to Stripe-hosted checkout
- ✅ Supports test payments (card: 4242 4242 4242 4242)
- ✅ Session stored in Stripe
- ✅ Returns session ID in URL

**Data Sent to Stripe:**
- Customer email
- Plan/product ID
- Metadata: tier, country, timezone

**User Experience:**
- Click "Start Free Trial" → Stripe checkout appears
- Enter card details (test mode accepts fake cards)
- Click "Pay" → Transaction processed
- Redirected to success page

---

### Step 5: Payment Confirmation + Webhook (100% Complete)
**File:** `/app/api/webhook/route.ts`

**Features:**
- ✅ Listens for Stripe `checkout.session.completed` event
- ✅ Verifies webhook signature (security)
- ✅ Extracts customer email from Stripe session
- ✅ Creates subscriber record in Supabase with all metadata
- ✅ Stores: email, plan, country, timezone, subscription ID, customer ID
- ✅ Handles errors gracefully
- ✅ Logs all events

**Data Flow:**
1. Stripe sends webhook (checkout completed)
2. Webhook verifies signature
3. Queries Stripe for full session data
4. Inserts new record into `subscribers` table
5. Returns 200 OK

**Database Record Includes:**
- id (UUID)
- email
- country
- timezone
- subscription_status: "active"
- stripe_customer_id
- stripe_subscription_id
- trial_ends: 3 days from now
- created_at
- updated_at

**User Experience:**
- Invisible to user
- Data automatically synced to database
- Ready for next step (Telegram connection)

---

### Step 6: Welcome Screen (100% Complete)
**File:** `/app/welcome/page.tsx`

**Features:**
- ✅ Post-payment confirmation page
- ✅ Displays subscription details (plan, trial end date, email)
- ✅ Email pre-filled in disabled input box (read-only)
- ✅ Green checkmark icon (#5EC896)
- ✅ Large heading "Welcome to Shepherd Verses!"
- ✅ Two CTA buttons:
  - Primary: "Open Telegram Bot →" (gold gradient)
  - Secondary: "Email link instead" (blue outline)
- ✅ Telegram link encodes email in base64
- ✅ Email persists through checkout via localStorage + API
- ✅ Responsive design, no scroll needed
- ✅ Footer logo links home

**Telegram Link:**
- Format: `https://t.me/ShepherdVersesBot?start=BASE64_EMAIL`
- Example: `?start=Z2FyZXRoQGV4YW1wbGUuY29t` (gareth@example.com)
- Bot receives email in `/start` handler

**User Experience:**
- Congratulations message
- Subscription confirmed
- Clear next step: Connect to Telegram
- Option to defer (email link)

---

### Step 7: Telegram Bot Integration (90% Built — Debugging)
**File:** `/shepherd-verses-bot/bot.js`

**Features Built:**
- ✅ Bot `/start` command handler
- ✅ Decodes base64 email from Telegram link
- ✅ Queries Supabase for subscriber by email
- ✅ Updates `telegram_user_id` column (code ready, RLS blocking)
- ✅ Timezone selection keyboard (16+ timezones)
- ✅ Emotion grid (16 emotions, 2-column layout)
- ✅ Message generation (verse + affirmation + mantra)
- ✅ Voice message generation via ElevenLabs
- ✅ Text message with HTML formatting

**Current Issue:**
- Bot code is correct but Supabase RLS policy blocking UPDATE
- Pending: Add SERVICE_ROLE_KEY to `.env` to bypass RLS
- Expected fix time: 30 minutes

**User Experience (When Fixed):**
1. User clicks "Open Telegram Bot →"
2. Telegram opens bot page
3. User taps "SEND MESSAGE"
4. Bot receives email + Telegram ID
5. Bot says: "Welcome [Name]! Your subscription is confirmed."
6. Bot asks: "What's your timezone?"
7. User selects timezone
8. Bot stores preference
9. Bot shows emotion grid

---

### Scripture Library (100% Complete)
**File:** `/shepherd-verses-bot/verse-library-expanded.js`

**Library Stats:**
- 640 verses total
- 16 emotions × 40 verses each
- Each verse: 3-4 sentences (never truncated)
- Each verse includes: Scripture reference + scripture text + affirmation + mantra

**Emotions Covered:**
1. Anxiety
2. Stress
3. Sadness
4. Fear
5. Guilt
6. Anger
7. Disgust
8. Loneliness
9. Joy
10. Gratitude
11. Love
12. Pride
13. Contentment
14. Excitement
15. Frustration
16. Jealousy

**Data Format:**
```javascript
{
  emotion: "anxiety",
  scripture_reference: "Philippians 4:6-7",
  scripture_text: "Do not be anxious about anything, but in every situation...",
  affirmation: "You are safe right now...",
  mantra: "I am safe. I trust myself."
}
```

**Where It's Used:**
- Primary: Pulled from local JS file by bot
- Secondary: Also loaded in Supabase `verses` table (not currently used)

---

### Database Schema (100% Complete)
**File:** `database-schema.sql`

**Tables Created:**
1. **subscribers** (72 columns)
   - Core: id, email, first_name, last_name, country, timezone, tier
   - Subscription: subscription_status, stripe_customer_id, stripe_subscription_id
   - Telegram: telegram_user_id (⚠️ currently NULL), telegram_chat_id, telegram_username
   - Activity: last_emotion_check_in_at, last_message_sent_at
   - Settings: preferred_time, delivery_channel, do_not_disturb_start/end
   - Metadata: emotion_baseline, metadata (JSON), created_at, updated_at

2. **verses** (loaded but not used by bot)
   - id, emotion, scripture_reference, scripture_text, affirmation, mantra

3. **message_history** (for tracking sent messages)
   - message_id, user_id, emotion, verse_ref, mantra, affirmation, created_at

---

## ⏳ Features In Progress

### Step 7: Email Linking (90% Complete)
**Status:** Code ready, RLS blocking

**Pending:**
- Add `SUPABASE_SERVICE_ROLE_KEY` to `.env`
- Restart bot
- Test with real email + Telegram account
- Verify `telegram_user_id` populates

**Expected completion:** May 8, 2026 (30 minutes)

---

## 🚧 Not Started (To Build)

### Step 8: Daily Message Scheduler
**Priority:** High  
**Estimated time:** 2-3 hours

**What it does:**
- Cron job runs every hour
- Queries subscribers by timezone + preferred time
- For each match, pulls random verse from library
- Generates personalized affirmation
- Sends via Telegram at exact preferred time

**Files to create:**
- `/app/api/schedule-messages/route.ts` (Next.js endpoint)
- `/shepherd-verses-bot/scheduler.js` (utility)

---

### Step 9: Account Dashboard
**Priority:** High  
**Estimated time:** 3-4 hours

**What it shows:**
- User's subscription status
- Trial end date
- Current plan
- Preferred message time
- Timezone setting

**What it lets user do:**
- Change timezone
- Change preferred time
- Update subscription
- Cancel subscription

**Files to create:**
- `/app/account/page.tsx`
- `/app/auth/magic-link/route.ts` (email auth)
- `/components/account-dashboard.tsx`

---

### Step 10: Payment Method Updates
**Priority:** Medium  
**Estimated time:** 1 hour

**What it does:**
- User clicks "Update Payment Method"
- Redirected to Stripe Customer Portal
- User updates card in Stripe
- Returned to account page

**Files to create:**
- `/app/api/create-portal-session/route.ts`

---

### Step 11: Cancel Subscription
**Priority:** Medium  
**Estimated time:** 1.5 hours

**What it does:**
- User clicks "Cancel Subscription"
- Confirmation modal
- User confirms
- Stripe marks subscription as `cancel_at_period_end`
- User sees: "Your subscription ends on [date]"
- Can still use until end of period

**Files to create:**
- `/app/api/cancel-subscription/route.ts`
- `/components/cancel-confirmation-modal.tsx`

---

### Infrastructure: Bot Persistent Hosting
**Priority:** Critical (blocks launch)  
**Estimated time:** 2-3 hours

**Current state:** Bot runs locally on Mac mini (dies on restart)

**Solution:** Deploy to persistent host
- Option A: Railway.app (easiest)
- Option B: Heroku
- Option C: AWS Lambda + polling

**Files to create:**
- `Dockerfile` (for containerization)
- `.railway.json` or `Procfile` (for deployment)
- Setup documentation

---

## 📊 Feature Completion Matrix

| Step | Feature | Status | % Done | Start | End | Notes |
|------|---------|--------|--------|-------|-----|-------|
| 1 | Landing Page | Complete | 100% | Apr 20 | May 1 | Live ✅ |
| 2 | Plan Selection | Complete | 100% | Apr 21 | May 1 | Live ✅ |
| 3 | Signup Form | Complete | 100% | Apr 22 | May 2 | Live ✅ |
| 4 | Stripe Checkout | Complete | 100% | Apr 23 | May 3 | Live ✅ |
| 5 | Webhook + DB | Complete | 100% | Apr 24 | May 4 | Live ✅ |
| 6 | Welcome Screen | Complete | 100% | May 1 | May 6 | Live ✅ |
| 7 | Bot Email Link | In Progress | 90% | May 6 | May 8 | RLS fix pending |
| 8 | Daily Scheduler | Not Started | 0% | May 8 | May 10 | Priority |
| 9 | Account Dashboard | Not Started | 0% | May 10 | May 12 | Priority |
| 10 | Payment Updates | Not Started | 0% | May 12 | May 13 | Optional |
| 11 | Cancel Sub | Not Started | 0% | May 12 | May 13 | Optional |
| | Bot Hosting | Not Started | 0% | May 8 | May 10 | Critical |

---

## 🔄 Known Limitations (Current MVP)

- ❌ Bot not persistent (dies on restart)
- ❌ No account dashboard (can't self-serve update timezone)
- ❌ No email authentication (no account login yet)
- ❌ No payment method updates (can only add new card)
- ❌ No subscription cancellation (users stuck)
- ❌ No admin panel (can't manage users)
- ❌ Affirmations generated live (costs $$ per message)
- ❌ No error logging (hard to debug issues)
- ❌ No uptime monitoring (won't know if bot fails)

All planned to be built in next 2 weeks.
