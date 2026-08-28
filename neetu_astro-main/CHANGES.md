# Astro by Neetu — update notes

## Before you put this online — change the passcode

Open **`server.js`** near the top:

```js
const ADMIN_EMAIL    = 'neetu.singhal@nokia.com';       // your admin login
const ADMIN_PASSCODE = 'ChangeThisPasscode123';         // <-- CHANGE THIS
```

`neetu.singhal@nokia.com` is the only account that can open the Admin Panel.
Everyone else never even sees the badge. Change the passcode before this goes
anywhere public. You can also set it without editing the file:

```bash
ADMIN_PASSCODE="your-real-passcode" npm start
```

## The app now has a backend

Student progress used to be saved in each student's own browser, which meant
the admin panel could never see it. It now lives on the server in
**`data/store.json`**, which is what makes the analytics below possible.

That file holds your student list, everyone's progress and watch time. It is
created automatically on first run. **Back it up** — it is your real data now.

---

## What changed

**1. Only two courses**
All the "upcoming" and "recommended" courses are gone — the carousel, the
"All Upcoming Courses" section, the Upcoming tab in My Learning, and the
admin forms that created them. Only **Jyotish Bodh** and **Jyotish Siddhi**
remain.

**2. Jyotish Siddhi — Batch 1 classes attached**
All 24 classes from `batch_1.xlsx` are in, in sheet order, with their YouTube
links. Two things to know about the sheet:
- Class 19 ("5th lord in different houses") had **no link**, so it shows
  "Video coming soon" instead of a broken player. Send me the link, or paste it
  in from the admin panel, and it will start working.
- The sheet jumps from the 2nd lord straight to the 4th — there is **no 3rd lord
  class**. I kept it exactly as the sheet had it rather than guessing.

**3. Batch 2**
The option is there — a Batch 1 / Batch 2 switcher appears on Jyotish Siddhi.
Batch 2 shows "coming soon" and an empty class list. You can add its classes
from **Admin Panel → Add a Class** without touching the code.

**4. Certificate removed from Jyotish Bodh**
Jyotish Bodh has `certificate: false`, so the certificate never appears for it
no matter how many classes are completed. Jyotish Siddhi still has one.

**5. Login restricted to people who paid**
A sign-in screen now sits in front of the whole app. These two are pre-loaded:
- `Netrachandra09@gmail.com`
- `rinkumfa@gmail.com`

Anyone else gets "This email is not registered". Email matching ignores
capitalisation. New students are added from the admin panel — no code edit
needed. Removing a student blocks them immediately, even if they were signed in.

**6. Admin panel is yours only, and now reports on everyone**
Sign in as `neetu.singhal@nokia.com` with the passcode. The panel shows:

- **Top tiles** — students with access, total enrollments, total watch hours
  across everyone.
- **Per student** — name, email, total watch time, and when they were last
  active.
- **Per course, per student** — completion %, classes done, **classes left**,
  and watch time on that course. If they are on Scheduled access it also shows
  how many classes have unlocked for them so far.
- Add or remove students and course access. Removing someone signs them out
  immediately, even mid-session.

The permission check is enforced **on the server**, not just hidden in the UI.
A student's login token is rejected by every admin endpoint, so nobody can get
at the data by poking around in the browser console.

**Watch hours are real.** The app uses the official YouTube Player API and
counts only the seconds a video was actually playing — not how long the page
sat open. Totals only ever increase, so a stale tab can't erase them.

**7. Late purchasers**
Each student has a **purchase date** and an **access mode**:
- **Full access** — every uploaded class available straight away.
- **Scheduled** — classes unlock one per week counting from *their own*
  purchase date. Someone who joins in month 3 starts at Class 1 and follows the
  normal pace instead of getting all 24 at once.

Set this per student, per course, in **Admin Panel → Grant / Update Student
Access**. Change the weekly gap with `DRIP_INTERVAL_DAYS` in app.js.
Both existing students are on **Full access** right now — switch them to
Scheduled whenever you like.

**8. Fullscreen fixed**
The real problem was that a fake control bar (play / skip / seek buttons that
did nothing, since the video is a real YouTube embed) was drawn on top of the
iframe and covered YouTube's own fullscreen button. That bar is gone. Now:
- the iframe properly fills its container
- the Fullscreen / Open in YouTube / Mark watched buttons sit **below** the video
- the wrapper goes fullscreen, not the iframe, which is what Android and desktop
  browsers actually support
- on iOS, where browsers block iframe fullscreen entirely, it falls back to
  opening the video in YouTube

**9. AI Guru removed**
The tab, the screen, the promo banner and all the chat code are gone. The bottom
navigation is now four tabs.

### Also fixed along the way
- The admin "create course" form referenced fields that did not exist in the
  HTML, so it threw an error on submit.
- Course cards showed "undefined Enrolled" because `enrollmentCount` was
  commented out of the course data.
- `switchAstroTool()` and `calculateNumerology()` were called by the HTML but
  never defined — the tool tabs and the Numerology calculator did nothing. Both
  are implemented now.
- The server's Content-Security-Policy blocked Google Fonts, so the Cinzel /
  Inter fonts never loaded when running `npm start`.
- Progress is now measured against the full advertised course length, so a
  course does not jump to 100% just because only a few classes are uploaded.
- Progress and notes are saved per signed-in user.

---

## One important limitation

This is a front-end-only app, so the login is a **front-of-house lock, not real
security**. Someone technical could open the browser console and get past it,
and the YouTube links are unlisted rather than protected — anyone with a link
can watch without logging in.

For paid content that genuinely needs protecting you would need a small backend
(login on a server, videos served through signed URLs or a host like Vimeo with
domain restrictions). Happy to walk through that if you want to go that way —
for now this is fine for keeping honest people organised.

## Running it

```bash
npm install
npm start          # http://localhost:3000
```
