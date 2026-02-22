const root = document.getElementById("girlsday-app");
if (!root) throw new Error('Container "#girlsday-app" nicht gefunden.');

/* ===== PWA Basics (NEU) ===== */
(function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {});
  });
})();

function detectPlatform() {
  const ua = navigator.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isIOS ? "ios" : "android";
}

function isStandalone() {
  return (
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    (window.navigator && window.navigator.standalone === true)
  );
}

/* ===== I18N ===== */
const LANG_KEY = "girlsday_lang";

function getLang() {
  const raw = (localStorage.getItem(LANG_KEY) || "").toLowerCase();
  return raw === "en" ? "en" : "de";
}

function setLang(lang) {
  const safe = String(lang || "").toLowerCase() === "en" ? "en" : "de";
  try {
    localStorage.setItem(LANG_KEY, safe);
  } catch {}
}

function t(key, vars = {}) {
  const lang = getLang();
  const de = I18N.de || {};
  const pack = (lang === "en" ? I18N.en : I18N.de) || {};

  let str = pack[key];
  if (typeof str !== "string") str = de[key];
  if (typeof str !== "string") str = key;

  return str.replace(/\{(\w+)\}/g, (_, k) => {
    const v = vars[k];
    return v === undefined || v === null ? "" : String(v);
  });
}

const I18N = {
  de: {
    // Nav
    "nav.home": "Start",
    "nav.overview": "Antworten",
    "nav.help": "Hilfe",
    "nav.rate": "Bewerten",

    // Start
    "start.heroTitle": "Hallo, ich bin<br>Frau N. Hofer!",
    "start.text":
      "Willkommen an unserem Institut! Entdeckt mit mir gemeinsam spannende Stationen rund um Mathematik und Forschung.",
    "start.cta": "Los geht’s",
    "start.lang.label": "Sprache:",
    "start.lang.de": "Deutsch",
    "start.lang.en": "English",

    // Install
    "install.title": "App zum Homescreen hinzufügen",
    "install.text": "Für das beste Erlebnis empfehlen wir diese Installation.",
    "install.tab.ios": "iPhone",
    "install.tab.android": "Android",
    "install.step.share": "Tippe unten auf „Teilen“",
    "install.step.addHome": "Wähle „Zum Home-Bildschirm“",
    "install.step.add": "Tippe auf „Hinzufügen“",
    "install.continue": "Weiter zur Rallye",
    "install.skip": "Ohne Installation fortfahren",
    "install.androidAlt": "Android Installation",

    // Quiz
    "quiz.progress": "Frage {current} von {total}",
    "quiz.questionTitle": "Frage {n}",
    "quiz.optionsAria": "Antwortmöglichkeiten",
    "quiz.back": "Zurück",
    "quiz.next": "Weiter",
    "quiz.done": "Fertig",
    "quiz.saved": "Gespeichert.",

    // Notice
    "notice.notAllCorrect":
      "Ihr habt leider nicht alle Fragen richtig beantwortet. Schaut in der Übersicht nach, welche Antworten noch nicht stimmen, und korrigiert sie.",

    // Overview
    "overview.headline.allCorrect":
      "Zeigt eure richtigen Antworten und holt euch die Buchstaben für euer Lösungswort ab!",
    "overview.headline.notAllCorrect":
      "Ihr habt leider nicht alle Fragen richtig beantwortet. Schaut in der Übersicht nach, welche Antworten noch nicht stimmen, und korrigiert sie.",
    "overview.notAnswered": "nicht beantwortet",
    "overview.correct": "richtig",
    "overview.wrong": "falsch",
    "overview.editAria": "Antwort zu Frage {n} bearbeiten",

    // Done
    "done.title": "Toll gemacht!",
    "done.text":
      "Ihr habt alle Fragen richtig. Holt euch bei euren Betreuer:innen Buchstaben ab und findet das Lösungswort!",
    "done.toOverview": "Zu euren Antworten",

    // Help
    "help.title": "FAQ",
    "help.q1": "Wie funktioniert die Rallye?",
    "help.a1": "Ihr beantwortet die Fragen gemeinsam. Eure Auswahl wird automatisch gespeichert.",
    "help.q2": "Wie bearbeiten wir Antworten?",
    "help.a2": "Geht auf „Antworten“ und klickt bei der Frage auf das Stift-Symbol.",
    "help.q3": "Was passiert am Ende?",
    "help.a3":
      "Wenn ihr alles richtig habt, bekommt ihr den Abschluss. Sonst seht ihr in der Übersicht, was ihr nochmal prüfen solltet.",
    "help.back": "Zurück",

    // Rate
    "rate.title": "Gebt uns Feedback",
    "rate.intro":
      "Wie hat euch der Girls’ Day gefallen? Eure Rückmeldung hilft uns, den Tag noch besser zu machen.",
    "rate.scaleHint": "1 = trifft gar nicht zu, 5 = trifft voll zu",
    "rate.q.understand": "Ich habe verstanden, was am Institut gemacht wird.",
    "rate.q.fun": "Die Rallye war abwechslungsreich.",
    "rate.q.easy": "Die Aufgaben waren gut machbar.",
    "rate.q.recommend": "Ich würde den Girls’ Day hier weiterempfehlen.",
    "rate.textLabel": "Was war besonders gut – und was könnten wir besser machen?",
    "rate.textPlaceholder": "Kurz euer Feedback...",
    "rate.submit": "Feedback abschicken",

    // Thanks
    "thanks.title": "Danke für euer Feedback!",
    "thanks.text": "Eure Rückmeldung hilft uns, den Girls’ Day weiter zu verbessern.",
    "thanks.backHome": "Zur Startseite",
  },

  en: {
    // Nav
    "nav.home": "Home",
    "nav.overview": "Answers",
    "nav.help": "Help",
    "nav.rate": "Rate",

    // Start
    "start.heroTitle": "Hi, I’m<br>Ms N. Hofer!",
    "start.text":
      "Welcome to our institute! Explore exciting stations about mathematics and research together with me.",
    "start.cta": "Let’s go",
    "start.lang.label": "Language:",
    "start.lang.de": "Deutsch",
    "start.lang.en": "English",

    // Install
    "install.title": "Add the app to your Home Screen",
    "install.text": "For the best experience, we recommend installing the app.",
    "install.tab.ios": "iPhone",
    "install.tab.android": "Android",
    "install.step.share": 'Tap "Share" at the bottom',
    "install.step.addHome": 'Choose "Add to Home Screen"',
    "install.step.add": 'Tap "Add"',
    "install.continue": "Continue to the rally",
    "install.skip": "Continue without installing",
    "install.androidAlt": "Android installation",

    // Quiz
    "quiz.progress": "Question {current} of {total}",
    "quiz.questionTitle": "Question {n}",
    "quiz.optionsAria": "Answer options",
    "quiz.back": "Back",
    "quiz.next": "Next",
    "quiz.done": "Finish",
    "quiz.saved": "Saved.",

    // Notice
    "notice.notAllCorrect":
      "Not all answers are correct yet. Check the overview to see which ones are wrong and correct them.",

    // Overview
    "overview.headline.allCorrect":
      "Show your correct answers and collect the letters for your solution word!",
    "overview.headline.notAllCorrect":
      "Not all answers are correct yet. Check the overview to see which ones are wrong and correct them.",
    "overview.notAnswered": "not answered",
    "overview.correct": "correct",
    "overview.wrong": "wrong",
    "overview.editAria": "Edit answer for question {n}",

    // Done
    "done.title": "Well done!",
    "done.text":
      "You answered everything correctly. Collect letters from your supervisors and find the solution word!",
    "done.toOverview": "Go to your answers",

    // Help
    "help.title": "FAQ",
    "help.q1": "How does the rally work?",
    "help.a1": "Answer the questions together. Your selection is saved automatically.",
    "help.q2": "How can we edit answers?",
    "help.a2": 'Go to "Answers" and tap the pencil icon for the question.',
    "help.q3": "What happens at the end?",
    "help.a3":
      "If everything is correct, you’ll get the completion screen. Otherwise, the overview shows what you should check again.",
    "help.back": "Back",

    // Rate
    "rate.title": "Give us feedback",
    "rate.intro":
      "How did you like Girls’ Day? Your feedback helps us improve the day.",
    "rate.scaleHint": "1 = not true at all, 5 = completely true",
    "rate.q.understand": "I understood what the institute does.",
    "rate.q.fun": "The rally was varied.",
    "rate.q.easy": "The tasks were manageable.",
    "rate.q.recommend": "I would recommend Girls’ Day here.",
    "rate.textLabel": "What was great — and what could we improve?",
    "rate.textPlaceholder": "Your feedback...",
    "rate.submit": "Send feedback",

    // Thanks
    "thanks.title": "Thanks for your feedback!",
    "thanks.text": "Your feedback helps us improve Girls’ Day.",
    "thanks.backHome": "Back to home",
  },
};

/* ===== Quiz (DE/EN) ===== */
const QUIZ_DE = [
  {
    q: "Wofür steht die Abkürzung in Fraunhofer ITWM?",
    img: "./assets/img/quiz/q1_itwm.png",
    options: [
      "Institut für Technische und Wirtschaftliche Mathematik",
      "Institut für Techno- und Wirtschaftsmathematik",
      "Institut für Technologie und Wirtschaftsmathematik",
      "Institut für Theorie und Wirtschaftsmathematik",
    ],
    correct: 1,
  },
  {
    q: "Was ist die bekannteste Erfindung der Fraunhofer-Gesellschaft?",
    img: "./assets/img/quiz/q2_mp3.png",
    options: ["MPEG", "WAV", "MP3", "AAC"],
    correct: 2,
  },
  {
    q: "Wie heißt die mathematische Skulptur bzw. das Kunstwerk vor unserem Gebäude?",
    img: "./assets/img/quiz/q3_hyperbel.png",
    options: ["Paraboloid", "Hyperboloid", "Ellipsoid", "Torus"],
    correct: 1,
  },
  {
    q: "Wie viel Atrien mit Pflanzen hat das Gebäude des Fraunhofer ITWM?",
    img: "./assets/img/quiz/q4_atrien.png",
    options: ["zwei", "drei", "vier", "fünf"],
    correct: 1,
  },
  {
    q: "Wie heißt unser Fahrzeugsimulator?",
    img: "./assets/img/quiz/q5_rodos.png",
    options: ["RADAR", "RODOS", "SIMCAR", "AUTOSIM"],
    correct: 1,
  },
  {
    q: "Welche Technik wird auch für Gesichtserkennung von Handys genutzt? Tipp: Unsere Abteilung BV ist danach benannt.",
    img: "./assets/img/quiz/q6_bv.png",
    options: ["Mustererkennung", "Signalverarbeitung", "Bildverarbeitung", "Datenanalyse"],
    correct: 2,
  },
  {
    q: "Was beobachtete Josef von Fraunhofer im Sonnenlicht mit einem Prisma?",
    img: "./assets/img/quiz/q7_josef.png",
    options: ["Viele dunkle Linien im Farbspektrum", "Blitze im Licht", "Eine zweite Sonne", "Bewegte Farbkreise"],
    correct: 0,
  },
  {
    q: "Wofür steht die Abkürzung »HiWi«?",
    img: "./assets/img/quiz/q8_hiwi.png",
    options: [
      "Hochschulwissenschaftler:in",
      "Hilfswissenschaftler:in",
      "Hauptwissenschaftler:in",
      "Hochschulassistent:in",
    ],
    correct: 1,
  },
];

const QUIZ_EN = [
  {
    q: "What does the abbreviation “ITWM” stand for at Fraunhofer ITWM?",
    img: "./assets/img/quiz/q1_itwm.png",
    options: [
      "Institute for Technical and Economic Mathematics",
      "Institute for Industrial Mathematics",
      "Institute for Technology and Business Mathematics",
      "Institute for Theory and Economic Mathematics",
    ],
    correct: 1,
  },
  {
    q: "What is Fraunhofer-Gesellschaft’s most famous invention?",
    img: "./assets/img/quiz/q2_mp3.png",
    options: ["MPEG", "WAV", "MP3", "AAC"],
    correct: 2,
  },
  {
    q: "What is the name of the mathematical sculpture / artwork in front of our building?",
    img: "./assets/img/quiz/q3_hyperbel.png",
    options: ["Paraboloid", "Hyperboloid", "Ellipsoid", "Torus"],
    correct: 1,
  },
  {
    q: "How many planted atriums does the Fraunhofer ITWM building have?",
    img: "./assets/img/quiz/q4_atrien.png",
    options: ["two", "three", "four", "five"],
    correct: 1,
  },
  {
    q: "What is our driving simulator called?",
    img: "./assets/img/quiz/q5_rodos.png",
    options: ["RADAR", "RODOS", "SIMCAR", "AUTOSIM"],
    correct: 1,
  },
  {
    q: "Which technology is also used for phone face recognition? Tip: our department BV is named after it.",
    img: "./assets/img/quiz/q6_bv.png",
    options: ["Pattern recognition", "Signal processing", "Image processing", "Data analysis"],
    correct: 2,
  },
  {
    q: "What did Joseph von Fraunhofer observe in sunlight using a prism?",
    img: "./assets/img/quiz/q7_josef.png",
    options: [
      "Many dark lines in the color spectrum",
      "Flashes in the light",
      "A second sun",
      "Moving color circles",
    ],
    correct: 0,
  },
  {
    q: "What does the abbreviation “HiWi” stand for?",
    img: "./assets/img/quiz/q8_hiwi.png",
    options: [
      "University scientist",
      "Student assistant / research assistant",
      "Lead scientist",
      "University assistant",
    ],
    correct: 1,
  },
];

function getQuiz() {
  return getLang() === "en" ? QUIZ_EN : QUIZ_DE;
}

/* ===== Storage Keys ===== */
const STORAGE_KEY = "girlsday_answers";
const RATE_KEY = "girlsday_rating";
const LAST_KEY = "girlsday_last";
const NOTICE_KEY = "girlsday_notice";

/* ===== Assets ===== */
const LOGO_ITWM = "./assets/logos/logo-itwm.svg";

const START_BUILDING = "./assets/img/start/itwm-gebaeude.png";
const START_HOFER = "./assets/img/start/frau-n-hofer-start.png";

const INSTALL_ASSETS = {
  hero: "./assets/img/install/install-hero.jpg",
  androidStep: "./assets/img/install/install-android-step.png",
};

const ICON_HOME = "./assets/icons/icon-home.svg";
const ICON_OVERVIEW = "./assets/icons/icon-uebersicht.svg";
const ICON_HELP = "./assets/icons/icon-hilfe.svg";
const ICON_RATE = "./assets/icons/icon-bewerten.svg";
const ICON_EDIT = "./assets/icons/icon-edit.svg";

const ICON_IOS_SHARE = "./assets/icons/Icon_teilen.svg";
const ICON_IOS_PLUS = "./assets/icons/Icon_plus.svg";
const ICON_IOS_CHECK = "./assets/icons/Icon_check.svg";

const SUCCESS_IMAGE = "./assets/img/quiz/success-screen.jpg";
const HELP_IMAGE = "./assets/img/help/help.png";

/* ===== Storage ===== */
function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveAnswer(questionIndex, optionIndex) {
  try {
    const answers = loadAnswers();
    answers[String(questionIndex)] = optionIndex;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {}
}

function countCorrect() {
  const answers = loadAnswers();
  const QUIZ = getQuiz();
  let correct = 0;
  QUIZ.forEach((item, i) => {
    const picked = answers[String(i)];
    if (typeof picked === "number" && Number.isFinite(picked) && picked === item.correct) correct += 1;
  });
  return correct;
}

/* ===== Notice ===== */
function setNotice(text) {
  try {
    localStorage.setItem(NOTICE_KEY, String(text || ""));
  } catch {}
}

function popNotice() {
  try {
    const raw = localStorage.getItem(NOTICE_KEY);
    localStorage.removeItem(NOTICE_KEY);
    return raw || "";
  } catch {
    return "";
  }
}

/* ===== Last State ===== */
function setLastScreen(payload) {
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify(payload));
  } catch {}
}

function getLastScreen() {
  try {
    const raw = localStorage.getItem(LAST_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function resumeLast() {
  const last = getLastScreen();
  if (!last) return renderStart();

  if (last.screen === "install") return renderInstall(last.platform || "ios");

  const QUIZ = getQuiz();
  if (last.screen === "question" && typeof last.index === "number") {
    const safeIndex = Math.min(Math.max(last.index, 0), QUIZ.length - 1);
    return renderQuestion(safeIndex);
  }

  if (last.screen === "overview") return renderOverview();
  if (last.screen === "help") return renderHelp(last.returnTo || null);
  if (last.screen === "rate") return renderRate();
  if (last.screen === "done") return renderDone();
  if (last.screen === "thanks") return renderThanks();

  return renderStart();
}

/* ===== UI Helpers ===== */
function headerHTML() {
  return `
    <div class="header header-start">
      <img class="logo-center" src="${LOGO_ITWM}" alt="Fraunhofer ITWM" />
    </div>
  `;
}

function navHTML(active) {
  return `
    <nav class="bottom-nav" aria-label="Navigation">
      <button class="nav-item ${active === "home" ? "active" : ""}" data-nav="home" type="button">
        <img class="nav-icon-img" src="${ICON_HOME}" alt="" />
        <span class="nav-label">${escapeHtml(t("nav.home"))}</span>
      </button>

      <button class="nav-item ${active === "overview" ? "active" : ""}" data-nav="overview" type="button">
        <img class="nav-icon-img" src="${ICON_OVERVIEW}" alt="" />
        <span class="nav-label">${escapeHtml(t("nav.overview"))}</span>
      </button>

      <button class="nav-item ${active === "help" ? "active" : ""}" data-nav="help" type="button">
        <img class="nav-icon-img" src="${ICON_HELP}" alt="" />
        <span class="nav-label">${escapeHtml(t("nav.help"))}</span>
      </button>

      <button class="nav-item ${active === "rate" ? "active" : ""}" data-nav="rate" type="button">
        <img class="nav-icon-img" src="${ICON_RATE}" alt="" />
        <span class="nav-label">${escapeHtml(t("nav.rate"))}</span>
      </button>
    </nav>
  `;
}

function bindNav() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget.dataset.nav;

      if (target === "home") return renderStart();
      if (target === "overview") return renderOverview();
      if (target === "rate") return renderRate();

      if (target === "help") {
        const last = getLastScreen();
        const returnTo = last && last.screen !== "help" ? last : { screen: "home" };
        return renderHelp(returnTo);
      }
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function progressHTML(index) {
  const QUIZ = getQuiz();
  const total = QUIZ.length;
  const current = index + 1;
  const pct = Math.round((current / total) * 100);

  return `
    <div class="progress">
      <div class="progress-meta">
        <span class="progress-step">${escapeHtml(t("quiz.progress", { current, total }))}</span>
        <span class="progress-percent">${pct}%</span>
      </div>

      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>
  `;
}

function confettiHTML() {
  return `<div class="confetti" id="confetti"></div>`;
}

/* ===== Confetti (Done/Thanks) ===== */
function launchConfetti() {
  const host = document.getElementById("confetti");
  if (!host) return;

  host.innerHTML = "";

  const STAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <path d="M32 4 L40 24 L62 24 L44 38 L50 58 L32 46 L14 58 L20 38 L2 24 L24 24 Z"
            fill="none" stroke="#000" stroke-width="3" stroke-linejoin="round"/>
    </svg>
  `)}`;

  const HEART_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <path d="M32 56 C32 56 6 38 6 22
               C6 13 13 8 20 8
               C25 8 29 11 32 15
               C35 11 39 8 44 8
               C51 8 58 13 58 22
               C58 38 32 56 32 56 Z"
            fill="none" stroke="#000" stroke-width="3" stroke-linejoin="round"/>
    </svg>
  `)}`;

  const shapes = [STAR_SVG, HEART_SVG];
  const pieces = 70;
  const width = host.clientWidth || window.innerWidth;

  for (let i = 0; i < pieces; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";

    const x = Math.random() * width;
    const delay = Math.random() * 0.6;
    const dur = 1.6 + Math.random() * 1.6;
    const dx = Math.random() * 160 - 80 + "px";
    const rot = Math.random() * 720 - 360 + "deg";

    const size = 14 + Math.random() * 16;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    el.style.left = `${x}px`;
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty("--dx", dx);
    el.style.setProperty("--rot", rot);

    el.style.backgroundImage = `url("${shapes[Math.floor(Math.random() * shapes.length)]}")`;

    host.appendChild(el);
    setTimeout(() => el.remove(), (delay + dur) * 1000 + 100);
  }

  setTimeout(() => {
    host.innerHTML = "";
  }, 4200);
}

/* ===== Start Motion (nur Start-Hero) ===== */
function launchStartMotion() {
  const host = document.getElementById("startMotion");
  if (!host) return;

  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  host.innerHTML = "";

  const STAR_OUTLINE = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <path d="M32 4 L40 24 L62 24 L44 38 L50 58 L32 46 L14 58 L20 38 L2 24 L24 24 Z"
            fill="none" stroke="#000" stroke-width="3" stroke-linejoin="round"/>
    </svg>
  `)}`;

  const FORMULAS = [
    "π ≈ 3,14",
    "a² + b² = c²",
    "f(x) = x²",
    "∫ f(x) dx",
    "Σ (i=1..n)",
    "Δx → 0",
    "sin(x)",
    "√2",
    "log(x)",
  ];

  const rect = host.getBoundingClientRect();
  const W = rect.width || window.innerWidth;
  const H = rect.height || 420;

  const isMobile = W < 480;
  const starCount = reduce ? 6 : isMobile ? 10 : 12;
  const formulaCount = reduce ? 4 : isMobile ? 8 : 10;

  const placed = [];
  function placeNoOverlap(size, zoneFn, tries = 18) {
    const r = size * 0.55;
    for (let t = 0; t < tries; t++) {
      const { x, y } = zoneFn();
      let ok = true;
      for (const p of placed) {
        const dx = x - p.x;
        const dy = y - p.y;
        const min = r + p.r + 6;
        if (dx * dx + dy * dy < min * min) {
          ok = false;
          break;
        }
      }
      if (ok) {
        placed.push({ x, y, r });
        return { x, y };
      }
    }
    const { x, y } = zoneFn();
    placed.push({ x, y, r });
    return { x, y };
  }

  for (let i = 0; i < starCount; i++) {
    const el = document.createElement("div");
    el.className = "float-piece is-star";

    const size = 14 + Math.random() * 22;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    const zone = Math.random();
    const pos = placeNoOverlap(size, () => {
      if (zone < 0.45) {
        return { x: Math.random() * Math.max(1, W - size), y: Math.random() * (H * 0.35) };
      }
      if (zone < 0.75) {
        return { x: W * (0.55 + Math.random() * 0.4), y: Math.random() * (H * 0.75) };
      }
      return { x: Math.random() * Math.max(1, W - size), y: Math.random() * (H * 0.75) };
    });

    el.style.left = `${pos.x}px`;
    el.style.top = `${pos.y}px`;

    el.style.setProperty("--dur", `${3.2 + Math.random() * 2.8}s`);
    el.style.setProperty("--dx", `${(Math.random() * 14 - 7).toFixed(1)}px`);
    el.style.setProperty("--dy", `${(-10 - Math.random() * 14).toFixed(1)}px`);
    el.style.setProperty("--rot", `${(10 + Math.random() * 35).toFixed(0)}deg`);

    el.style.backgroundImage = `url("${STAR_OUTLINE}")`;
    el.style.opacity = `${0.28 + Math.random() * 0.35}`;

    host.appendChild(el);
  }

  for (let i = 0; i < formulaCount; i++) {
    const el = document.createElement("div");
    el.className = "float-piece is-formula";
    el.textContent = FORMULAS[Math.floor(Math.random() * FORMULAS.length)];

    const zone = Math.random();

    if (zone < 0.28) {
      el.style.left = `${Math.random() * (W * 0.45)}px`;
      el.style.top = `${H * (0.55 + Math.random() * 0.35)}px`;
    } else if (zone < 0.62) {
      el.style.left = `${Math.random() * (W * 0.92)}px`;
      el.style.top = `${Math.random() * (H * 0.32)}px`;
    } else {
      el.style.left = `${W * (0.55 + Math.random() * 0.4)}px`;
      el.style.top = `${Math.random() * (H * 0.75)}px`;
    }

    el.style.setProperty("--dur", `${3.8 + Math.random() * 3.2}s`);
    el.style.setProperty("--dx", `${(Math.random() * 16 - 8).toFixed(1)}px`);
    el.style.setProperty("--dy", `${(-8 - Math.random() * 16).toFixed(1)}px`);
    el.style.setProperty("--rot", `${(6 + Math.random() * 24).toFixed(0)}deg`);

    el.style.opacity = `${0.22 + Math.random() * 0.25}`;

    host.appendChild(el);
  }
}

/* ===== Multiple Choice ===== */
function optionsHTML(index, selectedIndex) {
  const QUIZ = getQuiz();
  const name = `q_${index}`;
  return QUIZ[index].options
    .map((opt, i) => {
      const checked = String(i) === String(selectedIndex) ? "checked" : "";
      return `
        <label class="mc-option">
          <input class="mc-input" type="radio" name="${name}" value="${i}" ${checked} />
          <span class="mc-label">${escapeHtml(opt)}</span>
        </label>
      `;
    })
    .join("");
}

function getPickedOptionIndex(index) {
  const el = document.querySelector(`input[name="q_${index}"]:checked`);
  if (!el) return null;
  const n = Number(el.value);
  return Number.isFinite(n) ? n : null;
}

/* ===== Rating ===== */
function scaleRadios(name, selectedValue) {
  const selected = String(selectedValue || "");
  return [1, 2, 3, 4, 5]
    .map(
      (n) => `
        <label class="scale-item">
          <input type="radio" name="${name}" value="${n}" ${selected === String(n) ? "checked" : ""} />
          <span>${n}</span>
        </label>
      `
    )
    .join("");
}

function getCheckedValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : "";
}

/* ===== Screens ===== */
function renderStart() {
  setLastScreen({ screen: "home" });

  const lang = getLang();
  const isEN = lang === "en";

  // Button-Reset ohne neue CSS (unverändert, auch wenn ungenutzt)
  const langBtnStyle =
    "appearance:none;border:0;background:transparent;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer;";

  root.innerHTML = `
    <div class="screen screen--start">
      ${headerHTML()}

      <div class="content start-content">
        <div class="start-hero">
          <img class="start-building" src="${START_BUILDING}" alt="" />
          <div class="float-confetti" id="startMotion" aria-hidden="true"></div>
          <img class="start-figure" src="${START_HOFER}" alt="Frau N. Hofer" />
          <h1 class="start-title start-title--hero">${t("start.heroTitle")}</h1>
        </div>

        <p class="start-text start-text--below">
          ${escapeHtml(t("start.text"))}
        </p>

        <button class="btn start-cta" id="startBtn" type="button">${escapeHtml(t("start.cta"))}</button>

        <!-- Sprachwahl: dezent, unter dem Button -->
        <div class="install-skip" aria-label="${escapeHtml(t("start.lang.label"))}" style="padding-top:10px;">
          <span style="margin-right:6px;">${escapeHtml(t("start.lang.label"))}</span>
          <button
            type="button"
            data-lang="de"
            class="${!isEN ? "is-active" : ""}"
            aria-pressed="${!isEN}"
          >
            ${escapeHtml(t("start.lang.de"))}
          </button>

          <span aria-hidden="true"> · </span>

          <button
            type="button"
            data-lang="en"
            class="${isEN ? "is-active" : ""}"
            aria-pressed="${isEN}"
          >
            ${escapeHtml(t("start.lang.en"))}
          </button>
        </div>
      </div>

      ${navHTML("home")}
    </div>
  `;

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      setLang(e.currentTarget.dataset.lang);
      renderStart();
    });
  });

  // NEU: installiert -> direkt Rallye; sonst Install je nach Plattform
  document.getElementById("startBtn")?.addEventListener("click", () => {
    if (isStandalone()) return renderQuestion(0);
    return renderInstall(detectPlatform());
  });

  bindNav();
  launchStartMotion();
}

function renderInstall(platform = "ios") {
  setLastScreen({ screen: "install", platform });

  const isIOS = platform === "ios";

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content install-content">
        <img class="install-hero" src="${INSTALL_ASSETS.hero}" alt="" />

        <h2>${escapeHtml(t("install.title"))}</h2>
        <p>${escapeHtml(t("install.text"))}</p>

        <div class="install-tabs">
          <button class="tab-btn ${isIOS ? "active" : ""}" data-platform="ios" type="button">${escapeHtml(
            t("install.tab.ios")
          )}</button>
          <button class="tab-btn ${!isIOS ? "active" : ""}" data-platform="android" type="button">${escapeHtml(
            t("install.tab.android")
          )}</button>
        </div>

        ${
          isIOS
            ? `
              <div class="install-steps">
                <div class="install-step">
                  <img class="install-step-icon" src="${ICON_IOS_SHARE}" alt="" />
                  <div class="install-step-text">${escapeHtml(t("install.step.share"))}</div>
                </div>

                <div class="install-step">
                  <img class="install-step-icon" src="${ICON_IOS_PLUS}" alt="" />
                  <div class="install-step-text">${escapeHtml(t("install.step.addHome"))}</div>
                </div>

                <div class="install-step">
                  <img class="install-step-icon" src="${ICON_IOS_CHECK}" alt="" />
                  <div class="install-step-text">${escapeHtml(t("install.step.add"))}</div>
                </div>
              </div>
            `
            : `
              <img class="install-android-img" src="${INSTALL_ASSETS.androidStep}" alt="${escapeHtml(
                t("install.androidAlt")
              )}" />
            `
        }

        <button class="btn" id="installContinueBtn" type="button">${escapeHtml(t("install.continue"))}</button>

        <p class="install-skip" id="installSkipBtn" role="button" tabindex="0">
          ${escapeHtml(t("install.skip"))}
        </p>
      </div>

      ${navHTML("")}
    </div>
  `;

  document.querySelectorAll(".tab-btn[data-platform]").forEach((btn) => {
    btn.addEventListener("click", (e) => renderInstall(e.currentTarget.dataset.platform));
  });

  document.getElementById("installContinueBtn")?.addEventListener("click", () => renderQuestion(0));

  const skip = document.getElementById("installSkipBtn");
  skip?.addEventListener("click", () => renderQuestion(0));
  skip?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") renderQuestion(0);
  });

  bindNav();
}

function renderQuestion(index) {
  setLastScreen({ screen: "question", index });

  const QUIZ = getQuiz();

  const answers = loadAnswers();
  const selected = typeof answers[String(index)] === "number" ? answers[String(index)] : null;

  const isLast = index === QUIZ.length - 1;
  const nextLabel = isLast ? t("quiz.done") : t("quiz.next");

  const imgSrc = QUIZ[index].img;

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content">
        ${imgSrc ? `<img class="question-img question-img--hero" src="${imgSrc}" alt="" />` : ""}

        ${progressHTML(index)}

        <h2 class="question">${escapeHtml(t("quiz.questionTitle", { n: index + 1 }))}</h2>
        <p>${escapeHtml(QUIZ[index].q)}</p>

        <div class="mc-group" role="radiogroup" aria-label="${escapeHtml(t("quiz.optionsAria"))}">
          ${optionsHTML(index, selected)}
        </div>

        <div class="btn-row">
          <button class="btn secondary" id="backBtn" type="button"><span>${escapeHtml(t("quiz.back"))}</span></button>
          <button class="btn" id="nextBtn" type="button">${escapeHtml(nextLabel)}</button>
        </div>

        <div class="status" id="status" aria-live="polite"></div>
      </div>

      ${navHTML("")}
    </div>
  `;

  document.querySelectorAll(`input[name="q_${index}"]`).forEach((input) => {
    input.addEventListener("change", () => {
      const picked = getPickedOptionIndex(index);
      if (picked !== null) {
        saveAnswer(index, picked);
        const st = document.getElementById("status");
        if (st) st.textContent = t("quiz.saved");
      }
    });
  });

  document.getElementById("backBtn")?.addEventListener("click", () => {
    if (index > 0) return renderQuestion(index - 1);
    return renderStart();
  });

  document.getElementById("nextBtn")?.addEventListener("click", () => {
    const picked = getPickedOptionIndex(index);
    if (picked !== null) saveAnswer(index, picked);

    if (!isLast) return renderQuestion(index + 1);

    const correct = countCorrect();
    const total = QUIZ.length;

    if (correct === total) return renderDone();

    setNotice(t("notice.notAllCorrect"));
    return renderOverview();
  });

  bindNav();
}

function renderOverview() {
  setLastScreen({ screen: "overview" });

  const QUIZ = getQuiz();

  const correct = countCorrect();
  const total = QUIZ.length;
  const allCorrect = correct === total;

  const headline = allCorrect ? t("overview.headline.allCorrect") : t("overview.headline.notAllCorrect");

  const answers = loadAnswers();
  let list = "";

  QUIZ.forEach((item, i) => {
    const picked = answers[String(i)];
    const has = typeof picked === "number" && Number.isFinite(picked);
    const isCorrect = has && picked === item.correct;

    const statusSymbol = !has ? "–" : isCorrect ? "✓" : "✕";
    const statusClass = !has ? "is-empty" : isCorrect ? "is-correct" : "is-wrong";
    const answerClass = !has ? "" : isCorrect ? "is-correct" : "is-wrong";

    const pickedText = has ? item.options[picked] : "";

    list += `
      <div class="overview-item">
        <div class="overview-head">
          <strong>${escapeHtml(t("quiz.questionTitle", { n: i + 1 }))}</strong>
          <span class="q-status ${statusClass}" aria-label="${escapeHtml(
            !has ? t("overview.notAnswered") : isCorrect ? t("overview.correct") : t("overview.wrong")
          )}">
            ${statusSymbol}
          </span>
        </div>

        <div class="overview-q">${escapeHtml(item.q)}</div>

        <div class="overview-answer ${answerClass}">
          ${has ? escapeHtml(pickedText) : ""}
        </div>

        <button class="editIconBtn" data-index="${i}" type="button" aria-label="${escapeHtml(
          t("overview.editAria", { n: i + 1 })
        )}">
          <img class="editIconImg" src="${ICON_EDIT}" alt="" />
        </button>
      </div>
    `;
  });

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content">
        <h2 class="overview-title">${escapeHtml(headline)}</h2>
        ${list}
      </div>

      ${navHTML("overview")}
    </div>
  `;

  document.querySelectorAll(".editIconBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      renderQuestion(idx);
    });
  });

  bindNav();
}

function renderDone() {
  setLastScreen({ screen: "done" });

  root.innerHTML = `
    <div class="screen">
      ${confettiHTML()}
      ${headerHTML()}

      <div class="content done-content">
        <h1 class="done-title">${escapeHtml(t("done.title"))}</h1>

        <p class="done-text">
          ${escapeHtml(t("done.text"))}
        </p>

        <img class="done-hero" src="${SUCCESS_IMAGE}" alt="" />

        <button class="btn" id="overviewBtn" type="button">${escapeHtml(t("done.toOverview"))}</button>
      </div>

      ${navHTML("")}
    </div>
  `;

  document.getElementById("overviewBtn")?.addEventListener("click", () => renderOverview());

  bindNav();
  launchConfetti();
}

function renderHelp(returnTo = null) {
  const prev = returnTo || getLastScreen() || { screen: "home" };
  setLastScreen({ screen: "help", returnTo: prev });

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

    <div class="content">
      <h2>${escapeHtml(t("help.title"))}</h2>

      <img class="help-hero" src="${HELP_IMAGE}" alt="" />

      <div class="faq">
        <h3>${escapeHtml(t("help.q1"))}</h3>
        <p>${escapeHtml(t("help.a1"))}</p>

        <h3>${escapeHtml(t("help.q2"))}</h3>
        <p>${escapeHtml(t("help.a2"))}</p>

        <h3>${escapeHtml(t("help.q3"))}</h3>
        <p>${escapeHtml(t("help.a3"))}</p>
      </div>

      <button class="btn" id="backToRallyBtn" type="button">${escapeHtml(t("help.back"))}</button>
    </div>

      ${navHTML("help")}
    </div>
  `;

  document.getElementById("backToRallyBtn")?.addEventListener("click", () => {
    const last = getLastScreen();
    const target = last?.returnTo;

    if (!target) return renderStart();
    if (target.screen === "install") return renderInstall(target.platform || "ios");
    if (target.screen === "question") return renderQuestion(target.index ?? 0);
    if (target.screen === "overview") return renderOverview();
    if (target.screen === "rate") return renderRate();
    if (target.screen === "done") return renderDone();
    if (target.screen === "thanks") return renderThanks();
    return renderStart();
  });

  bindNav();
}

function renderRate() {
  setLastScreen({ screen: "rate" });

  const savedRaw = localStorage.getItem(RATE_KEY);
  let saved = {};
  try {
    saved = savedRaw ? JSON.parse(savedRaw) : {};
  } catch {
    saved = {};
  }

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content">
        <h2>${escapeHtml(t("rate.title"))}</h2>
        <p class="intro-text">
          ${escapeHtml(t("rate.intro"))}
        </p>
        <p class="scale-hint">${escapeHtml(t("rate.scaleHint"))}</p>

        <div class="scale-block">
          <div class="scale-q">${escapeHtml(t("rate.q.understand"))}</div>
          <div class="scale-row">${scaleRadios("q_understand", saved.q_understand)}</div>
        </div>

        <div class="scale-block">
          <div class="scale-q">${escapeHtml(t("rate.q.fun"))}</div>
          <div class="scale-row">${scaleRadios("q_fun", saved.q_fun)}</div>
        </div>

        <div class="scale-block">
          <div class="scale-q">${escapeHtml(t("rate.q.easy"))}</div>
          <div class="scale-row">${scaleRadios("q_easy", saved.q_easy)}</div>
        </div>

        <div class="scale-block">
          <div class="scale-q">${escapeHtml(t("rate.q.recommend"))}</div>
          <div class="scale-row">${scaleRadios("q_recommend", saved.q_recommend)}</div>
        </div>

        <label class="label" for="rateText">${escapeHtml(t("rate.textLabel"))}</label>
        <textarea id="rateText" class="input" rows="4" placeholder="${escapeHtml(
          t("rate.textPlaceholder")
        )}">${escapeHtml(saved.text || "")}</textarea>

        <button class="btn" id="rateSaveBtn" type="button">${escapeHtml(t("rate.submit"))}</button>
      </div>

      ${navHTML("rate")}
    </div>
  `;

  document.getElementById("rateSaveBtn")?.addEventListener("click", () => {
    const payload = {
      q_understand: getCheckedValue("q_understand"),
      q_fun: getCheckedValue("q_fun"),
      q_easy: getCheckedValue("q_easy"),
      q_recommend: getCheckedValue("q_recommend"),
      text: document.getElementById("rateText")?.value.trim() || "",
    };

    localStorage.setItem(RATE_KEY, JSON.stringify(payload));
    renderThanks();
  });

  bindNav();
}

function renderThanks() {
  setLastScreen({ screen: "thanks" });

  root.innerHTML = `
    <div class="screen">
      ${confettiHTML()}
      ${headerHTML()}

      <div class="content">
        <h1>${escapeHtml(t("thanks.title"))}</h1>
        <p>${escapeHtml(t("thanks.text"))}</p>

        <img class="done-hero" src="${SUCCESS_IMAGE}" alt="" />

        <button class="btn" id="backHomeBtn" type="button">${escapeHtml(t("thanks.backHome"))}</button>
      </div>

      ${navHTML("home")}
    </div>
  `;

  document.getElementById("backHomeBtn")?.addEventListener("click", () => renderStart());

  bindNav();
  launchConfetti();
}

/* ===== Start ===== */
resumeLast();

// ===== PWA: Service Worker Registration =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch((err) => console.warn("Service Worker registration failed:", err));
  });
}