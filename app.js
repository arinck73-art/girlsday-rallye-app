const root = document.getElementById("girlsday-app");
if (!root) throw new Error('Container "#girlsday-app" nicht gefunden.');

/* ===== PWA Basics ===== */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch((err) => console.warn("Service Worker registration failed:", err));
  });
}

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
    "nav.home": "Start",
    "nav.overview": "Antworten",
    "nav.board": "Tafel",
    "nav.help": "Hilfe",
    "nav.rate": "Bewerten",

    "start.heroTitle": "Hallo, ich bin<br>Frau N. Hofer!",
    "start.text":
      "Willkommen an unserem Institut! Entdeckt mit mir gemeinsam spannende Stationen rund um Mathematik und Forschung.",
    "start.cta": "Los geht’s",
    "start.lang.label": "Sprache:",
    "start.lang.de": "Deutsch",
    "start.lang.en": "English",

    "intro.title": "So funktioniert’s",
    "intro.text1":
      "Auf Eurer Reise durch das Institut bekommt Ihr viele spannende Informationen. Wenn Ihr genau hinhört, erhaltet Ihr auch die Antworten auf unsere Rallye-Fragen an den einzelnen Stationen.",
    "intro.text2":
      "Wenn alle Fragen richtig beantwortet sind, könnt Ihr Buchstaben freischalten und daraus ein Lösungswort zusammensetzen.",
    "intro.cta": "Weiter",

    "install.title": "App zum Homescreen hinzufügen",
    "install.text": "Für das beste Erlebnis empfehlen wir diese Installation.",
    "install.tab.ios": "iPhone",
    "install.tab.android": "Android",
    "install.step.share": "Tippe unten auf „Teilen“",
    "install.step.addHome": "Wähle „Zum Home-Bildschirm“",
    "install.step.add": "Tippe auf „Hinzufügen“",
    "install.continueDone": "Zum Homescreen hinzugefügt",
    "install.skip": "Ohne Installation fortfahren",
    "install.androidAlt": "Android Installation",

    "quiz.progress": "Frage {current} von {total}",
    "quiz.questionTitle": "Frage {n}",
    "quiz.optionsAria": "Antwortmöglichkeiten",
    "quiz.back": "Zurück",
    "quiz.next": "Weiter",
    "quiz.done": "Fertig",
    "quiz.saved": "Gespeichert.",

    "overview.headline.allCorrect":
      "Alle Antworten sind richtig. Jetzt könnt Ihr über die Schlösser Eure Buchstaben freischalten.",
    "overview.headline.notAllCorrect":
      "Ihr habt leider nicht alle Fragen richtig beantwortet. Schaut in der Übersicht nach, welche Antworten noch nicht stimmen, und korrigiert sie.",
    "overview.notAnswered": "nicht beantwortet",
    "overview.correct": "richtig",
    "overview.wrong": "falsch",
    "overview.editAria": "Antwort zu Frage {n} bearbeiten",
    "overview.unlockAria": "Buchstaben zu Frage {n} freischalten",
    "overview.unlocked": "freigeschaltet",
    "overview.locked": "noch geschlossen",

    "unlock.title": "Buchstaben freigeschaltet",
    "unlock.alreadyTitle": "Hinweis",
    "unlock.alreadyText": "Diese Buchstaben habt Ihr bereits freigeschaltet.",

    "done.title": "Toll gemacht!",
    "done.text":
      "Ihr habt alle Fragen richtig beantwortet. Geht jetzt auf „Antworten“ und öffnet die Schlösser, um Eure Buchstaben freizuschalten.",
    "done.toOverview": "Jetzt Buchstaben holen",

    "board.title": "Tafel",
    "board.intro":
      "Zieht die freigeschalteten Buchstaben in die Felder und setzt das Lösungswort zusammen. Kleiner Tipp: Gesucht ist ein Begriff aus der Mathematik.",
    "board.empty":
      "Ihr habt noch keine Buchstaben freigeschaltet. Geht zuerst auf „Antworten“ und öffnet die Schlösser.",
    "board.hint": "Zieht die Buchstaben in die leeren Felder.",
    "board.poolTitle": "Buchstaben",
    "board.check": "Wort prüfen",
    "board.successTitle": "Geschafft!",
    "board.successText":
      "Ihr habt das Lösungswort gefunden: ALGORITHMUS. Jetzt könnt Ihr Eure Buchstaben bei den Betreuer:innen abholen.",
    "board.incomplete":
      "Es sind noch nicht alle Buchstaben freigeschaltet.",
    "board.tryAgain":
      "Das ist noch nicht richtig. Ordnet die Buchstaben neu.",
    "board.slotAria": "Feld {n}",

    "help.title": "FAQ",
    "help.q1": "Wie funktioniert die Rallye?",
    "help.a1": "Ihr beantwortet die Fragen gemeinsam. Eure Auswahl wird automatisch gespeichert.",
    "help.q2": "Wie bearbeiten wir Antworten?",
    "help.a2":
      "Geht auf „Antworten“ und klickt bei einer Frage auf das Stift-Symbol. Wenn alle Fragen richtig sind, erscheint dort ein Schloss zum Freischalten der Buchstaben.",
    "help.q3": "Was passiert am Ende?",
    "help.a3":
      "Wenn alle Antworten richtig sind, könnt Ihr Buchstaben sammeln und auf der Tafel zum Lösungswort zusammensetzen.",
    "help.back": "Zurück",

    "rate.title": "Gebt uns Feedback",
    "rate.intro":
      "Wie hat Euch der Girls’ Day gefallen? Eure Rückmeldung hilft uns, den Tag noch besser zu machen.",
    "rate.scaleHint": "1 = trifft gar nicht zu, 5 = trifft voll zu",
    "rate.q.understand": "Ich habe verstanden, was am Institut gemacht wird.",
    "rate.q.fun": "Die Rallye war abwechslungsreich.",
    "rate.q.easy": "Die Aufgaben waren gut machbar.",
    "rate.q.recommend": "Ich würde den Girls’ Day hier weiterempfehlen.",
    "rate.textLabel": "Was war besonders gut – und was könnten wir besser machen?",
    "rate.textPlaceholder": "Kurz Euer Feedback...",
    "rate.submit": "Feedback abschicken",

    "thanks.title": "Danke für Euer Feedback!",
    "thanks.text": "Eure Rückmeldung hilft uns, den Girls’ Day weiter zu verbessern.",
    "thanks.backHome": "Zur Startseite",
  },

  en: {
    "nav.home": "Home",
    "nav.overview": "Answers",
    "nav.board": "Board",
    "nav.help": "Help",
    "nav.rate": "Rate",

    "start.heroTitle": "Hi, I’m<br>Ms N. Hofer!",
    "start.text":
      "Welcome to our institute! Explore exciting stations about mathematics and research together with me.",
    "start.cta": "Let’s go",
    "start.lang.label": "Language:",
    "start.lang.de": "Deutsch",
    "start.lang.en": "English",

    "intro.title": "How it works",
    "intro.text1":
      "During your journey through the institute, you will receive lots of exciting information. If you listen carefully, you will also get the answers to our rally questions at the individual stations.",
    "intro.text2":
      "When all questions are answered correctly, you can unlock letters and build the final solution word.",
    "intro.cta": "Continue",

    "install.title": "Add the app to your Home Screen",
    "install.text": "For the best experience, we recommend installing the app.",
    "install.tab.ios": "iPhone",
    "install.tab.android": "Android",
    "install.step.share": 'Tap "Share" at the bottom',
    "install.step.addHome": 'Choose "Add to Home Screen"',
    "install.step.add": 'Tap "Add"',
    "install.continueDone": "Added to Home Screen",
    "install.skip": "Continue without installing",
    "install.androidAlt": "Android installation",

    "quiz.progress": "Question {current} of {total}",
    "quiz.questionTitle": "Question {n}",
    "quiz.optionsAria": "Answer options",
    "quiz.back": "Back",
    "quiz.next": "Next",
    "quiz.done": "Finish",
    "quiz.saved": "Saved.",

    "overview.headline.allCorrect":
      "All answers are correct. Now you can unlock your letters via the locks.",
    "overview.headline.notAllCorrect":
      "Not all answers are correct yet. Check the overview to see which ones are wrong and correct them.",
    "overview.notAnswered": "not answered",
    "overview.correct": "correct",
    "overview.wrong": "wrong",
    "overview.editAria": "Edit answer for question {n}",
    "overview.unlockAria": "Unlock letters for question {n}",
    "overview.unlocked": "unlocked",
    "overview.locked": "still locked",

    "unlock.title": "Letters unlocked",
    "unlock.alreadyTitle": "Note",
    "unlock.alreadyText": "You have already unlocked these letters.",

    "done.title": "Well done!",
    "done.text":
      "You answered everything correctly. Go to “Answers” and open the locks to unlock your letters.",
    "done.toOverview": "Collect letters now",

    "board.title": "Board",
    "board.intro":
      "Drag the unlocked letters into the fields and build the solution word. Tip: The word is a mathematical term.",
    "board.empty":
      "You have not unlocked any letters yet. Go to “Answers” first and open the locks.",
    "board.hint": "Drag the letters into the empty fields.",
    "board.poolTitle": "Letters",
    "board.check": "Check word",
    "board.successTitle": "Done!",
    "board.successText":
      "You found the solution word: ALGORITHMUS. Now you can collect your letters from the supervisors.",
    "board.incomplete":
      "Not all letters have been unlocked yet.",
    "board.tryAgain":
      "That is not correct yet. Rearrange the letters.",
    "board.slotAria": "Field {n}",

    "help.title": "FAQ",
    "help.q1": "How does the rally work?",
    "help.a1": "Answer the questions together. Your selection is saved automatically.",
    "help.q2": "How can we edit answers?",
    "help.a2":
      'Go to "Answers" and tap the pencil icon. If all questions are correct, a lock appears there to unlock the letters.',
    "help.q3": "What happens at the end?",
    "help.a3":
      "If all answers are correct, you can collect letters and arrange them on the board to build the solution word.",
    "help.back": "Back",

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

    "thanks.title": "Thanks for your feedback!",
    "thanks.text": "Your feedback helps us improve Girls’ Day.",
    "thanks.backHome": "Back to home",
  },
};

/* ===== Quiz ===== */
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
    q: "Welche Technik wird auch für Gesichtserkennung von Handys genutzt?",
    img: "./assets/img/quiz/q6_bv.png",
    options: ["Mustererkennung", "Signalverarbeitung", "Bildverarbeitung", "Datenanalyse"],
    correct: 2,
  },
  {
    q: "Was beobachtete Josef von Fraunhofer im Sonnenlicht mit einem Prisma?",
    img: "./assets/img/quiz/q7_josef.png",
    options: [
      "Viele dunkle Linien im Farbspektrum",
      "Blitze im Licht",
      "Eine zweite Sonne",
      "Bewegte Farbkreise",
    ],
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
    q: "Which technology is also used for phone face recognition?",
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
const LETTERS_KEY = "girlsday_letters";
const BOARD_SLOTS_KEY = "girlsday_board_slots";

/* ===== Assets ===== */
const LOGO_ITWM = "./assets/logos/logo-itwm.svg";
const START_BUILDING = "./assets/img/start/itwm-gebaeude.png";
const START_HOFER = "./assets/img/start/frau-n-hofer-start.png";
const INTRO_IMAGE = "./assets/img/start/how-it-works.png";

const INSTALL_ASSETS = {
  hero: "./assets/img/install/install-hero.jpg",
  androidStep: "./assets/img/install/install-android-step.png",
};

const ICON_HOME = "./assets/icons/icon-home.svg";
const ICON_OVERVIEW = "./assets/icons/icon-uebersicht.svg";
const ICON_BOARD = "./assets/icons/icon-tafel.svg";
const ICON_HELP = "./assets/icons/icon-hilfe.svg";
const ICON_RATE = "./assets/icons/icon-bewerten.svg";
const ICON_EDIT = "./assets/icons/icon-edit.svg";
const ICON_LOCK = "./assets/icons/icon-lock.svg";
const ICON_UNLOCK = "./assets/icons/icon-unlock.svg";

const ICON_IOS_SHARE = "./assets/icons/Icon_teilen.svg";
const ICON_IOS_PLUS = "./assets/icons/Icon_plus.svg";
const ICON_IOS_CHECK = "./assets/icons/Icon_check.svg";

const SUCCESS_IMAGE = "./assets/img/quiz/success-screen.jpg";
const HELP_IMAGE = "./assets/img/help/help.png";
const BOARD_BG = "./assets/img/board/board-bg.png";

/* ===== Puzzle Data ===== */
const LETTERS = [
  { id: "l0", char: "A" },
  { id: "l1", char: "L" },
  { id: "l2", char: "G" },
  { id: "l3", char: "O" },
  { id: "l4", char: "R" },
  { id: "l5", char: "I" },
  { id: "l6", char: "T" },
  { id: "l7", char: "H" },
  { id: "l8", char: "M" },
  { id: "l9", char: "U" },
  { id: "l10", char: "S" },
];

const LETTER_REWARDS = [
  ["l0", "l1"],
  ["l2"],
  ["l3"],
  ["l4", "l5"],
  ["l6"],
  ["l7"],
  ["l8"],
  ["l9", "l10"],
];

const LETTER_POOL_ORDER = ["l4", "l2", "l9", "l0", "l7", "l10", "l3", "l6", "l1", "l8", "l5"];
const SOLUTION_SLOT_IDS = ["l0", "l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10"];
const TOP_ROW_SLOT_COUNT = 6;

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
  const quiz = getQuiz();
  let correct = 0;
  quiz.forEach((item, i) => {
    const picked = answers[String(i)];
    if (typeof picked === "number" && Number.isFinite(picked) && picked === item.correct) {
      correct += 1;
    }
  });
  return correct;
}

function getWrongQuestionIndices() {
  const answers = loadAnswers();
  const quiz = getQuiz();

  return quiz.reduce((acc, item, i) => {
    const picked = answers[String(i)];
    const isCorrect =
      typeof picked === "number" &&
      Number.isFinite(picked) &&
      picked === item.correct;

    if (!isCorrect) acc.push(i);
    return acc;
  }, []);
}

function getNextWrongQuestionIndex(currentIndex) {
  const wrong = getWrongQuestionIndices();
  if (!wrong.length) return null;

  if (wrong.includes(currentIndex)) return currentIndex;

  const nextAfterCurrent = wrong.find((idx) => idx > currentIndex);
  return nextAfterCurrent ?? wrong[0];
}

/* ===== Letter / Board State ===== */
function loadLettersState() {
  try {
    const raw = localStorage.getItem(LETTERS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const unlocked = Array.isArray(parsed.unlocked) ? parsed.unlocked : [];
    return {
      unlocked: unlocked
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n >= 0 && n < LETTER_REWARDS.length),
      solved: Boolean(parsed.solved),
    };
  } catch {
    return { unlocked: [], solved: false };
  }
}

function saveLettersState(state) {
  try {
    localStorage.setItem(
      LETTERS_KEY,
      JSON.stringify({
        unlocked: Array.isArray(state?.unlocked) ? state.unlocked : [],
        solved: Boolean(state?.solved),
      })
    );
  } catch {}
}

function isLetterUnlocked(questionIndex) {
  const state = loadLettersState();
  return state.unlocked.includes(questionIndex);
}

function getRewardLetterIds(questionIndex) {
  return LETTER_REWARDS[questionIndex] || [];
}

function getRewardLetterChars(questionIndex) {
  const byId = new Map(LETTERS.map((item) => [item.id, item.char]));
  return getRewardLetterIds(questionIndex).map((id) => byId.get(id)).filter(Boolean);
}

function unlockLetterReward(questionIndex) {
  const state = loadLettersState();
  if (!state.unlocked.includes(questionIndex)) {
    state.unlocked.push(questionIndex);
    state.unlocked.sort((a, b) => a - b);
    saveLettersState(state);
  }
  ensureBoardSlots();
  return getRewardLetterChars(questionIndex);
}

function markBoardSolved() {
  const state = loadLettersState();
  state.solved = true;
  saveLettersState(state);
}

function allLetterRewardsUnlocked() {
  const state = loadLettersState();
  return state.unlocked.length === LETTER_REWARDS.length;
}

function getUnlockedLetterIds() {
  const state = loadLettersState();
  const ids = [];
  state.unlocked.forEach((questionIndex) => {
    getRewardLetterIds(questionIndex).forEach((id) => {
      if (!ids.includes(id)) ids.push(id);
    });
  });
  return ids;
}

function loadBoardSlots() {
  try {
    const raw = localStorage.getItem(BOARD_SLOTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const base = Array.from({ length: SOLUTION_SLOT_IDS.length }, (_, i) =>
      typeof parsed[i] === "string" ? parsed[i] : null
    );
    return base;
  } catch {
    return Array.from({ length: SOLUTION_SLOT_IDS.length }, () => null);
  }
}

function saveBoardSlots(slots) {
  try {
    localStorage.setItem(BOARD_SLOTS_KEY, JSON.stringify(slots));
  } catch {}
}

function ensureBoardSlots() {
  const slots = loadBoardSlots();
  const unlockedIds = getUnlockedLetterIds();
  const cleaned = slots.map((id) => (id && unlockedIds.includes(id) ? id : null));
  saveBoardSlots(cleaned);
  return cleaned;
}

function getLetterById(id) {
  return LETTERS.find((item) => item.id === id) || null;
}

function getAvailableBoardLetters() {
  const unlockedIds = getUnlockedLetterIds();
  const slots = ensureBoardSlots();
  const assigned = slots.filter(Boolean);

  return LETTER_POOL_ORDER
    .filter((id) => unlockedIds.includes(id) && !assigned.includes(id))
    .map((id) => getLetterById(id))
    .filter(Boolean);
}

function isBoardSolved() {
  const slots = ensureBoardSlots();
  if (slots.some((id) => !id)) return false;
  return slots.every((id, index) => id === SOLUTION_SLOT_IDS[index]);
}

function moveLetterToSlot(letterId, slotIndex) {
  const slots = ensureBoardSlots();
  const previousSlot = slots.indexOf(letterId);
  const targetLetter = slots[slotIndex];

  if (previousSlot !== -1) {
    slots[previousSlot] = null;
  }

  if (targetLetter && targetLetter !== letterId) {
    if (previousSlot !== -1) {
      slots[previousSlot] = targetLetter;
    }
  }

  slots[slotIndex] = letterId;
  saveBoardSlots(slots);
}

function removeLetterFromSlot(letterId) {
  const slots = ensureBoardSlots();
  const previousSlot = slots.indexOf(letterId);
  if (previousSlot !== -1) {
    slots[previousSlot] = null;
    saveBoardSlots(slots);
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

  if (last.screen === "intro") return renderIntro();
  if (last.screen === "install") return renderInstall(last.platform || "ios");

  const quiz = getQuiz();
  if (last.screen === "question" && typeof last.index === "number") {
    const safeIndex = Math.min(Math.max(last.index, 0), quiz.length - 1);
    return renderQuestion(safeIndex, Boolean(last.fromOverview));
  }

  if (last.screen === "overview") return renderOverview();
  if (last.screen === "board") return renderBoard();
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

      <button class="nav-item ${active === "board" ? "active" : ""}" data-nav="board" type="button">
        <img class="nav-icon-img" src="${ICON_BOARD}" alt="" />
        <span class="nav-label">${escapeHtml(t("nav.board"))}</span>
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
      if (target === "board") return renderBoard();
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
  const quiz = getQuiz();
  const total = quiz.length;
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

function unlockOverlayHTML(chunk = "") {
  return `
    <div class="unlock-overlay" id="unlockOverlay" aria-hidden="true">
      <div class="unlock-overlay-card">
        <div class="unlock-overlay-title">${escapeHtml(t("unlock.title"))}</div>
        <div class="unlock-letters">${escapeHtml(chunk)}</div>
      </div>
    </div>
  `;
}

/* ===== Audio / Unlock Animation ===== */
function playUnlockSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(740, now);
    osc1.frequency.exponentialRampToValueAtTime(1040, now + 0.16);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.24);

    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
    }, 400);
  } catch {}
}

function animateLettersToBoard(chunk, triggerEl) {
  const navBoard = document.querySelector('.nav-item[data-nav="board"]');
  if (!navBoard || !triggerEl) return Promise.resolve();

  const startRect = triggerEl.getBoundingClientRect();
  const endRect = navBoard.getBoundingClientRect();

  const flyer = document.createElement("div");
  flyer.className = "letter-flyer";
  flyer.textContent = chunk;

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  const dx = endX - startX;
  const dy = endY - startY;

  flyer.style.left = `${startX}px`;
  flyer.style.top = `${startY}px`;
  flyer.style.setProperty("--fly-x", `${dx}px`);
  flyer.style.setProperty("--fly-y", `${dy}px`);

  document.body.appendChild(flyer);
  navBoard.classList.add("nav-item--target");

  return new Promise((resolve) => {
    setTimeout(() => {
      flyer.classList.add("is-flying");
      playUnlockSound();
    }, 60);

    setTimeout(() => {
      navBoard.classList.add("is-received");
    }, 620);

    setTimeout(() => {
      flyer.remove();
      navBoard.classList.remove("nav-item--target");
      navBoard.classList.remove("is-received");
      resolve();
    }, 1150);
  });
}

/* ===== Confetti ===== */
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

  for (let i = 0; i < pieces; i += 1) {
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

/* ===== Start Motion ===== */
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
    for (let t = 0; t < tries; t += 1) {
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

  for (let i = 0; i < starCount; i += 1) {
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

  for (let i = 0; i < formulaCount; i += 1) {
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
  const quiz = getQuiz();
  const name = `q_${index}`;
  return quiz[index].options
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

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      setLang(e.currentTarget.dataset.lang);
      renderStart();
    });
  });

  document.getElementById("startBtn")?.addEventListener("click", () => {
    renderIntro();
  });

  bindNav();
  launchStartMotion();
}

function renderIntro() {
  setLastScreen({ screen: "intro" });

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content intro-content">
        <img class="intro-hero" src="${INTRO_IMAGE}" alt="" />

        <h2 class="intro-title">${escapeHtml(t("intro.title"))}</h2>

        <p class="intro-text">
          ${escapeHtml(t("intro.text1"))}
        </p>

        <p class="intro-text">
          ${escapeHtml(t("intro.text2"))}
        </p>

        <button class="btn intro-btn" id="introNextBtn" type="button">
          ${escapeHtml(t("intro.cta"))}
        </button>
      </div>

      ${navHTML("")}
    </div>
  `;

  document.getElementById("introNextBtn")?.addEventListener("click", () => {
    if (isStandalone()) return renderQuestion(0);
    return renderInstall(detectPlatform());
  });

  bindNav();
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

        <button class="btn btn-installed" id="installContinueBtn" type="button">
          ${escapeHtml(t("install.continueDone"))} ✓
        </button>

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

function renderQuestion(index, fromOverview = false) {
  setLastScreen({ screen: "question", index, fromOverview });

  const quiz = getQuiz();
  const answers = loadAnswers();
  const selected = typeof answers[String(index)] === "number" ? answers[String(index)] : null;
  const isLast = index === quiz.length - 1;
  const nextLabel = fromOverview ? t("quiz.next") : isLast ? t("quiz.done") : t("quiz.next");
  const imgSrc = quiz[index].img;

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content">
        ${imgSrc ? `<img class="question-img question-img--hero" src="${imgSrc}" alt="" />` : ""}

        ${progressHTML(index)}

        <h2 class="question">${escapeHtml(t("quiz.questionTitle", { n: index + 1 }))}</h2>
        <p>${escapeHtml(quiz[index].q)}</p>

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
    if (fromOverview) return renderOverview();
    if (index > 0) return renderQuestion(index - 1);
    return renderStart();
  });

  document.getElementById("nextBtn")?.addEventListener("click", () => {
    const picked = getPickedOptionIndex(index);
    if (picked !== null) saveAnswer(index, picked);

    const correct = countCorrect();
    const total = quiz.length;

    if (fromOverview) {
      if (correct === total) return renderDone();

      const nextWrong = getNextWrongQuestionIndex(index);
      if (nextWrong !== null) return renderQuestion(nextWrong, true);

      return renderOverview();
    }

    if (!isLast) return renderQuestion(index + 1);

    if (correct === total) return renderDone();

    return renderOverview();
  });

  bindNav();
}

function renderOverview() {
  setLastScreen({ screen: "overview" });

  const quiz = getQuiz();
  const correct = countCorrect();
  const total = quiz.length;
  const allCorrect = correct === total;
  const headline = allCorrect ? t("overview.headline.allCorrect") : t("overview.headline.notAllCorrect");
  const answers = loadAnswers();

  let list = "";

  quiz.forEach((item, i) => {
    const picked = answers[String(i)];
    const has = typeof picked === "number" && Number.isFinite(picked);
    const isCorrectAnswer = has && picked === item.correct;

    const statusSymbol = !has ? "–" : isCorrectAnswer ? "✓" : "✕";
    const statusClass = !has ? "is-empty" : isCorrectAnswer ? "is-correct" : "is-wrong";
    const answerClass = !has ? "" : isCorrectAnswer ? "is-correct" : "is-wrong";
    const pickedText = has ? item.options[picked] : "";

    const unlocked = isLetterUnlocked(i);
    const rewardText = getRewardLetterChars(i).join(" ");

    const actionHTML = allCorrect
      ? `
        <button
          class="editIconBtn lockIconBtn ${unlocked ? "is-unlocked" : ""}"
          data-unlock-index="${i}"
          type="button"
          aria-label="${escapeHtml(t("overview.unlockAria", { n: i + 1 }))}"
        >
          <img class="editIconImg" src="${unlocked ? ICON_UNLOCK : ICON_LOCK}" alt="" />
        </button>
        <div class="overview-unlock-state">
          ${escapeHtml(unlocked ? `${rewardText} · ${t("overview.unlocked")}` : t("overview.locked"))}
        </div>
      `
      : `
        <button
          class="editIconBtn"
          data-index="${i}"
          type="button"
          aria-label="${escapeHtml(t("overview.editAria", { n: i + 1 }))}"
        >
          <img class="editIconImg" src="${ICON_EDIT}" alt="" />
        </button>
      `;

    list += `
      <div class="overview-item">
        <div class="overview-head">
          <strong>${escapeHtml(t("quiz.questionTitle", { n: i + 1 }))}</strong>
          <span class="q-status ${statusClass}" aria-label="${escapeHtml(
            !has ? t("overview.notAnswered") : isCorrectAnswer ? t("overview.correct") : t("overview.wrong")
          )}">
            ${statusSymbol}
          </span>
        </div>

        <div class="overview-q">${escapeHtml(item.q)}</div>

        <div class="overview-answer ${answerClass}">
          ${has ? escapeHtml(pickedText) : ""}
        </div>

        ${actionHTML}
      </div>
    `;
  });

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}
      ${unlockOverlayHTML("")}

      <div class="content">
        <h2 class="overview-title">${escapeHtml(headline)}</h2>
        ${list}
      </div>

      ${navHTML("overview")}
    </div>
  `;

  document.querySelectorAll(".editIconBtn[data-index]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      renderQuestion(idx, true);
    });
  });

  document.querySelectorAll(".lockIconBtn[data-unlock-index]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.unlockIndex, 10);
      if (!Number.isInteger(idx)) return;

      if (isLetterUnlocked(idx)) {
        showAlreadyUnlockedOverlay();
        return;
      }

      const letters = unlockLetterReward(idx);
      showUnlockOverlay(letters.join(" "), idx, e.currentTarget);
    });
  });

  bindNav();
}

function showUnlockOverlay(chunk, index, triggerEl) {
  const overlay = document.getElementById("unlockOverlay");
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="unlock-overlay-card">
      <div class="unlock-overlay-title">${escapeHtml(t("unlock.title"))}</div>
      <div class="unlock-letters unlock-letters--burst">${escapeHtml(chunk)}</div>
    </div>
  `;
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("is-visible");

  setTimeout(async () => {
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");

    await animateLettersToBoard(chunk, triggerEl);

    if (index === LETTER_REWARDS.length - 1 || allLetterRewardsUnlocked()) {
      renderBoard();
      return;
    }

    renderOverview();
  }, 900);
}

function showAlreadyUnlockedOverlay() {
  const overlay = document.getElementById("unlockOverlay");
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="unlock-overlay-card">
      <div class="unlock-overlay-title" style="color:#bb0056;">
        ${escapeHtml(t("unlock.alreadyTitle"))}
      </div>

      <div style="font-size:18px;">
        ${escapeHtml(t("unlock.alreadyText"))}
      </div>
    </div>
  `;

  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("is-visible");

  setTimeout(() => {
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
  }, 1500);
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

function boardSlotsHTML(slots) {
  const topSlots = slots.slice(0, TOP_ROW_SLOT_COUNT);
  const bottomSlots = slots.slice(TOP_ROW_SLOT_COUNT);

  const renderRow = (rowSlots, rowOffset, rowClass) => `
    <div class="board-slot-row ${rowClass}">
      ${rowSlots
        .map((letterId, index) => {
          const absoluteIndex = rowOffset + index;
          const letter = letterId ? getLetterById(letterId) : null;
          return `
            <div class="board-slot ${letter ? "has-letter" : ""}" data-slot-index="${absoluteIndex}" aria-label="${escapeHtml(
              t("board.slotAria", { n: absoluteIndex + 1 })
            )}">
              ${
                letter
                  ? `
                    <button
                      class="board-letter board-letter--slot"
                      type="button"
                      data-letter-id="${letter.id}"
                      data-origin-slot="${absoluteIndex}"
                      aria-label="${escapeHtml(letter.char)}"
                    >
                      ${escapeHtml(letter.char)}
                    </button>
                  `
                  : `<span class="board-slot-placeholder">·</span>`
              }
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  return `
    <div class="board-slot-grid" id="boardSlotGrid">
      ${renderRow(topSlots, 0, "is-top")}
      ${renderRow(bottomSlots, TOP_ROW_SLOT_COUNT, "is-bottom")}
    </div>
  `;
}

function boardPoolHTML(letters) {
  return `
    <div class="board-pool">
      <div class="board-pool-title">${escapeHtml(t("board.poolTitle"))}</div>
      <div class="board-pool-dropzone" id="boardPoolDropzone">
        ${letters
          .map(
            (letter) => `
              <button
                class="board-letter board-letter--pool"
                type="button"
                data-letter-id="${letter.id}"
                data-origin-slot=""
                aria-label="${escapeHtml(letter.char)}"
              >
                ${escapeHtml(letter.char)}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderBoard(message = "") {
  setLastScreen({ screen: "board" });

  const unlockedIds = getUnlockedLetterIds();
  const hasLetters = unlockedIds.length > 0;
  const allUnlocked = allLetterRewardsUnlocked();
  const slots = ensureBoardSlots();
  const poolLetters = getAvailableBoardLetters();
  const solved = isBoardSolved();

  root.innerHTML = `
    <div class="screen screen--board">
      ${headerHTML()}
      ${confettiHTML()}

      <div class="content board-content">
        <h2 class="board-title">${escapeHtml(t("board.title"))}</h2>
        <p class="board-intro">${escapeHtml(t("board.intro"))}</p>

        ${
          !hasLetters
            ? `<div class="overview-notice">${escapeHtml(t("board.empty"))}</div>`
            : `
              <div class="board-visual" style="background-image:url('${BOARD_BG}')">
                <div class="board-surface">
                  ${boardSlotsHTML(slots)}
                </div>
              </div>

              <p class="board-hint">${escapeHtml(allUnlocked ? t("board.hint") : t("board.incomplete"))}</p>

              ${boardPoolHTML(poolLetters)}

              ${
                message
                  ? `<div class="overview-notice board-notice">${escapeHtml(message)}</div>`
                  : ""
              }

              <button class="btn" id="boardCheckBtn" type="button">${escapeHtml(t("board.check"))}</button>
              <div id="boardSuccessHost"></div>
            `
        }
      </div>

      ${navHTML("board")}
    </div>
  `;

  if (hasLetters) {
    bindBoardInteractions();

    document.getElementById("boardCheckBtn")?.addEventListener("click", () => {
      if (!allUnlocked) {
        return renderBoard(t("board.incomplete"));
      }

      if (!isBoardSolved()) {
        return renderBoard(t("board.tryAgain"));
      }

      markBoardSolved();
      renderBoardSuccess();
    });

    if (solved) {
      renderBoardSuccess();
    }
  }

  bindNav();
}

function renderBoardSuccess() {
  root.innerHTML = `
    <div class="screen">
      ${confettiHTML()}
      ${headerHTML()}

      <div class="content done-content">

        <h1 class="done-title">
          Geschafft!
        </h1>

        <p class="done-text">
        Ihr habt das Lösungswort gefunden: <strong>ALGORITHMUS</strong>.<br>
        Zeigt es vor, dann erhaltet Ihr am Ende der Veranstaltung eine kleine Überraschung!
        </p>

        <img
          class="done-hero"
          src="./assets/img/quiz/success-screen.jpg"
          alt="Frau N. Hofer klatscht"
        />

        <button class="btn" id="boardBackHome">
          Zur Startseite
        </button>

      </div>

      ${navHTML("home")}
    </div>
  `;

  document
    .getElementById("boardBackHome")
    ?.addEventListener("click", () => renderStart());

  bindNav();
  launchConfetti();
}

/* ===== Pointer-based Board Drag ===== */
function bindBoardInteractions() {
  const letters = Array.from(document.querySelectorAll(".board-letter"));
  const poolZone = document.getElementById("boardPoolDropzone");
  if (!letters.length) return;

  let dragState = null;

  function clearStates() {
    document.querySelectorAll(".board-slot").forEach((slot) => {
      slot.classList.remove("is-over");
    });
    if (poolZone) {
      poolZone.classList.remove("is-over");
    }
  }

  function finishDrag(applyDrop = true) {
    if (!dragState) return;

    const { clone, letterId, sourceSlot } = dragState;

    if (clone?.parentNode) {
      clone.remove();
    }

    clearStates();

    if (applyDrop) {
      const overSlotEl = dragState.overSlotIndex !== null
        ? document.querySelector(`.board-slot[data-slot-index="${dragState.overSlotIndex}"]`)
        : null;

      if (overSlotEl) {
        moveLetterToSlot(letterId, dragState.overSlotIndex);
      } else if (dragState.overPool && sourceSlot !== null) {
        removeLetterFromSlot(letterId);
      }
    }

    dragState = null;
    renderBoard("");
  }

  function updateDrag(clientX, clientY) {
    if (!dragState) return;

    dragState.clone.style.left = `${clientX - dragState.offsetX}px`;
    dragState.clone.style.top = `${clientY - dragState.offsetY}px`;

    const el = document.elementFromPoint(clientX, clientY);
    const slot = el?.closest?.(".board-slot");
    const pool = el?.closest?.(".board-pool-dropzone");

    clearStates();
    dragState.overSlotIndex = null;
    dragState.overPool = false;

    if (slot) {
      slot.classList.add("is-over");
      dragState.overSlotIndex = Number(slot.dataset.slotIndex);
      return;
    }

    if (pool) {
      pool.classList.add("is-over");
      dragState.overPool = true;
    }
  }

  letters.forEach((letterBtn) => {
    letterBtn.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;

      const rect = letterBtn.getBoundingClientRect();
      const clone = letterBtn.cloneNode(true);
      clone.classList.add("board-letter--floating");
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;

      document.body.appendChild(clone);

      dragState = {
        pointerId: e.pointerId,
        letterId: letterBtn.dataset.letterId,
        sourceSlot:
          letterBtn.dataset.originSlot === "" || letterBtn.dataset.originSlot == null
            ? null
            : Number(letterBtn.dataset.originSlot),
        clone,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        overSlotIndex: null,
        overPool: false,
      };

      letterBtn.setPointerCapture?.(e.pointerId);
      clone.style.left = `${e.clientX - dragState.offsetX}px`;
      clone.style.top = `${e.clientY - dragState.offsetY}px`;

      e.preventDefault();
    });

    letterBtn.addEventListener("pointermove", (e) => {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      updateDrag(e.clientX, e.clientY);
      e.preventDefault();
    });

    letterBtn.addEventListener("pointerup", (e) => {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      finishDrag(true);
      e.preventDefault();
    });

    letterBtn.addEventListener("pointercancel", (e) => {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      finishDrag(false);
      e.preventDefault();
    });
  });

  window.addEventListener(
    "pointermove",
    (e) => {
      if (!dragState) return;
      updateDrag(e.clientX, e.clientY);
    },
    { passive: false }
  );

  window.addEventListener(
    "pointerup",
    () => {
      if (!dragState) return;
      finishDrag(true);
    },
    { passive: false }
  );

  window.addEventListener(
    "pointercancel",
    () => {
      if (!dragState) return;
      finishDrag(false);
    },
    { passive: false }
  );
}

function renderHelp(returnTo = null) {
  const prev = returnTo || getLastScreen() || { screen: "home" };
  setLastScreen({ screen: "help", returnTo: prev });

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content">
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
    if (target.screen === "intro") return renderIntro();
    if (target.screen === "install") return renderInstall(target.platform || "ios");
    if (target.screen === "question") return renderQuestion(target.index ?? 0, Boolean(target.fromOverview));
    if (target.screen === "overview") return renderOverview();
    if (target.screen === "board") return renderBoard();
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
