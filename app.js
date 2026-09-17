// ==========================================================================
// ASTRO BY NEETU — APP ENGINE
// ==========================================================================


// ##########################################################################
// ###  CONFIGURATION                                                      ###
// ###                                                                     ###
// ###  The student list, the admin login and everybody's progress now     ###
// ###  live on the SERVER (see server.js + data/store.json), not in the   ###
// ###  browser. That is what lets the admin panel report on every         ###
// ###  student's watch time and completion.                               ###
// ###                                                                     ###
// ###  To change the admin email or passcode, edit server.js.             ###
// ##########################################################################

// How many days between class unlocks when a student is on "Scheduled" access
const DRIP_INTERVAL_DAYS = 7;

// ==========================================================================
// 2. COURSE CATALOG (only the two live courses)
// ==========================================================================
const categories = ["Beginner Astrology", "Advanced Astrology"];

const courses = {
    1: {
        id: 1,
        title: "Jyotish Bodh (Beginner Astrology Course)",
        price: 2100,
        rating: 4.9,
        declaredLessons: 0,   // 0 = measure progress against classes actually uploaded
        category: "Beginner Astrology",
        instructor: "Neetu",
        level: "Beginner",
        duration: "6 months",
        hasBatches: true,
        batches: [1, 2],
        certificate: false,   // <-- certificate removed for Jyotish Bodh
        symbol: "🕉️",
        desc: "Learn Basics of Astrology, 12 Houses & Predictions, 12 Zodiac Signs & Predictions, 9 Planets & Their Significations, Results of Each Planet in 12 Houses, Ascendant (Lagna) Fundamentals, Planetary Aspects, Yogas in Astrology, Introduction to Dashas, and Practical Chart Reading."
    },
    2: {
        id: 2,
        title: "Jyotish Siddhi (Advanced Kundali Analysis Course)",
        price: 5100,
        rating: 5.0,
        declaredLessons: 0,   // 0 = measure progress against classes actually uploaded
        category: "Advanced Astrology",
        instructor: "Neetu",
        level: "Advanced",
        duration: "8 months",
        hasBatches: false,    // no batches yet — set to true and add batches: [1, 2] later
        certificate: true,
        symbol: "🔮",
        desc: "Go beyond the birth chart: planets and Rahu-Ketu through the 12 houses, house lords in different houses, Bhavat Bhavam, Rashi and Bhava analysis, Yogas, quizzes and practical assignments."
    }
};

// ==========================================================================
// 3. CLASS / LESSON LIBRARY
//    Jyotish Siddhi Batch 1 is populated from the batch_1 sheet.
//    Batch 2 is intentionally empty for now — the option exists so classes
//    can be added later (from the Admin Panel or straight in this list).
// ==========================================================================
let lessons = {

    // ---------- JYOTISH BODH — BATCH 1 ----------
    "1b1.1":  { id: "1b1.1",  courseId: 1, batch: 1, order: 1,  title: "Basics of Astrology & Cosmic Principles",
                duration: "53 mins", pdf: "L1_Astro_ProfCourse_Class1.pdf",
                pdfUrl: "pdfs/L1_Astro_ProfCourse_Class1.pdf", youtubeEmbedId: "N_W-SOMNJ_4" },
    "1b1.2":  { id: "1b1.2",  courseId: 1, batch: 1, order: 2,  title: "Blue print, Introduction to planets", youtubeEmbedId: "WhWnZfO_EDs" },
    "1b1.3":  { id: "1b1.3",  courseId: 1, batch: 1, order: 3,  title: "Introduction to houses",            youtubeEmbedId: "IxS4WjJckeY" },
    "1b1.4":  { id: "1b1.4",  courseId: 1, batch: 1, order: 4,  title: "Discussion",                        youtubeEmbedId: "x5YUWEcl07U" },
    "1b1.5":  { id: "1b1.5",  courseId: 1, batch: 1, order: 5,  title: "Rashi Introduction part 1",         youtubeEmbedId: "2B2V9NWAaiE" },
    "1b1.6":  { id: "1b1.6",  courseId: 1, batch: 1, order: 6,  title: "Rashi Introduction part 2",         youtubeEmbedId: "tYl_0Ii_V3s" },
    "1b1.7":  { id: "1b1.7",  courseId: 1, batch: 1, order: 7,  title: "Bhavat Bhavam (In Chart)",          youtubeEmbedId: "N_W-SOMNJ_4" },
    "1b1.8":  { id: "1b1.8",  courseId: 1, batch: 1, order: 8,  title: "Quiz on Bhava and Rashi",           youtubeEmbedId: "WqyNdhluPrg" },
    "1b1.9":  { id: "1b1.9",  courseId: 1, batch: 1, order: 9,  title: "Quiz for beginners",                youtubeEmbedId: "0fM-dXqM15E" },
    "1b1.10": { id: "1b1.10", courseId: 1, batch: 1, order: 10, title: "Rahu in 12 houses",                 youtubeEmbedId: "RbnuGvOqdcI" },
    "1b1.11": { id: "1b1.11", courseId: 1, batch: 1, order: 11, title: "Ketu in 12 houses",                 youtubeEmbedId: "tp3UuCyGmaQ" },
    "1b1.12": { id: "1b1.12", courseId: 1, batch: 1, order: 12, title: "Mars in 12 houses",                 youtubeEmbedId: "G6hri27R-nA" },
    "1b1.13": { id: "1b1.13", courseId: 1, batch: 1, order: 13, title: "Assignment",                        youtubeEmbedId: "71yZteqvKFA" },
    "1b1.14": { id: "1b1.14", courseId: 1, batch: 1, order: 14, title: "Venus in 12 houses",                youtubeEmbedId: "6xn48WhXzhs" },
    "1b1.15": { id: "1b1.15", courseId: 1, batch: 1, order: 15, title: "Mercury in 12 houses",              youtubeEmbedId: "R-bgvCLxl4Y" },
    "1b1.16": { id: "1b1.16", courseId: 1, batch: 1, order: 16, title: "Saturn in 12 houses",               youtubeEmbedId: "NS_lzpKLbXE" },
    "1b1.17": { id: "1b1.17", courseId: 1, batch: 1, order: 17, title: "1st lord in different houses",      youtubeEmbedId: "fYeA7zRsGzQ" },
    "1b1.18": { id: "1b1.18", courseId: 1, batch: 1, order: 18, title: "2nd lord in different houses",      youtubeEmbedId: "xORgf1kEIIY" },
    "1b1.19": { id: "1b1.19", courseId: 1, batch: 1, order: 19, title: "4th lord in different houses",      youtubeEmbedId: "iAZcf4aNMjc" },
    "1b1.20": { id: "1b1.20", courseId: 1, batch: 1, order: 20, title: "5th lord in different houses",      youtubeEmbedId: null },
    "1b1.21": { id: "1b1.21", courseId: 1, batch: 1, order: 21, title: "6th lord in different houses",      youtubeEmbedId: "gVZuhGjFdjs" },
    "1b1.22": { id: "1b1.22", courseId: 1, batch: 1, order: 22, title: "7th lord in different houses",      youtubeEmbedId: "5RexztDZRb4" },
    "1b1.23": { id: "1b1.23", courseId: 1, batch: 1, order: 23, title: "8th lord in different houses",      youtubeEmbedId: "KIbNpT1dAYM" },
    "1b1.24": { id: "1b1.24", courseId: 1, batch: 1, order: 24, title: "Yogas part 1",                      youtubeEmbedId: "A8FdYaz-bGQ" },
    "1b1.25": { id: "1b1.25", courseId: 1, batch: 1, order: 25, title: "Yogas part 2",                      youtubeEmbedId: "N2t3EPWlLfY" },

    // ---------- JYOTISH BODH — BATCH 2 ----------
    "1b2.1":  { id: "1b2.1",  courseId: 1, batch: 2, order: 1,  title: "Class 1",                           youtubeEmbedId: "9Z3eSv-AEC4" },
    "1b2.2":  { id: "1b2.2",  courseId: 1, batch: 2, order: 2,  title: "Class 2",                           youtubeEmbedId: "ttOzKp9SNhM" },
    "1b2.3":  { id: "1b2.3",  courseId: 1, batch: 2, order: 3,  title: "Class 3",                           youtubeEmbedId: "GkB54Ps4pFU" },
    "1b2.4":  { id: "1b2.4",  courseId: 1, batch: 2, order: 4,  title: "Rashi Introduction part 2",         youtubeEmbedId: "tYl_0Ii_V3s" },
    "1b2.5":  { id: "1b2.5",  courseId: 1, batch: 2, order: 5,  title: "Class 5",                           youtubeEmbedId: "PuBTT-ubCV4" },
    "1b2.6":  { id: "1b2.6",  courseId: 1, batch: 2, order: 6,  title: "Discussion",                        youtubeEmbedId: "x5YUWEcl07U" },
    "1b2.7":  { id: "1b2.7",  courseId: 1, batch: 2, order: 7,  title: "Class 7",                           youtubeEmbedId: "06CD345gqv0" },
    "1b2.8":  { id: "1b2.8",  courseId: 1, batch: 2, order: 8,  title: "Class 8",                           youtubeEmbedId: "volA1g-PXBs" },
    "1b2.9":  { id: "1b2.9",  courseId: 1, batch: 2, order: 9,  title: "Class 9",                           youtubeEmbedId: "SaC4bzZ1SLw" },
    "1b2.10": { id: "1b2.10", courseId: 1, batch: 2, order: 10, title: "Class 10",                          youtubeEmbedId: "UrdPWGRYAwY" }
};

const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
    "Poorva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
    "Vishakha", "Anuradha", "Jyeshtha", "Moola", "Poorva Ashadha",
    "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Poorva Bhadrapada",
    "Uttara Bhadrapada", "Revati"
];


// ==========================================================================
// 4. APP STATE
// ==========================================================================
const state = {
    theme: 'light',
    framedMode: true,
    activeTab: 'Home',
    activeCourseId: null,
    activeBatch: null,
    activeLessonId: null,
    selectedCategoryFilter: null,

    // Session
    user: null,          // { email, name, isAdmin }
    enrollments: {},     // { courseId: { purchasedOn, accessMode, batch } }

    completedLessons: {},
    watchSeconds: {},      // lessonId -> seconds actually watched
    savedNotes: [],

    notifications: [
        { id: 1, title: "Welcome", text: "Namaste! Your classes are ready inside My Learning.", date: "2026-08-01" }
    ],

    ongoingFilter: 'All',
    ongoingSort: 'RecentlyViewed',
    lastAccessed: {},

    adminPanelActive: false,
    lastKundaliChart: null
};


// ==========================================================================
// 5. SERVER COMMUNICATION
// ==========================================================================
const SESSION_KEY = 'astro_token_v2';

function getToken() {
    try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
}
function setToken(t) {
    try { t ? localStorage.setItem(SESSION_KEY, t) : localStorage.removeItem(SESSION_KEY); } catch (e) {}
}

async function api(endpoint, body) {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': getToken() || '' },
        body: JSON.stringify(body || {})
    });
    // If the app is being served by something other than server.js, the API
    // route returns a web page instead of JSON — detect that clearly.
    const type = res.headers.get('content-type') || '';
    if (!type.includes('application/json')) {
        throw new Error('BACKEND_MISSING');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
    return data;
}

async function apiGet(endpoint) {
    const res = await fetch(endpoint, { headers: { 'x-auth-token': getToken() || '' } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');
    return data;
}

// Progress is pushed to the server (debounced) so the admin can see it
let progressFlushTimer = null;
function queueProgressSync(immediate) {
    if (!state.user || state.user.isAdmin) return;
    clearTimeout(progressFlushTimer);
    const send = () => {
        api('/api/progress', { completed: state.completedLessons, watch: state.watchSeconds })
            .catch(() => {/* offline — it will sync on the next change */});
    };
    if (immediate) send(); else progressFlushTimer = setTimeout(send, 1500);
}

// ==========================================================================
// 6. AUTHENTICATION (verified on the server)
// ==========================================================================
function normaliseEmail(email) {
    return (email || "").trim().toLowerCase();
}

// The admin email is checked server-side. This is only used to decide whether
// to reveal the passcode box while typing.
const ADMIN_EMAIL_HINT = "neetu.singhal@nokia.com";
function looksLikeAdmin(email) {
    return normaliseEmail(email) === ADMIN_EMAIL_HINT;
}

function onLoginEmailInput() {
    const isAdmin = looksLikeAdmin(document.getElementById("loginEmail").value);
    document.getElementById("adminPassField").style.display = isAdmin ? "block" : "none";
    if (isAdmin) {
        // Admin uses the passcode box, not the student password boxes
        document.getElementById("studentPassField").style.display = "none";
        document.getElementById("confirmPassField").style.display = "none";
        loginMode = 'admin';
        setLoginButton("Sign In");
    } else if (loginMode === 'admin') {
        loginMode = 'signin';
        setLoginButton("Sign In");
    }
}

function handleLoginEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        attemptLogin();
    }
}

function showLoginError(msg) {
    const el = document.getElementById("loginError");
    if (el) {
        el.textContent = msg;
        el.style.display = msg ? "block" : "none";
    }
}

function setLoginButton(label) {
    const el = document.getElementById("loginBtnLabel");
    if (el) el.textContent = label;
}

// 'signin'  = email + password
// 'create'  = first time in, choosing a password
// 'admin'   = email + admin passcode
let loginMode = 'signin';

async function attemptLogin() {
    const email = normaliseEmail(document.getElementById("loginEmail").value);
    const passcode = document.getElementById("loginAdminPass").value;
    const password = document.getElementById("loginPassword").value;
    const confirm = document.getElementById("loginPasswordConfirm").value;

    if (!email) {
        showLoginError("Please enter your email address.");
        return;
    }

    showLoginError("");

    try {
        // --- first sign-in: create the password ---
        if (loginMode === 'create') {
            if (password.length < 6) {
                showLoginError("Please choose a password of at least 6 characters.");
                return;
            }
            if (password !== confirm) {
                showLoginError("The two passwords do not match.");
                return;
            }
            const created = await api('/api/set-password', { email, password });
            setToken(created.token);
            showToast("Password created. Welcome!");
            applySession(created);
            return;
        }

        // --- normal sign-in ---
        const data = await api('/api/login', { email, passcode, password });

        // Server says this student has not chosen a password yet
        if (data.needsPassword) {
            loginMode = 'create';
            document.getElementById("studentPassField").style.display = "block";
            document.getElementById("confirmPassField").style.display = "block";
            document.getElementById("studentPassLabel").textContent = "Choose a password";
            document.getElementById("loginPassword").placeholder = "At least 6 characters";
            setLoginButton("Create password & sign in");
            showLoginError("");
            document.getElementById("loginPassword").focus();
            return;
        }

        setToken(data.token);
        applySession(data);

    } catch (err) {
        if (err instanceof TypeError || err.message === 'BACKEND_MISSING') {
            showLoginError(
                "The app's server isn't running, so the login can't be checked. " +
                "Stop VS Code Live Preview, run  npm start  in the terminal, then open http://localhost:3000"
            );
            return;
        }

        // They have a password but did not type one — reveal the box
        if (err.message.indexOf('enter your password') !== -1) {
            document.getElementById("studentPassField").style.display = "block";
            document.getElementById("studentPassLabel").textContent = "Password";
            document.getElementById("loginPassword").focus();
        }
        showLoginError(err.message);
    }
}

function applySession(data) {
    state.user = data.user;
    state.enrollments = data.enrollments || {};
    state.completedLessons = (data.progress && data.progress.completed) || {};
    state.watchSeconds = (data.progress && data.progress.watch) || {};

    // Classes the admin added are merged over the built-in list
    const custom = data.customLessons || {};
    Object.keys(custom).forEach(k => { lessons[k] = custom[k]; });

    document.getElementById("loginScreen").style.display = "none";
    bootAppForUser();
}

async function restoreSession() {
    if (!getToken()) return false;
    try {
        const data = await apiGet('/api/session');
        applySession(data);
        return true;
    } catch (e) {
        setToken(null);
        return false;
    }
}

async function logoutUser() {
    flushWatchTime(true);
    try { await api('/api/logout', {}); } catch (e) {}
    setToken(null);

    state.user = null;
    state.adminPanelActive = false;

    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginAdminPass").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginPasswordConfirm").value = "";
    document.getElementById("adminPassField").style.display = "none";
    document.getElementById("studentPassField").style.display = "none";
    document.getElementById("confirmPassField").style.display = "none";
    loginMode = 'signin';
    setLoginButton("Sign In");
    document.getElementById("adminToggle").style.display = "none";
    showToast("You have been signed out.");
}


// ==========================================================================
// 7. BOOTSTRAP
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
    syncTime();
    setInterval(syncTime, 60000);
    calculateNavatara();
    loadYouTubeApi();

    const restored = await restoreSession();
    if (!restored) {
        document.getElementById("loginScreen").style.display = "flex";
        checkBackend();
    }
});

// Tells the user straight away if the page is not being served by server.js,
// which is the usual reason a correct passcode appears to be rejected.
async function checkBackend() {
    try {
        const res = await fetch('/api/health');
        const type = res.headers.get('content-type') || '';
        if (!type.includes('application/json')) throw new Error('not json');
        const info = await res.json();
        if (!info.ok) throw new Error('bad');
    } catch (e) {
        showLoginError(
            "The app's server isn't running, so no login can work. " +
            "Stop VS Code Live Preview, run  npm start  in the terminal, then open http://localhost:3000"
        );
    }
}

// Don't lose the last few seconds of watch time when the tab closes
window.addEventListener("beforeunload", () => flushWatchTime(true));

function bootAppForUser() {
    if (state.user.isAdmin) {
        // The admin previews both courses
        state.enrollments = {
            "1": { purchasedOn: "2020-01-01", accessMode: "full", batch: 1 },
            "2": { purchasedOn: "2020-01-01", accessMode: "full", batch: null }
        };
    }

    state.savedNotes = loadNotes();

    const enrolledIds = enrolledCourseIds();
    state.activeCourseId = enrolledIds.length ? enrolledIds[0] : null;
    state.activeBatch = state.activeCourseId ? enrollmentBatch(state.activeCourseId) : null;

    const greet = document.getElementById("studentGreeting");
    if (greet) greet.textContent = `Namaste, ${state.user.name.split(" ")[0]}`;

    const adminBadge = document.getElementById("adminToggle");
    if (adminBadge) adminBadge.style.display = state.user.isAdmin ? "block" : "none";

    renderStudyTrackChips();
    renderCourseCatalogGrid();
    renderOngoingCoursesDashboard();
    renderOngoingCoursesFullPage();
    renderContinueLearningHubList();
    updateHomeProgressCard();
    updateNotificationsBell();
    switchNavTab('Home');
}

function saveProgress() {
    queueProgressSync();
}

function saveNotes() {
    // Notes stay on the student's own device — they are personal, not something
    // the admin needs to read.
    if (!state.user) return;
    try {
        localStorage.setItem(`astro_notes_${normaliseEmail(state.user.email)}`, JSON.stringify(state.savedNotes));
    } catch (e) {}
}

function loadNotes() {
    if (!state.user) return [];
    try {
        return JSON.parse(localStorage.getItem(`astro_notes_${normaliseEmail(state.user.email)}`) || "[]");
    } catch (e) { return []; }
}

function syncTime() {
    const timeSpan = document.getElementById("phoneTime");
    if (timeSpan) {
        const now = new Date();
        timeSpan.textContent =
            `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
}

function showToast(msg, isSuccess = true) {
    const toast = document.getElementById("appToast");
    const icon = document.getElementById("toastIcon");
    const label = document.getElementById("toastMsg");

    if (toast && icon && label) {
        label.textContent = msg;
        icon.className = isSuccess ? "fa-solid fa-circle-check toast-icon" : "fa-solid fa-triangle-exclamation toast-icon";
        icon.style.color = isSuccess ? "var(--color-secondary)" : "var(--color-error)";
        toast.classList.add("active");
        setTimeout(() => toast.classList.remove("active"), 3000);
    }
}



// ==========================================================================
// WATCH-TIME TRACKING
// Uses the official YouTube Player API so we count seconds the video was
// genuinely playing, not just how long the page was open. These totals are
// what the admin panel reports as watch hours.
// ==========================================================================
let ytApiReady = false;
let ytPlayer = null;
let watchTicker = null;
let pendingWatch = 0;

function loadYouTubeApi() {
    if (window.YT && window.YT.Player) { ytApiReady = true; return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.onerror = () => console.warn('YouTube API unavailable — videos still play, watch time is not counted.');
    document.head.appendChild(tag);
}

// Called by the YouTube API script once it has loaded
window.onYouTubeIframeAPIReady = function () {
    ytApiReady = true;
    attachPlayer();
};

function attachPlayer() {
    if (!ytApiReady || ytPlayer) return;
    const iframe = document.getElementById('youtubePlayer');
    if (!iframe || !iframe.src) return;

    try {
        ytPlayer = new YT.Player('youtubePlayer', {
            events: {
                onStateChange: (e) => {
                    if (e.data === YT.PlayerState.PLAYING) startWatchTicker();
                    else stopWatchTicker();
                },
                onError: handlePlayerError
            }
        });
    } catch (err) {
        console.warn('Could not attach the YouTube player:', err);
    }
}

function handlePlayerError(e) {
    // 101 and 150 both mean the owner has disabled embedding on this video
    const messages = {
        2: "That video link looks malformed. Check it in the admin panel.",
        5: "This video cannot be played in this browser.",
        100: "This video is private or has been deleted on YouTube.",
        101: "The video owner has disabled playback on other websites. Fix this in YouTube Studio.",
        150: "The video owner has disabled playback on other websites. Fix this in YouTube Studio."
    };
    showLockOverlay(true, messages[e.data] || "This video could not be played.");
}

function startWatchTicker() {
    stopWatchTicker();
    watchTicker = setInterval(() => {
        if (!state.activeLessonId) return;
        state.watchSeconds[state.activeLessonId] = (state.watchSeconds[state.activeLessonId] || 0) + 1;
        pendingWatch++;
        if (pendingWatch >= 30) flushWatchTime();   // save every 30s of viewing
    }, 1000);
}

function stopWatchTicker() {
    if (watchTicker) { clearInterval(watchTicker); watchTicker = null; }
    flushWatchTime();
}

function flushWatchTime(immediate) {
    if (pendingWatch === 0 && !immediate) return;
    pendingWatch = 0;
    queueProgressSync(immediate);
}

function totalWatchSeconds(watchMap, lessonIds) {
    if (!watchMap) return 0;
    const keys = lessonIds || Object.keys(watchMap);
    return keys.reduce((sum, id) => sum + (Number(watchMap[id]) || 0), 0);
}

function formatDuration(seconds) {
    seconds = Math.round(Number(seconds) || 0);
    if (seconds < 60) return `${seconds}s`;
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ==========================================================================
// 8. ENROLLMENT & DRIP-ACCESS ENGINE
//    This is what lets a student who bought the course late follow the
//    classes from their own start date instead of getting nothing / everything.
// ==========================================================================
function enrolledCourseIds() {
    return Object.keys(state.enrollments)
        .map(Number)
        .filter(id => !!courses[id]);
}

function isEnrolled(courseId) {
    return Object.prototype.hasOwnProperty.call(state.enrollments, String(courseId));
}

function enrollmentBatch(courseId) {
    const e = state.enrollments[String(courseId)];
    if (!e) return null;
    if (!courses[courseId].hasBatches) return null;
    return e.batch || 1;
}

function addDays(dateStr, days) {
    const d = new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + days);
    return d;
}

function formatDate(d) {
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

// Returns { unlocked: bool, unlockDate: Date|null }
function isOwner() {
    return !!(state.user && state.user.isAdmin);
}

function lessonAccess(lesson) {
    // The owner previews everything, in every batch
    if (isOwner()) return { unlocked: true, unlockDate: null };

    const enrollment = state.enrollments[String(lesson.courseId)];
    if (!enrollment) return { unlocked: false, unlockDate: null };

    // A batch-based course only unlocks the batch the student actually bought
    if (courses[lesson.courseId].hasBatches && lesson.batch !== (enrollment.batch || 1)) {
        return { unlocked: false, unlockDate: null };
    }

    if (enrollment.accessMode !== 'drip') {
        return { unlocked: true, unlockDate: null };
    }

    const unlockDate = addDays(enrollment.purchasedOn, (lesson.order - 1) * DRIP_INTERVAL_DAYS);
    const now = new Date();
    return { unlocked: now >= unlockDate, unlockDate: unlockDate };
}

// All classes for a course (and batch, if the course runs in batches)
function classesFor(courseId, batch) {
    return Object.values(lessons)
        .filter(l => l.courseId === courseId)
        .filter(l => !courses[courseId].hasBatches || l.batch === batch)
        .sort((a, b) => a.order - b.order);
}

function unlockedClassesFor(courseId, batch) {
    return classesFor(courseId, batch).filter(l => lessonAccess(l).unlocked);
}

function calculateCourseProgress(courseId) {
    const batch = enrollmentBatch(courseId);
    const all = classesFor(courseId, batch);
    if (all.length === 0) return 0;

    // Measure against the full advertised course length so a course does not
    // jump to 100% just because only a few classes have been uploaded so far.
    const denominator = Math.max(all.length, courses[courseId].declaredLessons || all.length);
    const done = all.filter(l => state.completedLessons[l.id] === true).length;
    return Math.min(100, Math.round((done / denominator) * 100));
}

function nextClassFor(courseId) {
    const batch = enrollmentBatch(courseId);
    const all = classesFor(courseId, batch);
    return all.find(l => !state.completedLessons[l.id]) || null;
}


// ==========================================================================
// 9. VIEW ROUTING
// ==========================================================================
function switchNavTab(tabName) {
    state.activeTab = tabName;
    state.adminPanelActive = false;

    ['Home', 'Ongoing', 'Tools', 'Profile'].forEach(t => {
        const tabEl = document.getElementById(`tab${t}`);
        const viewEl = document.getElementById(`view${t}`);
        if (tabEl) tabEl.classList.remove('active');
        if (viewEl) viewEl.classList.remove('active');
    });

    document.getElementById("viewVideoLearning").classList.remove('active');
    document.getElementById("viewAdmin").classList.remove('active');

    const activeTabEl = document.getElementById(`tab${tabName}`);
    if (activeTabEl) activeTabEl.classList.add('active');
    const activeViewEl = document.getElementById(`view${tabName}`);
    if (activeViewEl) activeViewEl.classList.add('active');

    document.getElementById("appHeader").style.display = "flex";
    document.getElementById("appBottomNav").style.display = "grid";

    if (tabName === 'Home') {
        renderCourseCatalogGrid();
        renderOngoingCoursesDashboard();
        updateHomeProgressCard();
    } else if (tabName === 'Ongoing') {
        renderOngoingCoursesFullPage();
        renderContinueLearningHubList();
    } else if (tabName === 'Profile') {
        renderProfileView();
    }

    document.getElementById("viewCanvas").scrollTop = 0;
}

function toggleFrameMode() {
    state.framedMode = !state.framedMode;
    const frame = document.getElementById("appFrame");
    if (frame) {
        frame.classList.toggle("framed-mode", state.framedMode);
        showToast(state.framedMode ? "Device frame enabled" : "Full responsive layout enabled");
    }
}

function toggleThemeMode() {
    const html = document.documentElement;
    const btn = document.getElementById("themeToggleBtn");
    const isLight = html.getAttribute("data-theme") === "light";

    html.setAttribute("data-theme", isLight ? "dark" : "light");
    state.theme = isLight ? 'dark' : 'light';
    if (btn) {
        btn.innerHTML = isLight
            ? `<i class="fa-regular fa-sun" style="color: var(--color-secondary);"></i>`
            : `<i class="fa-regular fa-moon"></i>`;
    }
}

function toggleAdminPanel() {
    // Hard gate: nobody except the owner account gets in here
    if (!state.user || !state.user.isAdmin) {
        showToast("Admin panel is restricted.", false);
        return;
    }

    state.adminPanelActive = !state.adminPanelActive;
    const viewAdmin = document.getElementById("viewAdmin");
    const badge = document.getElementById("adminToggle");
    if (!viewAdmin) return;

    if (state.adminPanelActive) {
        document.querySelectorAll(".nav-view").forEach(v => v.classList.remove("active"));
        viewAdmin.classList.add("active");
        document.getElementById("appHeader").style.display = "flex";
        document.getElementById("appBottomNav").style.display = "grid";

        badge.innerHTML = `<i class="fa-solid fa-xmark"></i> Exit Admin`;
        badge.style.background = "rgba(201, 59, 59, 0.15)";
        badge.style.color = "var(--color-error)";
        badge.style.borderColor = "var(--color-error)";

        renderAdminDashboard();
    } else {
        badge.innerHTML = `<i class="fa-solid fa-user-gear"></i> Admin Panel`;
        badge.style.background = "rgba(212, 175, 55, 0.15)";
        badge.style.color = "var(--color-secondary)";
        badge.style.borderColor = "var(--color-secondary)";
        switchNavTab('Home');
    }
}


// ==========================================================================
// 10. QUICK MENU & NOTIFICATIONS
// ==========================================================================
function openQuickMenu() {
    const enrolled = enrolledCourseIds();
    const inProgress = enrolled.filter(id => calculateCourseProgress(id) < 100).length;

    const modalHtml = `
        <div class="checkout-sheet quick-menu-sheet">
            <div class="checkout-sheet-header">
                <h4 class="checkout-sheet-title"><i class="fa-solid fa-bars" style="color:var(--color-secondary); margin-right:4px;"></i> Quick Menu</h4>
                <button class="checkout-close-btn" onclick="closeQuickMenu()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="quick-menu-list">
                <button class="quick-menu-item" onclick="goToQuickMenuTarget('Ongoing','Continue')">
                    <span class="quick-menu-icon"><i class="fa-solid fa-play"></i></span>
                    <span class="quick-menu-text">
                        <span class="quick-menu-label">Continue Learning</span>
                        <span class="quick-menu-sub">${inProgress} course${inProgress === 1 ? '' : 's'} in progress</span>
                    </span>
                    <i class="fa-solid fa-chevron-right quick-menu-arrow"></i>
                </button>
                <button class="quick-menu-item" onclick="goToQuickMenuTarget('Ongoing','Ongoing')">
                    <span class="quick-menu-icon"><i class="fa-solid fa-book-open-reader"></i></span>
                    <span class="quick-menu-text">
                        <span class="quick-menu-label">My Courses</span>
                        <span class="quick-menu-sub">${enrolled.length} enrolled course${enrolled.length === 1 ? '' : 's'}</span>
                    </span>
                    <i class="fa-solid fa-chevron-right quick-menu-arrow"></i>
                </button>
                <button class="quick-menu-item" onclick="goToQuickMenuTarget('Tools')">
                    <span class="quick-menu-icon"><i class="fa-solid fa-dharmachakra"></i></span>
                    <span class="quick-menu-text">
                        <span class="quick-menu-label">Astro Tools</span>
                        <span class="quick-menu-sub">Kundali, Numerology & Navatara</span>
                    </span>
                    <i class="fa-solid fa-chevron-right quick-menu-arrow"></i>
                </button>
                <button class="quick-menu-item" onclick="goToQuickMenuTarget('Profile')">
                    <span class="quick-menu-icon"><i class="fa-solid fa-graduation-cap"></i></span>
                    <span class="quick-menu-text">
                        <span class="quick-menu-label">My Profile</span>
                        <span class="quick-menu-sub">Access details & sign out</span>
                    </span>
                    <i class="fa-solid fa-chevron-right quick-menu-arrow"></i>
                </button>
            </div>
        </div>
    `;

    const modal = document.getElementById("quickMenuModal");
    if (modal) {
        modal.innerHTML = modalHtml;
        modal.style.display = "flex";
        modal.onclick = (e) => { if (e.target === modal) closeQuickMenu(); };
    }
}

function closeQuickMenu() {
    const modal = document.getElementById("quickMenuModal");
    if (modal) modal.style.display = "none";
}

function goToQuickMenuTarget(navTab, subTarget) {
    closeQuickMenu();
    switchNavTab(navTab);
    if (navTab === 'Ongoing' && subTarget) {
        setTimeout(() => switchLearningHubTab(subTarget), 0);
    }
}

function updateNotificationsBell() {
    const badge = document.getElementById("bellBadge");
    if (badge) badge.style.display = state.notifications.length ? "block" : "none";
}

function showNotificationCenter() {
    if (state.notifications.length === 0) {
        showToast("No notifications.");
        return;
    }
    const last = state.notifications[state.notifications.length - 1];
    showToast(`Latest: ${last.text}`, true);
    const badge = document.getElementById("bellBadge");
    if (badge) badge.style.display = "none";
}


// ==========================================================================
// 11. HOME — CATEGORIES & CATALOG
// ==========================================================================
function renderStudyTrackChips() {
    const container = document.getElementById("categoriesContainer");
    if (!container) return;

    let html = `<div class="category-chip ${state.selectedCategoryFilter === null ? 'active' : ''}" onclick="filterCategory(null)">
                    <i class="fa-solid fa-dharmachakra"></i> All Categories
                </div>`;

    categories.forEach(cat => {
        const isActive = state.selectedCategoryFilter === cat;
        const icon = cat.includes("Beginner") ? "fa-om" : "fa-compass";
        html += `<div class="category-chip ${isActive ? 'active' : ''}" onclick="filterCategory('${cat}')">
                    <i class="fa-solid ${icon}"></i> ${cat}
                 </div>`;
    });

    container.innerHTML = html;
}

function filterCategory(cat) {
    state.selectedCategoryFilter = cat;
    renderStudyTrackChips();
    renderCourseCatalogGrid();
}

function clearCatalogFilter() {
    filterCategory(null);
}

function courseCardHtml(c) {
    const enrolled = isEnrolled(c.id);
    const progress = enrolled ? calculateCourseProgress(c.id) : 0;
    const batch = enrollmentBatch(c.id);
    const uploaded = classesFor(c.id, batch).length;

    const tintStart = c.category.includes("Advanced") ? "rgba(30, 17, 45, 0.85)" : "rgba(74, 21, 75, 0.80)";
    const tintEnd = c.category.includes("Advanced") ? "rgba(74, 21, 75, 0.60)" : "rgba(118, 42, 120, 0.55)";

    return `
    <div class="course-card" id="courseCard-${c.id}">
        <div class="course-image-wrapper" style="--tint-start: ${tintStart}; --tint-end: ${tintEnd};">
            <div class="course-symbol-icon">${c.symbol}</div>
            <span class="course-tag">${c.category}</span>
            <span class="course-level-badge level-${c.level.toLowerCase()}">${c.level}</span>
        </div>
        <div class="course-body">
            <span class="course-instructor">Instructor: ${c.instructor}</span>
            <h4 class="course-card-title" style="font-family: var(--font-serif); font-weight: 800; font-size:15px; color: var(--color-primary);">${c.title}</h4>
            <p class="course-card-desc">${c.desc}</p>

            <div class="course-meta-tags-row">
                <span><i class="fa-regular fa-clock"></i> ${c.duration}</span>
                <span><i class="fa-solid fa-book-open"></i> ${uploaded} class${uploaded === 1 ? '' : 'es'} available</span>
                ${c.hasBatches && batch ? `<span><i class="fa-solid fa-users"></i> Batch ${batch}</span>` : ''}
            </div>

            <div class="course-rating-row">
                <span class="star-icon-rating">★</span>
                <span style="font-weight:700;">${c.rating}</span>
            </div>

            ${enrolled ? `
            <div class="ongoing-bar-grp" style="margin-top: 4px;">
                <div class="ongoing-bar-timeline"><div class="fill" style="width: ${progress}%;"></div></div>
                <span class="ongoing-percent">${progress}% Complete</span>
            </div>` : ''}

            <div class="course-meta-footer">
                <span class="course-price-label">${enrolled ? 'Enrolled' : '₹' + c.price.toLocaleString('en-IN')}</span>
                ${enrolled
                    ? `<button class="enroll-action-btn" onclick="openCourseView(${c.id})" style="background: var(--color-secondary); color: var(--color-primary); font-weight:700;">Open <i class="fa-solid fa-chevron-right"></i></button>`
                    : `<button class="enroll-action-btn" onclick="showPurchaseInfo(${c.id})" style="background: var(--bg-surface); border:1px solid var(--color-border); color: var(--color-text-muted);">Not purchased</button>`
                }
            </div>
        </div>
    </div>
    `;
}

function renderCourseCatalogGrid() {
    const grid = document.getElementById("courseCatalogGrid");
    if (!grid) return;

    const filter = state.selectedCategoryFilter;
    let html = "";

    Object.values(courses).forEach(c => {
        if (filter && c.category !== filter) return;
        html += courseCardHtml(c);
    });

    grid.innerHTML = html || `<div style="text-align:center; padding: 20px; font-size:12px; color:var(--color-text-muted);">No courses in this category.</div>`;
}

function handleCatalogSearch() {
    const val = document.getElementById("courseSearch").value.toLowerCase();
    const grid = document.getElementById("courseCatalogGrid");
    if (!grid) return;

    if (val.length > 0) {
        state.selectedCategoryFilter = null;
        renderStudyTrackChips();
    }

    let html = "";
    Object.values(courses).forEach(c => {
        if (c.title.toLowerCase().includes(val) || c.desc.toLowerCase().includes(val) || c.category.toLowerCase().includes(val)) {
            html += courseCardHtml(c);
        }
    });

    grid.innerHTML = html || `<div style="text-align:center; padding: 20px; font-size:12px; color:var(--color-text-muted);">No results found. Try "Jyotish".</div>`;
}

function showPurchaseInfo(courseId) {
    const c = courses[courseId];
    showToast(`You do not have access to "${c.title}". Please contact Neetu to purchase.`, false);
}

function updateHomeProgressCard() {
    const section = document.getElementById("continueLearningSection");
    if (!section) return;

    const enrolled = enrolledCourseIds();
    const activeId = enrolled.includes(state.activeCourseId) ? state.activeCourseId : enrolled[0];

    if (!activeId) {
        section.style.display = "none";
        return;
    }

    const course = courses[activeId];
    const percent = calculateCourseProgress(activeId);

    section.style.display = "block";
    document.getElementById("contCourseSubject").textContent = course.category;
    document.getElementById("contCourseTitle").textContent = course.title;
    document.getElementById("contCoursePercent").textContent = `${percent}%`;
    document.getElementById("contCourseBar").style.width = `${percent}%`;

    const next = nextClassFor(activeId);
    document.getElementById("contCourseNextUp").textContent = next
        ? `Next Up: Class ${next.order} — ${next.title}`
        : "All uploaded classes watched 🎉";
}

function openActiveCourseLearning() {
    const enrolled = enrolledCourseIds();
    const activeId = enrolled.includes(state.activeCourseId) ? state.activeCourseId : enrolled[0];
    if (activeId) openCourseView(activeId);
}


// ==========================================================================
// 12. COURSE / VIDEO LEARNING VIEW
// ==========================================================================
function openCourseView(courseId) {
    if (!isEnrolled(courseId)) {
        showPurchaseInfo(courseId);
        return;
    }

    state.activeCourseId = courseId;
    state.activeBatch = enrollmentBatch(courseId);
    state.lastAccessed[courseId] = new Date().toISOString();

    document.querySelectorAll(".nav-view").forEach(v => v.classList.remove("active"));
    document.getElementById("viewVideoLearning").classList.add("active");
    document.getElementById("appHeader").style.display = "none";
    document.getElementById("appBottomNav").style.display = "none";

    const course = courses[courseId];
    document.getElementById("courseViewSubject").textContent = course.category;

    renderBatchSwitcher();
    renderAccessStatusStrip();
    renderCurriculumAccordion();

    // Open the first class the student has not finished (and can actually watch)
    const list = classesFor(courseId, state.activeBatch);
    const openable = list.filter(l => lessonAccess(l).unlocked);
    const target = openable.find(l => !state.completedLessons[l.id]) || openable[0] || list[0];

    if (target) {
        loadLessonVideo(target.id);
    } else {
        state.activeLessonId = null;
        document.getElementById("courseViewLessonTitle").textContent = "No classes available yet";
        setPlayerSrc("");
        showLockOverlay(false);
    }

    checkCertificateThreshold();
    document.getElementById("viewCanvas").scrollTop = 0;
}

function backToHomeView() {
    stopWatchTicker();
    if (ytPlayer && ytPlayer.stopVideo) { try { ytPlayer.stopVideo(); } catch (e) {} }
    setPlayerSrc("");   // stop playback when leaving
    switchNavTab('Home');
}

function renderBatchSwitcher() {
    const row = document.getElementById("batchSwitchRow");
    const tabs = document.getElementById("batchSwitchTabs");
    const course = courses[state.activeCourseId];
    if (!row || !tabs || !course) return;

    if (!course.hasBatches) {
        row.style.display = "none";
        return;
    }

    const myBatch = enrollmentBatch(state.activeCourseId);

    // Students only ever see their own batch. The admin sees every batch so
    // classes can be checked and added.
    const visibleBatches = isOwner() ? course.batches : course.batches.filter(b => b === myBatch);

    if (visibleBatches.length === 0) {
        row.style.display = "none";
        return;
    }

    row.style.display = "flex";
    tabs.innerHTML = visibleBatches.map(b => {
        const count = classesFor(course.id, b).length;
        const label = count === 0 ? `Batch ${b} · coming soon` : `Batch ${b} · ${count} classes`;
        return `<button class="batch-tab ${b === state.activeBatch ? 'active' : ''}"
                        onclick="switchBatch(${b})">${label}</button>`;
    }).join("");
}

function switchBatch(batch) {
    const myBatch = isOwner() ? batch : enrollmentBatch(state.activeCourseId);
    state.activeBatch = batch;

    renderBatchSwitcher();
    renderAccessStatusStrip();
    renderCurriculumAccordion();

    const list = classesFor(state.activeCourseId, batch);

    if (batch !== myBatch) {
        setPlayerSrc("");
        state.activeLessonId = null;
        document.getElementById("courseViewLessonTitle").textContent = `Batch ${batch}`;
        showLockOverlay(true, `You are enrolled in Batch ${myBatch}. Contact Neetu if you need access to Batch ${batch}.`);
        return;
    }

    if (list.length === 0) {
        setPlayerSrc("");
        state.activeLessonId = null;
        document.getElementById("courseViewLessonTitle").textContent = `Batch ${batch}`;
        showLockOverlay(true, `Classes for Batch ${batch} have not been uploaded yet.`);
        return;
    }

    const openable = list.filter(l => lessonAccess(l).unlocked);
    const target = openable.find(l => !state.completedLessons[l.id]) || openable[0] || list[0];
    loadLessonVideo(target.id);
}

function renderAccessStatusStrip() {
    const strip = document.getElementById("accessStatusStrip");
    if (!strip) return;

    const enrollment = state.enrollments[String(state.activeCourseId)];
    if (!enrollment) { strip.style.display = "none"; return; }

    if (enrollment.accessMode === 'drip') {
        const list = classesFor(state.activeCourseId, enrollmentBatch(state.activeCourseId));
        const nextLocked = list.find(l => !lessonAccess(l).unlocked);
        const openCount = list.filter(l => lessonAccess(l).unlocked).length;

        strip.style.display = "block";
        strip.innerHTML = `
            <i class="fa-solid fa-calendar-check"></i>
            <strong>${openCount} of ${list.length}</strong> classes unlocked so far
            (schedule started ${formatDate(new Date(enrollment.purchasedOn + "T00:00:00"))}).
            ${nextLocked ? `Next class unlocks on <strong>${formatDate(lessonAccess(nextLocked).unlockDate)}</strong>.` : `All classes are now open.`}
        `;
    } else {
        strip.style.display = "none";
    }
}

function toggleCurriculumAccordion() {
    const body = document.getElementById("curriculumListContainer");
    const chevron = document.getElementById("accordionChevron");
    if (body && chevron) {
        const hidden = body.style.display === "none";
        body.style.display = hidden ? "flex" : "none";
        chevron.className = hidden ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up";
    }
}

function renderCurriculumAccordion() {
    const container = document.getElementById("curriculumListContainer");
    if (!container) return;

    const list = classesFor(state.activeCourseId, state.activeBatch);
    const myBatch = enrollmentBatch(state.activeCourseId);
    const course = courses[state.activeCourseId];

    if (list.length === 0) {
        container.innerHTML = `<div style="font-size:11px; color:var(--color-text-muted); padding:14px; text-align:center;">
            No classes have been uploaded for this batch yet. They will appear here as soon as Neetu adds them.
        </div>`;
        return;
    }

    if (course.hasBatches && !isOwner() && state.activeBatch !== myBatch) {
        container.innerHTML = `<div style="font-size:11px; color:var(--color-text-muted); padding:14px; text-align:center;">
            You are enrolled in Batch ${myBatch}, so Batch ${state.activeBatch} classes are not available on your account.
        </div>`;
        return;
    }

    container.innerHTML = list.map(l => {
        const access = lessonAccess(l);
        const isChecked = state.completedLessons[l.id] === true;
        const isActive = state.activeLessonId === l.id;
        const noVideo = !l.youtubeEmbedId;

        if (!access.unlocked) {
            return `
            <div class="curriculum-lesson-item lesson-locked">
                <i class="fa-solid fa-lock" style="color:var(--color-text-muted); font-size:12px; width:16px; text-align:center;"></i>
                <div class="lesson-info-col">
                    <span class="lesson-name-text">Class ${l.order}: ${l.title}</span>
                    <span class="lesson-duration-badge">
                        <i class="fa-regular fa-calendar"></i>
                        ${access.unlockDate ? `Unlocks ${formatDate(access.unlockDate)}` : 'Not available on your plan'}
                    </span>
                </div>
            </div>`;
        }

        return `
        <div class="curriculum-lesson-item ${isActive ? 'active-playing' : ''}">
            <input type="checkbox" class="lesson-checkbox" ${isChecked ? 'checked' : ''} onchange="handleLessonCheckboxToggle(event, '${l.id}')">
            <div class="lesson-info-col" onclick="loadLessonVideo('${l.id}')">
                <span class="lesson-name-text">Class ${l.order}: ${l.title}</span>
                <span class="lesson-duration-badge">
                    <i class="fa-${noVideo ? 'solid fa-circle-exclamation' : 'solid fa-circle-play'}"></i>
                    ${noVideo ? 'Video coming soon' : 'Watch now'}
                </span>
            </div>
        </div>`;
    }).join("");
}

function setPlayerSrc(src) {
    const ytPlayer = document.getElementById("youtubePlayer");
    if (ytPlayer) ytPlayer.src = src;
}

function showLockOverlay(show, message) {
    const overlay = document.getElementById("videoLockOverlay");
    const msg = document.getElementById("videoLockMsg");
    if (!overlay) return;
    overlay.style.display = show ? "flex" : "none";
    if (msg && message) msg.textContent = message;
}


// Checks whether a video actually exists and is viewable. YouTube serves a
// thumbnail for public and unlisted videos, but 404s for private or deleted
// ones — so this tells us which of the two problems we are looking at.
function probeVideoAvailability(videoId) {
    const img = new Image();
    img.onerror = () => {
        if (state.activeLessonId && lessons[state.activeLessonId] &&
            lessons[state.activeLessonId].youtubeEmbedId === videoId) {
            setPlayerSrc("");
            showLockOverlay(true,
                "This video is set to Private on YouTube, or it has been deleted. " +
                "Open YouTube Studio and set it to Unlisted so students can watch it here.");
        }
    };
    img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function loadLessonVideo(lessonId) {
    const lesson = lessons[lessonId];
    if (!lesson) return;

    const access = lessonAccess(lesson);
    if (!access.unlocked) {
        showToast(access.unlockDate
            ? `This class unlocks on ${formatDate(access.unlockDate)}.`
            : "This class is not available on your account.", false);
        return;
    }

    state.activeLessonId = lessonId;
    document.getElementById("courseViewLessonTitle").textContent = `Class ${lesson.order}: ${lesson.title}`;

    if (lesson.youtubeEmbedId) {
        showLockOverlay(false);
        // playsinline + fs=1 so the player's own fullscreen button works on mobile too
        if (ytPlayer && ytPlayer.loadVideoById) {
            // Player already running — swap the video without rebuilding it
            ytPlayer.cueVideoById(lesson.youtubeEmbedId);
        } else {
            setPlayerSrc(`https://www.youtube.com/embed/${lesson.youtubeEmbedId}` +
                `?rel=0&modestbranding=1&playsinline=1&fs=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`);
            setTimeout(attachPlayer, 300);
        }
        probeVideoAvailability(lesson.youtubeEmbedId);
    } else {
        setPlayerSrc("");
        showLockOverlay(true, "The recording for this class has not been uploaded yet.");
    }

    const resPdf = document.getElementById("resPdfLabel");
    if (resPdf) resPdf.textContent = lesson.pdf || "No PDF available for this class";

    renderSavedNotes();
    renderCurriculumAccordion();
}

// ---- Fullscreen fix ------------------------------------------------------
// The old build put a fake controls bar on top of the iframe, which covered
// YouTube's own fullscreen button, and it asked the iframe itself to go
// fullscreen (unsupported on iOS). We now fullscreen the wrapper element and
// fall back to opening the video on YouTube if the browser refuses.
function toggleVideoFullscreen() {
    const container = document.getElementById("videoPlayerContainer");
    if (!container) return;

    const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

    if (fsElement) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        if (exit) exit.call(document);
        if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
        return;
    }

    const request = container.requestFullscreen
        || container.webkitRequestFullscreen
        || container.msRequestFullscreen;

    if (request) {
        const result = request.call(container);
        if (result && typeof result.catch === 'function') {
            result.catch(() => fallbackFullscreen());
        }
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock("landscape").catch(() => {});
        }
    } else {
        fallbackFullscreen();
    }
}

function fallbackFullscreen() {
    // iOS Safari blocks iframe fullscreen — open the video in YouTube instead
    showToast("Opening the video full screen in YouTube...", true);
    openLessonOnYouTube();
}

function openLessonOnYouTube() {
    const lesson = lessons[state.activeLessonId];
    if (!lesson || !lesson.youtubeEmbedId) {
        showToast("No video available for this class.", false);
        return;
    }
    window.open(`https://www.youtube.com/watch?v=${lesson.youtubeEmbedId}`, "_blank", "noopener");
}

function markCurrentLessonWatched() {
    if (!state.activeLessonId) return;
    state.completedLessons[state.activeLessonId] = true;
    saveProgress();
    showToast("Class marked as watched.");
    afterProgressChange();
}

function handleLessonCheckboxToggle(event, lessonId) {
    state.completedLessons[lessonId] = event.target.checked;
    saveProgress();
    afterProgressChange();
}

function afterProgressChange() {
    renderCurriculumAccordion();
    updateHomeProgressCard();
    renderOngoingCoursesFullPage();
    renderOngoingCoursesDashboard();
    renderContinueLearningHubList();
    checkCertificateThreshold();
}

function switchVideoTabs(tab) {
    const btnRes = document.getElementById("tabBtnResources");
    const btnNts = document.getElementById("tabBtnNotes");
    const panelRes = document.getElementById("videoResourcesPanel");
    const panelNts = document.getElementById("videoNotesPanel");

    if (tab === 'resources') {
        btnRes.classList.add("active");
        btnNts.classList.remove("active");
        panelRes.style.display = "block";
        panelNts.style.display = "none";
    } else {
        btnRes.classList.remove("active");
        btnNts.classList.add("active");
        panelRes.style.display = "none";
        panelNts.style.display = "block";
        renderSavedNotes();
    }
}

function savePersonalNote() {
    const input = document.getElementById("noteInput");
    const text = input.value.trim();
    if (!text || !state.activeLessonId) return;

    state.savedNotes.push({
        lessonId: state.activeLessonId,
        date: new Date().toLocaleDateString(),
        text: text
    });

    input.value = "";
    saveNotes();
    showToast("Note saved.");
    renderSavedNotes();
}

function renderSavedNotes() {
    const container = document.getElementById("notesFeedContainer");
    if (!container) return;

    const feed = state.savedNotes.filter(n => n.lessonId === state.activeLessonId);
    if (feed.length === 0) {
        container.innerHTML = `<div style="font-size: 10px; color:var(--color-text-muted); font-style:italic;">No notes for this class yet.</div>`;
        return;
    }

    container.innerHTML = feed.map(n => `
        <div class="saved-note-card">
            <div class="note-card-time"><i class="fa-regular fa-calendar"></i> ${n.date}</div>
            <div class="note-card-text">${n.text}</div>
        </div>
    `).join("");
}

// Certificates: Jyotish Bodh has certificate:false, so it never triggers.
function checkCertificateThreshold() {
    const overlay = document.getElementById("certificateOverlay");
    if (!overlay) return;

    const course = courses[state.activeCourseId];
    if (!course || !course.certificate) {
        overlay.style.display = "none";
        return;
    }

    if (calculateCourseProgress(state.activeCourseId) >= 100) {
        document.getElementById("certCourseTitle").textContent = course.title;
        document.getElementById("certStudentName").textContent = state.user ? state.user.name : "Student";
        overlay.style.display = "block";
        showToast("Congratulations! 🏆 Course completed.");
    } else {
        overlay.style.display = "none";
    }
}

function closeCertificateOverlay() {
    document.getElementById("certificateOverlay").style.display = "none";
}

function printCertificate() {
    window.print();
}


// ==========================================================================
// 13. MY COURSES SCREENS
// ==========================================================================
function renderOngoingCoursesDashboard() {
    const container = document.getElementById("ongoingPreviewContainer");
    if (!container) return;

    const enrolled = enrolledCourseIds();
    if (enrolled.length === 0) {
        container.innerHTML = `<div style="font-size:11px; text-align:center; padding:10px; color:var(--color-text-muted);">No courses on your account yet.</div>`;
        return;
    }

    container.innerHTML = enrolled.map(cid => {
        const c = courses[cid];
        const progress = calculateCourseProgress(cid);
        const next = nextClassFor(cid);
        const batch = enrollmentBatch(cid);

        return `
        <div class="ongoing-horizontal-card" onclick="openCourseView(${c.id})">
            <div class="ongoing-card-symbol">${c.symbol}</div>
            <div style="flex:1;">
                <h5 class="ongoing-card-title">${c.title}</h5>
                <span style="font-size:10px; color:var(--color-text-muted); display:block; margin:2px 0;">
                    Guru: ${c.instructor}${batch ? ` • Batch ${batch}` : ''} • ${next ? `Next: Class ${next.order}` : 'All classes watched'}
                </span>
                <div class="ongoing-bar-grp">
                    <div class="ongoing-bar-timeline"><div class="fill" style="width: ${progress}%;"></div></div>
                    <span class="ongoing-percent">${progress}%</span>
                </div>
            </div>
            <button class="ongoing-continue-btn"><i class="fa-solid fa-play"></i></button>
        </div>`;
    }).join("");
}

function renderOngoingCoursesFullPage() {
    const listContainer = document.getElementById("ongoingFullList");
    if (!listContainer) return;

    let ids = enrolledCourseIds().filter(cid => {
        const progress = calculateCourseProgress(cid);
        if (state.ongoingFilter === 'All') return true;
        if (state.ongoingFilter === 'Completed') return progress === 100;
        if (state.ongoingFilter === 'InProgress') return progress < 100;
        return true;
    });

    ids.sort((a, b) => {
        if (state.ongoingSort === 'HighestProgress') return calculateCourseProgress(b) - calculateCourseProgress(a);
        if (state.ongoingSort === 'Alphabetical') return courses[a].title.localeCompare(courses[b].title);
        return (state.lastAccessed[b] || "").localeCompare(state.lastAccessed[a] || "");
    });

    if (ids.length === 0) {
        listContainer.innerHTML = `<div style="text-align:center; padding: 40px 20px; font-size:12px; color:var(--color-text-muted);">No courses match this filter.</div>`;
        return;
    }

    listContainer.innerHTML = ids.map(cid => {
        const c = courses[cid];
        const progress = calculateCourseProgress(cid);
        const batch = enrollmentBatch(cid);
        const enrollment = state.enrollments[String(cid)];
        const lastSeen = state.lastAccessed[cid];

        return `
        <div class="course-card">
            <div class="course-image-wrapper" style="height:100px;">
                <div class="course-symbol-icon" style="font-size:36px;">${c.symbol}</div>
                <span class="course-tag">${c.category}</span>
                <span class="course-level-badge level-${c.level.toLowerCase()}">${c.level}</span>
            </div>
            <div class="course-body">
                <span class="course-instructor">Instructor: ${c.instructor}${batch ? ` • Batch ${batch}` : ''}</span>
                <h4 class="course-card-title" style="font-family:var(--font-serif); font-weight:800; font-size:14px;">${c.title}</h4>
                <div class="ongoing-bar-grp" style="margin: 4px 0 8px 0;">
                    <div class="ongoing-bar-timeline" style="height:6px;"><div class="fill" style="width: ${progress}%;"></div></div>
                    <span class="ongoing-percent" style="font-size:10px;">${progress}%</span>
                </div>
                <div style="font-size:10px; color:var(--color-text-muted); display:flex; justify-content:space-between; align-items:center;">
                    <span>${lastSeen ? 'Last opened: ' + new Date(lastSeen).toLocaleDateString() : 'Not opened yet'}</span>
                    <span>${enrollment.accessMode === 'drip' ? 'Scheduled access' : 'Full access'}</span>
                </div>
                <div class="course-meta-footer" style="margin-top:8px; padding-top:8px;">
                    <span class="course-price-label" style="font-size:12px;">Enrolled</span>
                    <button class="enroll-action-btn" onclick="openCourseView(${c.id})" style="background: var(--color-primary); padding: 6px 12px; font-size:10px;">
                        Continue <i class="fa-solid fa-arrow-right" style="margin-left:4px;"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }).join("");
}

function switchLearningHubTab(tabName) {
    ['Continue', 'Ongoing'].forEach(t => {
        const tabBtn = document.getElementById(`hubTab-${t}`);
        const panel = document.getElementById(`hubPanel-${t}`);
        if (tabBtn) tabBtn.classList.remove('active');
        if (panel) panel.classList.remove('active');
    });

    const activeBtn = document.getElementById(`hubTab-${tabName}`);
    const activePanel = document.getElementById(`hubPanel-${tabName}`);
    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) activePanel.classList.add('active');

    if (tabName === 'Continue') renderContinueLearningHubList();
    if (tabName === 'Ongoing') renderOngoingCoursesFullPage();
}

function renderContinueLearningHubList() {
    const container = document.getElementById("learningHubContinueList");
    if (!container) return;

    const inProgress = enrolledCourseIds().filter(cid => calculateCourseProgress(cid) < 100);

    if (inProgress.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px 20px; font-size:14px; color:var(--color-text-muted);">Nothing in progress right now.</div>`;
        return;
    }

    container.innerHTML = inProgress.map(cid => {
        const c = courses[cid];
        const progress = calculateCourseProgress(cid);
        const next = nextClassFor(cid);

        return `
        <div class="progress-card" onclick="openCourseView(${c.id})" style="margin-bottom: 4px;">
            <div class="progress-header">
                <div>
                    <span class="progress-subject">${c.category}</span>
                    <h4 class="progress-title"><span style="margin-right:6px;">${c.symbol}</span>${c.title}</h4>
                </div>
                <span class="progress-percent-label">${progress}%</span>
            </div>
            <div class="progress-lesson-hint">${next ? `Next Up: Class ${next.order} — ${next.title}` : 'All uploaded classes watched'}</div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
            </div>
        </div>`;
    }).join("");
}

function handleOngoingFilterChange(filterVal) {
    state.ongoingFilter = filterVal;
    ['All', 'InProgress', 'Completed'].forEach(f => {
        const btn = document.getElementById(`ongoingPill-${f}`);
        if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`ongoingPill-${filterVal}`);
    if (activeBtn) activeBtn.classList.add('active');
    renderOngoingCoursesFullPage();
}

function handleOngoingSortChange() {
    const sel = document.getElementById("ongoingSortSelector");
    if (sel) {
        state.ongoingSort = sel.value;
        renderOngoingCoursesFullPage();
    }
}


// ==========================================================================
// 14. PROFILE
// ==========================================================================
function renderProfileView() {
    if (!state.user) return;

    const initials = state.user.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
    document.getElementById("profAvatarInitials").textContent = initials;
    document.getElementById("profStudentName").textContent = state.user.name;
    document.getElementById("profStudentRole").textContent = state.user.isAdmin ? "Administrator" : "Enrolled Student";
    document.getElementById("profEmail").textContent = state.user.email;

    const enrolled = enrolledCourseIds();
    const watched = Object.values(state.completedLessons).filter(Boolean).length;

    document.getElementById("profPurchasedCount").textContent = enrolled.length;
    document.getElementById("profClassesDone").textContent = watched;
    document.getElementById("profNotesCount").textContent = state.savedNotes.length;

    const accessBox = document.getElementById("profAccessContainer");
    if (!accessBox) return;

    if (enrolled.length === 0) {
        accessBox.innerHTML = `<div class="wishlist-empty-tag">No course access on this account.</div>`;
        return;
    }

    accessBox.innerHTML = enrolled.map(cid => {
        const c = courses[cid];
        const e = state.enrollments[String(cid)];
        const batch = enrollmentBatch(cid);
        const total = classesFor(cid, batch).length;
        const open = unlockedClassesFor(cid, batch).length;

        return `
        <div style="padding: 8px 0; border-bottom: 1px dashed var(--color-border);">
            <div style="font-size:11px; font-weight:700;">${c.symbol} ${c.title}${batch ? ` — Batch ${batch}` : ''}</div>
            <div style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">
                Purchased ${formatDate(new Date(e.purchasedOn + "T00:00:00"))} •
                ${e.accessMode === 'drip' ? `Scheduled access — ${open} of ${total} classes unlocked` : `Full access — ${total} classes`}
            </div>
        </div>`;
    }).join("");
}


// ==========================================================================
// 15. ADMIN PANEL (owner only) — live student analytics from the server
// ==========================================================================
let adminData = { students: {}, progress: {} };

async function renderAdminDashboard() {
    try {
        adminData = await apiGet('/api/admin/data');
    } catch (e) {
        showToast("Could not load student data from the server.", false);
        return;
    }

    const emails = Object.keys(adminData.students);
    let enrollmentCount = 0;
    let totalSeconds = 0;

    emails.forEach(email => {
        enrollmentCount += Object.keys(adminData.students[email].enrollments || {}).length;
        const p = adminData.progress[email];
        if (p) totalSeconds += totalWatchSeconds(p.watch);
    });

    document.getElementById("adminStudents").textContent = emails.length;
    document.getElementById("adminEnrollments").textContent = enrollmentCount;
    document.getElementById("adminWatchHours").textContent = (totalSeconds / 3600).toFixed(1);

    adminOnCourseChange();
    adminOnClassCourseChange();
    renderAdminAnalytics();
    renderAdminClassLibrary();
}

// Works out where one student stands on one course
function studentCourseStats(email, courseId, enrollment) {
    const course = courses[courseId];
    const batch = course.hasBatches ? (enrollment.batch || 1) : null;
    const classList = classesFor(Number(courseId), batch);
    const record = adminData.progress[email] || { completed: {}, watch: {} };

    const ids = classList.map(l => l.id);
    const done = ids.filter(id => record.completed && record.completed[id]).length;
    const total = classList.length;
    const remaining = total - done;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const seconds = totalWatchSeconds(record.watch, ids);

    // How many classes they are allowed to see today (matters on Scheduled access)
    let unlocked = total;
    if (enrollment.accessMode === 'drip') {
        const now = new Date();
        unlocked = classList.filter(l => now >= addDays(enrollment.purchasedOn, (l.order - 1) * DRIP_INTERVAL_DAYS)).length;
    }

    return { batch, total, done, remaining, percent, seconds, unlocked };
}

function renderAdminAnalytics() {
    const container = document.getElementById("adminAnalyticsContainer");
    if (!container) return;

    const emails = Object.keys(adminData.students);
    if (emails.length === 0) {
        container.innerHTML = `<div style="font-size:11px; color:var(--color-text-muted); padding:10px 0;">No students yet.</div>`;
        return;
    }

    container.innerHTML = emails.map(email => {
        const student = adminData.students[email];
        const record = adminData.progress[email] || {};
        const enrollments = student.enrollments || {};
        const allSeconds = totalWatchSeconds(record.watch);

        const lastActive = record.lastActive
            ? new Date(record.lastActive).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
            : 'Never signed in';

        const courseRows = Object.keys(enrollments).map(cid => {
            const c = courses[cid];
            if (!c) return "";
            const e = enrollments[cid];
            const s = studentCourseStats(email, cid, e);

            return `
            <div class="analytics-course-row">
                <div class="acr-head">
                    <span class="acr-title">${c.symbol} ${c.title.split("(")[0].trim()}${s.batch ? ` · Batch ${s.batch}` : ''}</span>
                    <span class="acr-percent">${s.percent}%</span>
                </div>
                <div class="ongoing-bar-timeline" style="height:6px; margin:4px 0;">
                    <div class="fill" style="width:${s.percent}%;"></div>
                </div>
                <div class="acr-stats">
                    <span><i class="fa-solid fa-circle-check"></i> ${s.done} of ${s.total} done</span>
                    <span><i class="fa-regular fa-hourglass"></i> ${s.remaining} left</span>
                    <span><i class="fa-solid fa-clock"></i> ${formatDuration(s.seconds)} watched</span>
                </div>
                <div class="acr-access">
                    ${e.accessMode === 'drip'
                        ? `Scheduled · ${s.unlocked} of ${s.total} classes unlocked so far`
                        : `Full access`} · bought ${e.purchasedOn}
                    <button class="acr-remove" onclick="adminRemoveEnrollment('${email}', '${cid}')" title="Remove this course">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>`;
        }).join("");

        return `
        <div class="analytics-student-card">
            <div class="asc-head">
                <div>
                    <span class="asc-name">${student.name || 'Student'}</span>
                    <span class="asc-email">${email}</span>
                </div>
                <div style="display:flex; gap:5px; flex-shrink:0;">
                    <button class="save-note-btn" onclick="adminResetPassword('${email}')"
                            style="background:var(--bg-app); border:1px solid var(--color-border); color:var(--color-text); padding:4px 8px; font-size:9px;"
                            title="Let them choose a new password">
                        <i class="fa-solid fa-key"></i> Reset password
                    </button>
                    <button class="save-note-btn" onclick="adminRemoveStudent('${email}')"
                            style="background:var(--color-error); padding:4px 8px; font-size:9px;">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div class="asc-meta">
                <span><i class="fa-solid fa-stopwatch"></i> <strong>${formatDuration(allSeconds)}</strong> total watch time</span>
                <span><i class="fa-regular fa-clock"></i> Last active: ${lastActive}</span>
                <span><i class="fa-solid fa-lock"></i> ${student.hasPassword ? 'Password set' : 'No password yet'}</span>
            </div>
            ${courseRows || `<div style="font-size:10px; color:var(--color-text-muted);">No course access assigned.</div>`}
        </div>`;
    }).join("");
}

function adminOnCourseChange() {
    const courseId = document.getElementById("asCourse").value;
    const batchField = document.getElementById("asBatchField");
    if (batchField) batchField.style.display = courses[courseId].hasBatches ? "block" : "none";
}

function adminOnClassCourseChange() {
    const courseId = document.getElementById("acCourse").value;
    const batchField = document.getElementById("acBatchField");
    if (batchField) batchField.style.display = courses[courseId].hasBatches ? "block" : "none";
}

async function adminSaveStudentAccess(event) {
    event.preventDefault();

    const payload = {
        email: normaliseEmail(document.getElementById("asEmail").value),
        name: document.getElementById("asName").value.trim(),
        courseId: document.getElementById("asCourse").value,
        batch: courses[document.getElementById("asCourse").value].hasBatches
            ? document.getElementById("asBatch").value : null,
        purchasedOn: document.getElementById("asPurchaseDate").value,
        accessMode: document.getElementById("asAccessMode").value
    };

    try {
        await api('/api/admin/student', payload);
        document.getElementById("adminAccessForm").reset();
        adminOnCourseChange();
        showToast(`Access saved for ${payload.email}.`);
        renderAdminDashboard();
    } catch (e) {
        showToast(e.message, false);
    }
}

async function adminRemoveEnrollment(email, courseId) {
    if (!confirm(`Remove access to "${courses[courseId].title}" for ${email}?`)) return;
    try {
        await api('/api/admin/student/remove', { email, courseId });
        showToast("Enrollment removed.", false);
        renderAdminDashboard();
    } catch (e) { showToast(e.message, false); }
}

async function adminResetPassword(email) {
    if (!confirm(`Reset the password for ${email}? They will be signed out and will choose a new one next time they sign in.`)) return;
    try {
        await api('/api/admin/student/reset-password', { email });
        showToast(`${email} can now set a new password.`);
        renderAdminDashboard();
    } catch (e) { showToast(e.message, false); }
}

async function adminRemoveStudent(email) {
    if (!confirm(`Remove ${email} completely? They will be signed out and can no longer log in.`)) return;
    try {
        await api('/api/admin/student/remove', { email });
        showToast("Student removed.", false);
        renderAdminDashboard();
    } catch (e) { showToast(e.message, false); }
}

function renderAdminClassLibrary() {
    const container = document.getElementById("adminClassLibrary");
    if (!container) return;

    let html = "";
    Object.values(courses).forEach(c => {
        (c.hasBatches ? c.batches : [null]).forEach(b => {
            const list = classesFor(c.id, b);
            html += `
            <div class="roster-row" style="align-items:center;">
                <div style="flex:1;">
                    <span class="roster-name" style="display:block;">${c.title.split("(")[0].trim()}${b ? ` — Batch ${b}` : ''}</span>
                    <span style="font-size:9px; color:var(--color-text-muted);">
                        ${list.length} class${list.length === 1 ? '' : 'es'} uploaded${list.length === 0 ? ' — nothing here yet' : ''}
                    </span>
                </div>
            </div>`;
        });
    });
    container.innerHTML = html;
}

function extractYouTubeId(input) {
    const val = (input || "").trim();
    if (!val) return null;
    const patterns = [
        /youtu\.be\/([A-Za-z0-9_-]{6,})/,
        /[?&]v=([A-Za-z0-9_-]{6,})/,
        /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/
    ];
    for (const p of patterns) {
        const m = val.match(p);
        if (m) return m[1];
    }
    return /^[A-Za-z0-9_-]{6,}$/.test(val) ? val : null;
}

async function adminAddClass(event) {
    event.preventDefault();

    const courseId = parseInt(document.getElementById("acCourse").value, 10);
    const course = courses[courseId];
    const batch = course.hasBatches ? parseInt(document.getElementById("acBatch").value, 10) : null;
    const topic = document.getElementById("acTopic").value.trim();
    const videoId = extractYouTubeId(document.getElementById("acVideo").value);

    if (!topic) return;

    const order = classesFor(courseId, batch).length + 1;
    const id = course.hasBatches ? `${courseId}b${batch}.${order}` : `${courseId}.${order}`;
    const lesson = { id, courseId, batch, order, title: topic, youtubeEmbedId: videoId };

    try {
        await api('/api/admin/class', { lesson });
        lessons[id] = lesson;
        document.getElementById("adminClassForm").reset();
        adminOnClassCourseChange();
        showToast(`Class ${order} added to ${course.title.split("(")[0].trim()}${batch ? ` Batch ${batch}` : ''}.`);
        renderAdminDashboard();
    } catch (e) {
        showToast(e.message, false);
    }
}

function adminBroadcastAlert() {
    const input = document.getElementById("adminNotificationText");
    const text = input.value.trim();
    if (!text) return;

    state.notifications.push({
        id: state.notifications.length + 1,
        title: "Announcement",
        text: text,
        date: new Date().toISOString().split('T')[0]
    });

    input.value = "";
    updateNotificationsBell();
    showToast("Notification broadcast.");
}


// ==========================================================================
// 16. ASTROLOGY TOOLS
// ==========================================================================
function openToolsTabDirect() {
    switchNavTab('Tools');
}

function switchAstroTool(tool) {
    const map = { kundali: 'Kundali', numerology: 'Numerology', navatara: 'Navatara' };
    Object.keys(map).forEach(key => {
        const btn = document.getElementById(`tabBtn${map[key]}`);
        const panel = document.getElementById(`panel${map[key]}`);
        if (btn) btn.classList.toggle('active', key === tool);
        if (panel) panel.classList.toggle('active', key === tool);
    });
}

function calculateNavatara() {
    const dropdown = document.getElementById("nakshatraDropdown");
    const container = document.getElementById("navataraGrid");
    if (!dropdown || !container) return;

    const birthIndex = nakshatras.indexOf(dropdown.value);

    const taraClasses = [
        { name: "Janma (Birth)", nature: "Malefic", class: "tara-malefic" },
        { name: "Sampat (Wealth)", nature: "Benefic", class: "tara-benefic" },
        { name: "Vipat (Danger)", nature: "Malefic", class: "tara-malefic" },
        { name: "Kshema (Safety)", nature: "Benefic", class: "tara-benefic" },
        { name: "Pratyak (Obstacles)", nature: "Malefic", class: "tara-malefic" },
        { name: "Sadhaka (Success)", nature: "Benefic", class: "tara-benefic" },
        { name: "Naidhana (Death)", nature: "Malefic", class: "tara-malefic" },
        { name: "Mitra (Friend)", nature: "Benefic", class: "tara-benefic" },
        { name: "Param Mitra (Best Friend)", nature: "Benefic", class: "tara-benefic" }
    ];

    let html = "";
    for (let i = 0; i < 9; i++) {
        const targetNak = nakshatras[(birthIndex + i) % 27];
        const tClass = taraClasses[i];
        html += `
        <div class="navatara-cell">
            <span class="nv-index">Tara ${i + 1}</span>
            <span class="nv-tara-name">${tClass.name.split(" ")[0]}</span>
            <span class="nv-nakshatra">${targetNak}</span>
            <span class="tara-badge ${tClass.class}" style="margin-top:4px; font-size:8px;">${tClass.nature}</span>
        </div>`;
    }
    container.innerHTML = html;
}

const RASHIS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const PLANETS = ["Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "Ra", "Ke"];
const PLANET_FULL_NAMES = { Su: "Sun", Mo: "Moon", Ma: "Mars", Me: "Mercury", Ju: "Jupiter", Ve: "Venus", Sa: "Saturn", Ra: "Rahu", Ke: "Ketu" };
const DIGNITIES = ["Exalted", "Own Sign", "Friendly", "Neutral", "Debilitated"];

function hashSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function generateKundali(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("kName").value.trim() || "Student";
    const dob = document.getElementById("kDob").value;
    const tob = document.getElementById("kTob").value;
    const pob = document.getElementById("kPob").value;

    if (!dob || !tob) {
        showToast("Please fill in date and time of birth", false);
        return;
    }

    const seed = hashSeed(`${name}|${dob}|${tob}|${pob}`);
    const lagnaIndex = seed % 12;

    const houseAssignments = {};
    for (let i = 1; i <= 12; i++) houseAssignments[i] = [];

    const chartRows = PLANETS.map((p, i) => {
        const houseOffset = (seed >>> (i + 1)) % 12;
        const house = ((lagnaIndex + houseOffset) % 12) + 1;
        const degree = ((seed >>> i) * (i + 3)) % 30;
        const rashi = RASHIS[(lagnaIndex + houseOffset) % 12];
        const nakshatra = nakshatras[(seed + i * 7) % 27];
        const dignity = DIGNITIES[(seed + i) % DIGNITIES.length];

        houseAssignments[house].push(p);
        return { planet: PLANET_FULL_NAMES[p], degree, rashi, nakshatra, dignity };
    });

    for (let h = 1; h <= 12; h++) {
        const cell = document.getElementById(`kPlanetH${h}`);
        if (!cell) continue;
        const planetsHere = houseAssignments[h].join(", ");
        cell.textContent = h === 1 ? `Lagna${planetsHere ? ", " + planetsHere : ""}` : (planetsHere || "-");
    }

    const tbody = document.getElementById("kundaliTableBody");
    if (tbody) {
        tbody.innerHTML = chartRows.map(r => `
            <tr>
                <td>${r.planet}</td>
                <td>${r.degree}°</td>
                <td>${r.rashi}</td>
                <td>${r.nakshatra}</td>
                <td>${r.dignity}</td>
            </tr>
        `).join("");
    }

    const predictionEl = document.getElementById("kundaliPredictionText");
    if (predictionEl) {
        predictionEl.textContent = `${name}'s Lagna is ${RASHIS[lagnaIndex]}. Based on the placements above, this chart shows a distinct blend of influences across career, relationships and personal growth. Refer to the ledger for planet-wise positions and dignities.`;
    }

    state.lastKundaliChart = { name, dob, tob, pob, chartRows };
    showToast("Kundali chart generated!");
}

function exportKundaliReport() {
    const name = (document.getElementById("kName").value || "").trim() || "Student";
    const predictionText = document.getElementById("kundaliPredictionText").textContent;
    const tableHtml = document.getElementById("kundaliTableBody").innerHTML;

    if (!tableHtml.trim()) {
        showToast("Please generate a birth chart first", false);
        return;
    }

    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) {
        showToast("Please allow popups to export the PDF", false);
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kundali Report - ${name}</title>
            <style>
                body { font-family: Georgia, serif; padding: 32px; color: #222; }
                h1 { color: #4A154B; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                th, td { border: 1px solid #ccc; padding: 8px 10px; text-align: left; font-size: 13px; }
                th { background: #4A154B; color: #fff; }
                .prediction { margin-top: 20px; line-height: 1.6; }
            </style>
        </head>
        <body>
            <h1>Astro by Neetu &mdash; Kundali Report</h1>
            <p><strong>Name:</strong> ${name}</p>
            <table>
                <thead>
                    <tr><th>Planet</th><th>Degree</th><th>Rashi</th><th>Nakshatra</th><th>Dignity</th></tr>
                </thead>
                <tbody>${tableHtml}</tbody>
            </table>
            <div class="prediction"><strong>Predictions:</strong><br>${predictionText}</div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => { printWindow.focus(); printWindow.print(); };
}

// ---- Numerology ----------------------------------------------------------
const NUM_MEANINGS = {
    1: { name: "The Leader", desc: "Independent, pioneering and self-driven. You take initiative and prefer to lead rather than follow." },
    2: { name: "The Diplomat", desc: "Sensitive, cooperative and intuitive. You work best in partnership and value harmony." },
    3: { name: "The Communicator", desc: "Expressive, creative and social. You uplift people through words, art and optimism." },
    4: { name: "The Architect", desc: "Stable, hardworking and disciplined. You build firm foundations and value security and order." },
    5: { name: "The Freedom Lover", desc: "Adventurous, adaptable and curious. You need variety, movement and change to feel alive." },
    6: { name: "The Caregiver", desc: "Responsible, nurturing and family-oriented. You carry the weight of those you love." },
    7: { name: "The Seeker", desc: "Analytical, spiritual and introspective. You are drawn to research, mysticism and solitude." },
    8: { name: "The Executive", desc: "Ambitious, practical and authoritative. You are built for management, money and material achievement." },
    9: { name: "The Humanitarian", desc: "Compassionate, idealistic and generous. You are here to serve a larger cause." },
    11: { name: "Master Intuitive", desc: "Highly intuitive and inspirational. A spiritual messenger with heightened sensitivity." },
    22: { name: "Master Builder", desc: "Visionary with practical ability. Capable of turning big dreams into concrete reality." },
    33: { name: "Master Teacher", desc: "Selfless and deeply compassionate. Devoted to healing and uplifting others." }
};

const LETTER_VALUES = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8 };
const VOWELS = "aeiou";

function reduceNumber(n) {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = String(n).split("").reduce((sum, d) => sum + parseInt(d, 10), 0);
    }
    return n;
}

function calculateNumerology(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("numName").value.trim();
    const dob = document.getElementById("numDob").value;

    if (!name || !dob) {
        showToast("Please enter a name and date of birth", false);
        return;
    }

    const digits = dob.replace(/-/g, "").split("").reduce((s, d) => s + parseInt(d, 10), 0);
    const lifePath = reduceNumber(digits);

    const letters = name.toLowerCase().replace(/[^a-z]/g, "").split("");
    const destiny = reduceNumber(letters.reduce((s, ch) => s + (LETTER_VALUES[ch] || 0), 0));
    const soul = reduceNumber(letters.filter(ch => VOWELS.includes(ch)).reduce((s, ch) => s + (LETTER_VALUES[ch] || 0), 0));
    const personality = reduceNumber(letters.filter(ch => !VOWELS.includes(ch)).reduce((s, ch) => s + (LETTER_VALUES[ch] || 0), 0));

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set("numValLifePath", lifePath);
    set("numLifePathName", (NUM_MEANINGS[lifePath] || {}).name || "-");
    set("numValDestiny", destiny);
    set("numDestinyName", (NUM_MEANINGS[destiny] || {}).name || "-");
    set("numValPersonality", personality);
    set("numPersonalityName", (NUM_MEANINGS[personality] || {}).name || "-");
    set("numValSoul", soul);
    set("numSoulName", (NUM_MEANINGS[soul] || {}).name || "-");

    set("numInterpretationTitle", `Life Path ${lifePath} — ${(NUM_MEANINGS[lifePath] || {}).name || ''}`);
    set("numInterpretationDesc", (NUM_MEANINGS[lifePath] || {}).desc || "");

    showToast("Core numbers calculated!");
}


// ==========================================================================
// 17. PDF VIEWER
// ==========================================================================
function triggerResourceDownload() {
    const lesson = lessons[state.activeLessonId];
    if (lesson && lesson.pdfUrl) {
        openPdfModal(lesson.pdfUrl);
    } else {
        showToast("No PDF available for this class", false);
    }
}

function openPdfModal(pdfUrl) {
    document.getElementById("pdfModalFrame").src = pdfUrl;
    document.getElementById("pdfModal").style.display = "block";
}

function closePdfModal() {
    document.getElementById("pdfModal").style.display = "none";
    document.getElementById("pdfModalFrame").src = "";
}
