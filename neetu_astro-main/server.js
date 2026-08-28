// ==========================================================================
// ASTRO BY NEETU — SERVER
//
// This is now more than a static file server. It holds the student list and
// everyone's progress in data/store.json, which is what makes the admin
// analytics possible: progress used to live in each student's own browser,
// so there was no way for the admin to ever see it.
// ==========================================================================

const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// ##########################################################################
// ###  ADMIN LOGIN — CHANGE THE PASSCODE BEFORE GOING LIVE                ###
// ##########################################################################
const ADMIN_EMAIL = 'neetu.singhal@nokia.com';
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'ChangeThisPasscode123';
// ##########################################################################

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Students who have already paid. Anyone else must be added from the panel.
const SEED = {
    students: {
        'netrachandra09@gmail.com': {
            name: 'Netra Chandra',
            enrollments: {
                '1': { purchasedOn: '2026-08-01', accessMode: 'full', batch: null },
                '2': { purchasedOn: '2026-08-01', accessMode: 'full', batch: 1 }
            }
        },
        'rinkumfa@gmail.com': {
            name: 'Rinku',
            enrollments: {
                '1': { purchasedOn: '2026-08-01', accessMode: 'full', batch: null },
                '2': { purchasedOn: '2026-08-01', accessMode: 'full', batch: 1 }
            }
        }
    },
    // email -> { completed: {lessonId:true}, watch: {lessonId:seconds},
    //            lastActive: ISO string, firstSeen: ISO string }
    progress: {},
    // Classes added through the admin panel
    customLessons: {},
    // token -> { email, isAdmin }
    tokens: {}
};

// ---------------------------------------------------------------- storage
function readStore() {
    try {
        if (!fs.existsSync(DATA_FILE)) return JSON.parse(JSON.stringify(SEED));
        const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        return Object.assign(JSON.parse(JSON.stringify(SEED)), parsed);
    } catch (e) {
        console.error('Could not read store.json, falling back to seed data:', e.message);
        return JSON.parse(JSON.stringify(SEED));
    }
}

function writeStore(store) {
    try {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
        return true;
    } catch (e) {
        console.error('Could not write store.json:', e.message);
        return false;
    }
}

const lower = (s) => String(s || '').trim().toLowerCase();
const isAdminEmail = (e) => lower(e) === lower(ADMIN_EMAIL);

function authenticate(req) {
    const token = req.headers['x-auth-token'] || (req.body && req.body.token);
    if (!token) return null;
    const store = readStore();
    const session = store.tokens[token];
    return session ? Object.assign({ token }, session) : null;
}

function requireAdmin(req, res) {
    const session = authenticate(req);
    if (!session || !session.isAdmin) {
        res.status(403).json({ error: 'Admin access required.' });
        return null;
    }
    return session;
}

// ---------------------------------------------------------------- headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com www.youtube.com s.ytimg.com; " +
        "connect-src 'self'; " +
        "frame-src 'self' www.youtube.com www.youtube-nocookie.com; " +
        "style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com fonts.googleapis.com; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' cdnjs.cloudflare.com fonts.gstatic.com"
    );
    next();
});

app.use(express.json({ limit: '1mb' }));

// ---------------------------------------------------------------- API
// Lets the login page confirm it is talking to the real backend
app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        adminEmail: ADMIN_EMAIL,
        usingDefaultPasscode: ADMIN_PASSCODE === 'ChangeThisPasscode123'
    });
});

// Sign in. The student list stays on the server, so it is never shipped to
// the browser where anyone could read it.
app.post('/api/login', (req, res) => {
    const email = lower(req.body.email);
    const store = readStore();

    if (!email) return res.status(400).json({ error: 'Email is required.' });

    let user;
    if (isAdminEmail(email)) {
        if (req.body.passcode !== ADMIN_PASSCODE) {
            return res.status(401).json({ error: 'Incorrect admin passcode.' });
        }
        user = { email, name: 'Neetu (Admin)', isAdmin: true };
    } else {
        const student = store.students[email];
        if (!student) {
            return res.status(401).json({
                error: 'This email is not registered for any course. If you have purchased the course, please contact Neetu to get access.'
            });
        }
        user = { email, name: student.name || 'Student', isAdmin: false };
    }

    const token = crypto.randomBytes(24).toString('hex');
    store.tokens[token] = { email, isAdmin: !!user.isAdmin };

    if (!user.isAdmin) {
        if (!store.progress[email]) {
            store.progress[email] = { completed: {}, watch: {}, firstSeen: new Date().toISOString() };
        }
        store.progress[email].lastActive = new Date().toISOString();
    }
    writeStore(store);

    res.json({
        token,
        user,
        enrollments: user.isAdmin ? {} : (store.students[email].enrollments || {}),
        progress: user.isAdmin ? { completed: {}, watch: {} } : store.progress[email],
        customLessons: store.customLessons || {}
    });
});

// Confirm a saved token is still valid (and that the student still has access)
app.post('/api/session', (req, res) => {
    const session = authenticate(req);
    if (!session) return res.status(401).json({ error: 'Session expired.' });

    const store = readStore();
    const email = session.email;

    if (session.isAdmin) {
        return res.json({
            user: { email, name: 'Neetu (Admin)', isAdmin: true },
            enrollments: {}, progress: { completed: {}, watch: {} },
            customLessons: store.customLessons || {}
        });
    }

    const student = store.students[email];
    if (!student) return res.status(401).json({ error: 'Access removed.' });

    res.json({
        user: { email, name: student.name || 'Student', isAdmin: false },
        enrollments: student.enrollments || {},
        progress: store.progress[email] || { completed: {}, watch: {} },
        customLessons: store.customLessons || {}
    });
});

app.post('/api/logout', (req, res) => {
    const session = authenticate(req);
    if (session) {
        const store = readStore();
        delete store.tokens[session.token];
        writeStore(store);
    }
    res.json({ ok: true });
});

// Students push their progress and accumulated watch seconds here.
app.post('/api/progress', (req, res) => {
    const session = authenticate(req);
    if (!session) return res.status(401).json({ error: 'Not signed in.' });
    if (session.isAdmin) return res.json({ ok: true });

    const store = readStore();
    const email = session.email;
    const record = store.progress[email] || { completed: {}, watch: {}, firstSeen: new Date().toISOString() };

    if (req.body.completed && typeof req.body.completed === 'object') {
        record.completed = req.body.completed;
    }
    // Watch seconds only ever accumulate, so a stale tab can't wipe them
    if (req.body.watch && typeof req.body.watch === 'object') {
        Object.keys(req.body.watch).forEach(lessonId => {
            const incoming = Number(req.body.watch[lessonId]) || 0;
            record.watch[lessonId] = Math.max(Number(record.watch[lessonId]) || 0, incoming);
        });
    }
    record.lastActive = new Date().toISOString();

    store.progress[email] = record;
    writeStore(store);
    res.json({ ok: true });
});

// ---------------------------------------------------------------- admin API
app.get('/api/admin/data', (req, res) => {
    if (!requireAdmin(req, res)) return;
    const store = readStore();
    res.json({ students: store.students, progress: store.progress, customLessons: store.customLessons });
});

app.post('/api/admin/student', (req, res) => {
    if (!requireAdmin(req, res)) return;

    const email = lower(req.body.email);
    const { name, courseId, batch, purchasedOn, accessMode } = req.body;

    if (!email || !courseId || !purchasedOn) {
        return res.status(400).json({ error: 'Email, course and purchase date are required.' });
    }
    if (isAdminEmail(email)) {
        return res.status(400).json({ error: 'That is the admin account and cannot be added as a student.' });
    }

    const store = readStore();
    if (!store.students[email]) store.students[email] = { name: name || 'Student', enrollments: {} };
    if (name) store.students[email].name = name;
    store.students[email].enrollments[String(courseId)] = {
        purchasedOn,
        accessMode: accessMode === 'drip' ? 'drip' : 'full',
        batch: batch ? Number(batch) : null
    };
    if (!store.progress[email]) {
        store.progress[email] = { completed: {}, watch: {}, firstSeen: new Date().toISOString() };
    }

    writeStore(store);
    res.json({ ok: true, students: store.students, progress: store.progress });
});

app.post('/api/admin/student/remove', (req, res) => {
    if (!requireAdmin(req, res)) return;

    const email = lower(req.body.email);
    const store = readStore();

    if (req.body.courseId) {
        if (store.students[email]) delete store.students[email].enrollments[String(req.body.courseId)];
    } else {
        delete store.students[email];
        delete store.progress[email];
        // Sign them out everywhere immediately
        Object.keys(store.tokens).forEach(t => {
            if (store.tokens[t].email === email) delete store.tokens[t];
        });
    }

    writeStore(store);
    res.json({ ok: true, students: store.students, progress: store.progress });
});

app.post('/api/admin/class', (req, res) => {
    if (!requireAdmin(req, res)) return;

    const lesson = req.body.lesson;
    if (!lesson || !lesson.id) return res.status(400).json({ error: 'Invalid class.' });

    const store = readStore();
    store.customLessons[lesson.id] = lesson;
    writeStore(store);
    res.json({ ok: true, customLessons: store.customLessons });
});

// ---------------------------------------------------------------- static
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (/\.(html|js|css)$/.test(filePath)) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('');
    console.log('==================================================');
    console.log(` Astro by Neetu -> http://localhost:${PORT}`);
    console.log('==================================================');
    console.log(` Admin email    : ${ADMIN_EMAIL}`);
    console.log(` Admin passcode : ${ADMIN_PASSCODE}`);
    if (ADMIN_PASSCODE === 'ChangeThisPasscode123') {
        console.log('  ^ this is the default. Change it before going live.');
    }
    console.log(` Student data   : ${DATA_FILE}`);
    console.log('==================================================');
    console.log('');
});
