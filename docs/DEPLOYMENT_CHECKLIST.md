# Booking System Deployment Checklist

**Current Status:** Code ready, testing n8n workflows before production merge

---

## ✅ Phase 1: Build & Local Testing (COMPLETE)

- [x] Database created: `knapgemaakt-bookings` (D1)
- [x] Database migrations run to production
- [x] API routes created:
  - `/api/availability` - Returns available time slots
  - `/api/bookings` - Creates bookings
  - `/api/sync-blocked-times` - Syncs Google Calendar blocks
- [x] React BookingCalendar component built
- [x] Integrated into `/aanvragen` page (replaced Cal.com)
- [x] Local testing successful:
  - Calendar appears when form complete
  - Time slots load and are selectable
  - Form submission creates booking
  - Infinite loop fixed
- [x] Code committed to `feat/24-add-in-house-calendar-booking`

---

## 🔄 Phase 2: n8n Workflow Setup & Testing (IN PROGRESS)

### n8n Workflow 1: Google Calendar → D1 Sync

**Purpose:** Every 5 minutes, fetch busy times from Google Calendar and sync to D1 `blocked_times` table

**Status:** ✅ Created in n8n

**Nodes configured:**
1. ✅ Schedule Trigger (every 5 minutes)
2. ✅ Google Calendar - FreeBusy Query
   - Returns busy times for next 14 days
3. ✅ Code Node - Transform to API format:
   ```javascript
   const input = $input.first().json;
   const busyTimes = input.calendars['yannick@knapgemaakt.nl'].busy;

   const blockedTimes = busyTimes.map((busy, index) => {
     const timestamp = new Date(busy.start).getTime();
     const uniqueId = `gcal-${timestamp}-${index}`;
     const eventId = `gcal-event-${timestamp}`;

     return {
       id: uniqueId,
       start_time: busy.start,
       end_time: busy.end,
       source: 'google_calendar',
       calendar_event_id: eventId
     };
   });

   return [{ json: { blocked_times: blockedTimes } }];
   ```
4. ✅ HTTP Request Node configured:
   - Method: POST
   - URL: `https://[preview-url]/api/sync-blocked-times`
   - Header: `Authorization: Bearer [API_SECRET_TOKEN]`
   - Body: `{{ $json }}`

**To test this workflow:**
- [ ] Deploy code to preview (use `/test`)
- [ ] Set `API_SECRET_TOKEN` in Cloudflare Pages environment variables
- [ ] Update HTTP Request URL to preview URL
- [ ] Manually trigger workflow in n8n
- [ ] Verify blocked_times are written to D1:
  ```bash
  npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT * FROM blocked_times ORDER BY start_time DESC LIMIT 10"
  ```

---

### n8n Workflow 2: Booking → Google Calendar + Email

**Purpose:** When user books, create calendar event and send confirmation emails

**Status:** ❌ Not created yet

**Webhook URL:** `https://n8n.summitlab.dev/webhook-test/9adef783-f324-498e-b880-a4aeccff1dd0`

**Nodes to configure:**
1. [ ] Webhook Trigger Node
   - Method: POST
   - Path: `9adef783-f324-498e-b880-a4aeccff1dd0`
   - Respond: Immediately

2. [ ] Google Calendar Node
   - Operation: Create
   - Calendar: Your calendar
   - Start: `{{ $json.start_time }}`
   - End: `{{ $json.end_time }}`
   - Summary: `Intro Call - {{ $json.user_name }}`
   - Description: User details (name, company, email, phone, industry)

3. [ ] Email Node (to user)
   - To: `{{ $json.user_email }}`
   - Subject: `Jouw afspraak is bevestigd! 🎉`
   - HTML Body: Custom branded template

4. [ ] Email Node (to you)
   - To: `yannick@knapgemaakt.nl`
   - Subject: `Nieuwe afspraak: {{ $json.user_name }}`
   - Body: Booking details

**To test this workflow:**
```bash
curl -X POST https://n8n.summitlab.dev/webhook-test/9adef783-f324-498e-b880-a4aeccff1dd0 \
  -H "Content-Type: application/json" \
  -d '{
    "booking_id": "test-123",
    "user_name": "Test User",
    "user_email": "test@example.com",
    "user_phone": "0612345678",
    "user_company": "Test BV",
    "user_industry": "Tech",
    "start_time": "2026-01-20T10:00:00Z",
    "end_time": "2026-01-20T10:15:00Z"
  }'
```

---

## 🚀 Phase 3: Preview Deployment & End-to-End Testing

### Deploy to Preview

- [ ] Run `/test` to deploy feature branch to preview environment
- [ ] Wait for Cloudflare Pages preview build to complete
- [ ] Note preview URL (e.g., `https://feat-24-add-in-house-calendar-booking.knapgemaakt.pages.dev`)

### Configure Environment Variables

**In Cloudflare Pages → Settings → Environment Variables (Preview):**

- [ ] Set `API_SECRET_TOKEN`
  - Generate: `openssl rand -hex 32`
  - Current value: `fc38c4bc174b6bf80b6f1ad63fe601c9f43686e97b51627672e4c971653acce3`
  - Use in n8n Workflow 1 Authorization header

- [ ] Set `N8N_BOOKING_WEBHOOK`
  - Value: `https://n8n.summitlab.dev/webhook-test/9adef783-f324-498e-b880-a4aeccff1dd0`
  - Used by `/api/bookings` to trigger calendar event creation

### Test Workflow 1: Google Calendar Sync

1. [ ] Update n8n HTTP Request URL to preview URL
2. [ ] Manually trigger workflow in n8n
3. [ ] Check n8n execution log for success
4. [ ] Verify blocked times in D1:
   ```bash
   npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT COUNT(*) as count FROM blocked_times WHERE source = 'google_calendar'"
   ```
5. [ ] Check preview site shows blocked times excluded from available slots

### Test Workflow 2: Booking Confirmation

1. [ ] Create workflow 2 in n8n
2. [ ] Test webhook with curl (see command above)
3. [ ] Verify:
   - [ ] Event appears in Google Calendar
   - [ ] User receives confirmation email
   - [ ] You receive notification email

### Test Full Booking Flow

1. [ ] Visit preview URL: `https://[preview-url]/aanvragen`
2. [ ] Fill out form (naam, email, telefoon, bedrijfsnaam, branche, has_website)
3. [ ] Calendar appears
4. [ ] Select a date
5. [ ] Available slots load (excluding blocked times from Google Calendar)
6. [ ] Select a time slot (highlights in acid yellow)
7. [ ] Submit form
8. [ ] Verify success message appears
9. [ ] Check Google Calendar - event created
10. [ ] Check email - confirmation received
11. [ ] Query D1 to verify booking stored:
    ```bash
    npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 1"
    ```

---

## 🎯 Phase 4: Production Deployment

- [ ] All preview tests passing
- [ ] Push feature branch to GitHub
- [ ] Create Pull Request
- [ ] Merge to `master`
- [ ] Cloudflare Pages auto-deploys to production
- [ ] Update n8n Workflow 1 URL to production: `https://knapgemaakt.nl/api/sync-blocked-times`
- [ ] Set production environment variables in Cloudflare (same as preview)
- [ ] Activate n8n Workflow 1 (runs every 5 minutes)
- [ ] Test one final booking on production

---

## 📊 Post-Deployment Monitoring

### Daily Checks (First Week)

- [ ] Check n8n Workflow 1 executions - any failures?
- [ ] Query blocked_times - syncing correctly?
  ```bash
  npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT COUNT(*) FROM blocked_times WHERE synced_at > datetime('now', '-1 day')"
  ```
- [ ] Query bookings - any new bookings?
  ```bash
  npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT * FROM bookings WHERE created_at > datetime('now', '-1 day')"
  ```

### Known Working State

**API Endpoints:**
- ✅ `/api/availability?date=2026-01-20` - Returns available slots
- ✅ `/api/bookings` - POST creates booking (tested locally)
- ✅ `/api/sync-blocked-times` - POST with Bearer token syncs blocked times

**Database:**
- ✅ `availability_rules` - 5 rows (Mon-Fri, 9-17, 15-min slots)
- ✅ `bookings` - 0 rows (empty, ready for production)
- ✅ `blocked_times` - 0 rows (will populate when Workflow 1 runs)

---

## 🎉 Success Criteria

The booking system is considered fully operational when:

✅ n8n Workflow 1 runs every 5 minutes without errors
✅ Google Calendar busy times sync to D1 `blocked_times` table
✅ Available slots on booking calendar exclude blocked times
✅ User can book a time slot successfully
✅ Booking creates Google Calendar event via n8n Workflow 2
✅ User receives confirmation email
✅ You receive notification email
✅ Booking is stored in D1 database

---

## 🔧 Quick Reference

**Cloudflare D1 Database:**
- Name: `knapgemaakt-bookings`
- ID: `a0fcdfee-288f-4937-926e-3efbf5c4cc48`
- Binding: `knapgemaakt_bookings`

**n8n Instance:**
- URL: `https://n8n.summitlab.dev`
- Webhook (Workflow 2): `/webhook-test/9adef783-f324-498e-b880-a4aeccff1dd0`

**API Secret Token:**
- Current: `fc38c4bc174b6bf80b6f1ad63fe601c9f43686e97b51627672e4c971653acce3`
- Used by n8n to authenticate sync requests

**Git Branch:**
- Feature: `feat/24-add-in-house-calendar-booking`
- Commit: `f287d36` - "feat: implement in-house booking system (#24)"

---

## 📝 Next Immediate Action

**Test n8n Workflow 1 (Google Calendar Sync):**

1. Run `/test` to deploy to preview
2. Set `API_SECRET_TOKEN` in Cloudflare Pages preview environment
3. Update n8n HTTP Request node URL to preview URL
4. Manually trigger workflow
5. Verify blocked_times populate in D1

Once Workflow 1 is confirmed working, proceed to create and test Workflow 2.
