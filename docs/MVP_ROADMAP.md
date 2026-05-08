# Shepherd Verses — MVP Roadmap

## 📅 Timeline Overview

**Current Status:** May 8, 2026  
**Target Launch:** May 15, 2026 (7 days)  
**Current Completion:** 60%  
**Remaining Work:** 40%

```
May 8-9   │ Fix Step 7 (Email Linking)
May 9-11  │ Build Step 8 (Daily Scheduler)
May 11-13 │ Build Steps 9-11 (Account Mgmt)
May 13-14 │ Infrastructure (Bot Hosting)
May 14    │ Testing & QA
May 15    │ Soft Launch (Beta)
May 16+   │ Public Launch
```

---

## 🎯 Phase 1: Close Step 7 (May 8-9, 2026)

**Goal:** Telegram email linking fully functional

### Tasks
1. **Get Supabase SERVICE_ROLE_KEY** (15 min)
   - Go to Supabase Dashboard → Settings → API
   - Copy `service_role` secret
   - Add to bot `.env`: `SUPABASE_SERVICE_ROLE_KEY=<key>`

2. **Restart Bot** (5 min)
   - Kill local bot process
   - Start with new `.env`
   - Verify startup logs

3. **Test End-to-End** (20 min)
   - Make test payment with real email
   - Click Telegram link
   - Bot should link email to Telegram ID
   - Check Supabase: `telegram_user_id` populated ✅

4. **Verify Timezone Collection** (10 min)
   - Bot should ask for timezone
   - User selects timezone
   - Check Supabase: `timezone` populated ✅

**Deliverable:** Step 7 fully functional, `telegram_user_id` populated in Supabase

**Estimated Total Time:** 1 hour

---

## 🎯 Phase 2: Build Step 8 (May 9-11, 2026)

**Goal:** Daily messages sending at user's preferred time

### Task 1: Create Schedule Messages Endpoint (1 hour)

**File:** `/app/api/schedule-messages/route.ts`

```typescript
export async function POST(req: Request) {
  // 1. Query Supabase for all subscribers
  // 2. Filter by current timezone + current time
  // 3. For each match:
  //    a. Pull random verse from library
  //    b. Generate affirmation (Claude API)
  //    c. Generate voice (ElevenLabs)
  //    d. Send to subscriber via Telegram
  //    e. Log in message_history
  // 4. Return success count
}
```

**Logic:**
- Called hourly by cron job
- Matches subscribers where `timezone + preferred_time = now`
- Pulls from `/shepherd-verses-bot/verse-library-expanded.js` (not Supabase yet)
- Uses existing `generatePersonalizedMessage()` function
- Uses existing `generateVoiceWithPauses()` function

### Task 2: Set Up Cron Job (30 min)

**Using OpenClaw cron:**
```
Schedule: Every hour (0 * * * *)
Endpoint: /api/schedule-messages
Payload: POST (empty body)
Retry: 3 times if fails
Timeout: 5 minutes
```

**Or use external service (if needed):**
- EasyCron.com (free, 10 min/hour limit)
- Cloudflare Cron
- AWS Lambda + EventBridge

### Task 3: Test Message Delivery (1.5 hours)

1. **Set subscriber's preferred time to NOW** (override in Supabase)
2. **Manually trigger endpoint:** `curl -X POST https://shepherdverses.com/api/schedule-messages`
3. **Check Telegram:** Should receive message in 30 seconds
4. **Check Supabase:** `message_history` has record
5. **Check Supabase:** `subscribers.last_message_sent_at` updated

**Success Criteria:**
- ✅ Message arrives at correct time
- ✅ Voice + text both sent
- ✅ Database records created
- ✅ No errors in logs

**Deliverable:** Daily messages sending at preferred time

**Estimated Total Time:** 3 hours

---

## 🎯 Phase 3: Build Steps 9-11 (May 11-13, 2026)

### Task 1: Email Authentication (Magic Links) (1.5 hours)

**File:** `/app/auth/magic-link/route.ts`

```typescript
// Step 1: User enters email on login page
// Step 2: Generate magic link token
// Step 3: Send link via email
// Step 4: User clicks link
// Step 5: Create session cookie
// Step 6: Redirect to account page
```

**Integration:**
- Use Supabase email function (or SendGrid/Resend)
- Store token in `auth_tokens` table with expiry (15 min)
- Set secure cookie after verification

### Task 2: Account Dashboard (2 hours)

**File:** `/app/account/page.tsx`

**Sections:**
1. **Subscription Status**
   - Plan: Monthly/Annual
   - Status: Active/Cancelled
   - Trial End Date
   - Renewal Date

2. **Preferences**
   - Timezone (dropdown, editable)
   - Preferred Time (time picker, 6 AM - 10 PM)
   - Delivery Channel (Telegram / Email / Both)

3. **Billing**
   - Current card (last 4 digits)
   - Next Billing Date
   - Amount

4. **Actions**
   - Update Payment Method (button)
   - Cancel Subscription (button)
   - Contact Support (link)

**Data Source:** Query `subscribers` table by user email

### Task 3: Update Payment Method (1 hour)

**File:** `/app/api/create-portal-session/route.ts`

```typescript
// 1. Get user's Stripe customer ID from Supabase
// 2. Create Stripe Customer Portal session
// 3. Return portal URL
// 4. Redirect user to Stripe portal
```

**Flow:**
- User on account page clicks "Update Payment"
- Redirected to Stripe Customer Portal
- User updates card
- Returned to account page
- Success message

### Task 4: Cancel Subscription (1 hour)

**File:** `/app/api/cancel-subscription/route.ts`

```typescript
// 1. Get user's Stripe subscription ID
// 2. Call Stripe API: subscription.update({ cancel_at_period_end: true })
// 3. Update Supabase: subscription_status = "canceled"
// 4. Return success
```

**Flow:**
- User clicks "Cancel Subscription"
- Confirmation modal: "Your subscription ends on [date]. You'll still have access until then."
- User confirms
- Subscription marked as canceled
- Show: "Your subscription ends on [date]"

**Deliverable:** Full account management (login, view, update, cancel)

**Estimated Total Time:** 5.5 hours

---

## 🎯 Phase 4: Infrastructure & Hosting (May 13-14, 2026)

**Goal:** Bot runs 24/7 reliably

### Task 1: Containerize Bot (1 hour)

**Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "bot.js"]
```

**Create `.dockerignore`:**
```
node_modules
.env.local
.git
.DS_Store
```

### Task 2: Deploy to Persistent Host (1.5 hours)

**Option A: Railway.app (Recommended)**
1. Push code to GitHub
2. Connect Railway to GitHub repo
3. Set environment variables
4. Deploy
5. Bot runs 24/7

**Option B: Heroku**
1. Create Heroku account
2. Create `Procfile`: `worker: node bot.js`
3. Push code
4. Scale dynos to 1
5. Bot runs 24/7

**Option C: AWS Lambda + Polling**
- More complex, but free tier available
- Requires restructuring bot to handle multiple polls

### Task 3: Set Up Error Logging (1 hour)

**Use Sentry (free tier):**
1. Create Sentry account
2. Create project
3. Add Sentry SDK to bot: `npm install @sentry/node`
4. Wrap bot with Sentry monitoring
5. Get alerts on errors

**Alternative: LogRocket**
- Better for frontend monitoring
- Can track user sessions
- Sentry better for backend

### Task 4: Uptime Monitoring (30 min)

**Use Better Uptime (free tier):**
1. Create account
2. Add bot endpoint
3. Monitor every 5 minutes
4. Get SMS/email alerts if down
5. Get monthly uptime report

**Deliverable:** Bot runs 24/7 with monitoring

**Estimated Total Time:** 4 hours

---

## 🎯 Phase 5: Testing & QA (May 14, 2026)

### Manual Testing Checklist

**Signup Flow:**
- [ ] Website loads fast
- [ ] Signup form validates correctly
- [ ] Timezone dropdown works
- [ ] Stripe checkout accepts test payment
- [ ] Welcome page displays correctly
- [ ] Email properly encoded in Telegram link

**Telegram Bot:**
- [ ] Bot receives email from link
- [ ] `telegram_user_id` populated in Supabase
- [ ] Bot asks for timezone
- [ ] User can select timezone
- [ ] Timezone saved in Supabase

**Daily Messages:**
- [ ] Message sends at preferred time
- [ ] Message contains scripture + affirmation + mantra
- [ ] Voice message quality is good
- [ ] Text message formats correctly
- [ ] Multiple messages don't duplicate

**Account Management:**
- [ ] User can login with magic link
- [ ] Account dashboard loads
- [ ] Can view subscription details
- [ ] Can change timezone
- [ ] Can update payment method
- [ ] Can cancel subscription

**Mobile Testing:**
- [ ] Website responsive on iPhone/Android
- [ ] Telegram bot works on mobile
- [ ] Voice messages play correctly
- [ ] All buttons/forms touch-friendly

**Load Testing:**
- [ ] System handles 10 concurrent signups
- [ ] Webhook processes 100 subscribers without errors
- [ ] Message scheduler handles 100 users getting daily messages

**Browser Compatibility:**
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

**Edge Cases:**
- [ ] User tries to sign up twice with same email
- [ ] User cancels mid-checkout
- [ ] User tries to access account without logging in
- [ ] Bot message fails to send
- [ ] Voice generation fails (fallback to text)
- [ ] Supabase connection fails (graceful error)

**Deliverable:** QA checklist 100% passed

**Estimated Total Time:** 2-3 hours

---

## 🎯 Phase 6: Soft Launch (May 15, 2026)

**Goal:** Invite beta testers, gather feedback

### Tasks

1. **Invite Beta Testers** (30 min)
   - 5-10 trusted friends/community
   - Send link to https://shepherdverses.com
   - Provide feedback form
   - Monitor for bugs

2. **Monitor & Support** (1-2 hours)
   - Watch for errors in Sentry
   - Respond to feedback
   - Fix critical bugs immediately
   - Document feedback

3. **Iterate** (As needed)
   - Fix any bugs found
   - Refine messaging based on feedback
   - Optimize onboarding if needed

**Deliverable:** Soft launch successful, 5+ beta testers actively using

---

## 🎯 Phase 7: Public Launch (May 16+, 2026)

**Goal:** Open to public

### Pre-Launch Checklist

- [ ] All features working in production
- [ ] No critical bugs
- [ ] Error logging active
- [ ] Uptime monitoring active
- [ ] Social media accounts set up
- [ ] Privacy policy + Terms of Service written
- [ ] Customer support email configured
- [ ] FAQ updated with real user questions

### Launch Day Tasks

1. **Go Live**
   - Enable production Stripe keys
   - Switch from test mode
   - Announce on social media

2. **Monitor**
   - Watch Sentry for errors
   - Monitor Stripe for payment issues
   - Track new signups
   - Respond to support emails

3. **Celebrate** 🎉
   - You did it!

---

## 📊 Resource Estimate

### Time
- Phase 1 (Step 7): 1 hour
- Phase 2 (Step 8): 3 hours
- Phase 3 (Steps 9-11): 5.5 hours
- Phase 4 (Infrastructure): 4 hours
- Phase 5 (Testing): 2-3 hours
- Phase 6 (Beta): 2 hours
- **Total: 17.5-18.5 hours of coding**

### Cost
| Service | Cost | Notes |
|---------|------|-------|
| Vercel | $20/month | Already paid |
| Supabase | $25/month | Already paid |
| Stripe | 2.9% + $0.30 | Per transaction |
| ElevenLabs | ~$50/month | For voice (100 subs × 2 msg/day) |
| Claude API | ~$5/month | Message affirmations |
| Railway/Heroku | $5-7/month | Bot hosting |
| Sentry | Free tier | Error logging |
| Better Uptime | free tier | Monitoring |
| **Total** | **~$100-110/month** | |

### Team
- **Claude Code:** 18 hours of coding (Phases 1-5)
- **Gareth:** Strategic decisions, feedback (ongoing)
- **Beta testers:** 1-2 hours testing (Phase 6)

---

## ✅ Success Criteria

**MVP Launch Success = All of:**
1. ✅ Website live and accepting payments
2. ✅ Telegram bot connects users
3. ✅ Daily messages sending
4. ✅ Account management working
5. ✅ Zero critical bugs in production
6. ✅ 5+ beta testers actively using
7. ✅ 24/7 uptime monitoring active
8. ✅ Error logging configured
9. ✅ Customer support email responding

---

## 📝 Notes for Claude Code

1. **Move slowly.** One phase at a time, wait for feedback.
2. **Test thoroughly.** Each phase has a test step before moving forward.
3. **Watch costs.** Prefer free/cheap tools (ElevenLabs, Anthropic minimal).
4. **Document changes.** Each commit should explain what it does.
5. **No rushing.** Better to be one week late than ship buggy code.
6. **Ask questions.** If unsure, ask Gareth before proceeding.
7. **Keep it simple.** No over-engineering. MVP first, then polish.

---

## 🚀 Beyond MVP (Future)

Once MVP is live, consider:
- WhatsApp integration (same delivery)
- Email delivery option
- Predis.ai social media (organic growth)
- Xero accounting integration (revenue tracking)
- Subscription management portal (Stripe-hosted)
- Admin panel (view all subscribers, send announcements)
- Analytics (signups, retention, churn)
- A/B testing (different verse selections, affirmations)
- Community features (share moments, read others' reflections)
- Verse library expansion (120+ verses per emotion)
