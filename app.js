const root = document.getElementById("girlsday-app");
if (!root) throw new Error('Container "#girlsday-app" nicht gefunden.');

/* ===== Quiz ===== */
const QUIZ = [
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
  const answers = loadAnswers();
  answers[String(questionIndex)] = optionIndex;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

function countCorrect() {
  const answers = loadAnswers();
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
        <span class="nav-label">Start</span>
      </button>

      <button class="nav-item ${active === "overview" ? "active" : ""}" data-nav="overview" type="button">
        <img class="nav-icon-img" src="${ICON_OVERVIEW}" alt="" />
        <span class="nav-label">Antworten</span>
      </button>

      <button class="nav-item ${active === "help" ? "active" : ""}" data-nav="help" type="button">
        <img class="nav-icon-img" src="${ICON_HELP}" alt="" />
        <span class="nav-label">Hilfe</span>
      </button>

      <button class="nav-item ${active === "rate" ? "active" : ""}" data-nav="rate" type="button">
        <img class="nav-icon-img" src="${ICON_RATE}" alt="" />
        <span class="nav-label">Bewerten</span>
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
  const total = QUIZ.length;
  const current = index + 1;
  const pct = Math.round((current / total) * 100);

  return `
    <div class="progress">
      <div class="progress-meta">
        <span class="progress-step">Frage ${current} von ${total}</span>
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
  const starCount = reduce ? 6 : (isMobile ? 10 : 12);
  const formulaCount = reduce ? 4 : (isMobile ? 8 : 10);

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

  root.innerHTML = `
    <div class="screen screen--start">
      ${headerHTML()}

      <div class="content start-content">
        <div class="start-hero">
          <img class="start-building" src="${START_BUILDING}" alt="" />
          <div class="float-confetti" id="startMotion" aria-hidden="true"></div>
          <img class="start-figure" src="${START_HOFER}" alt="Frau N. Hofer" />
          <h1 class="start-title start-title--hero">Hallo, ich bin<br>Frau N. Hofer!</h1>
        </div>

        <p class="start-text start-text--below">
          Willkommen an unserem Institut! Entdeckt mit mir gemeinsam spannende
          Stationen rund um Mathematik und Forschung.
        </p>

        <button class="btn start-cta" id="startBtn" type="button">Los geht’s</button>
      </div>

      ${navHTML("home")}
    </div>
  `;

  document.getElementById("startBtn")?.addEventListener("click", () => renderInstall("ios"));

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

        <h2>App zum Homescreen hinzufügen</h2>
        <p>Für das beste Erlebnis empfehlen wir diese Installation.</p>

        <div class="install-tabs">
          <button class="tab-btn ${isIOS ? "active" : ""}" data-platform="ios" type="button">iPhone</button>
          <button class="tab-btn ${!isIOS ? "active" : ""}" data-platform="android" type="button">Android</button>
        </div>

        ${
          isIOS
            ? `
              <div class="install-steps">
                <div class="install-step">
                  <img class="install-step-icon" src="${ICON_IOS_SHARE}" alt="" />
                  <div class="install-step-text">Tippe unten auf „Teilen“</div>
                </div>

                <div class="install-step">
                  <img class="install-step-icon" src="${ICON_IOS_PLUS}" alt="" />
                  <div class="install-step-text">Wähle „Zum Home-Bildschirm“</div>
                </div>

                <div class="install-step">
                  <img class="install-step-icon" src="${ICON_IOS_CHECK}" alt="" />
                  <div class="install-step-text">Tippe auf „Hinzufügen“</div>
                </div>
              </div>
            `
            : `
              <img class="install-android-img" src="${INSTALL_ASSETS.androidStep}" alt="Android Installation" />
            `
        }

        <button class="btn" id="installContinueBtn" type="button">Weiter zur Rallye</button>

        <p class="install-skip" id="installSkipBtn" role="button" tabindex="0">
          Ohne Installation fortfahren
        </p>
      </div>

      ${navHTML("")}
    </div>
  `;

  document.querySelectorAll(".tab-btn").forEach((btn) => {
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

  const answers = loadAnswers();
  const selected = typeof answers[String(index)] === "number" ? answers[String(index)] : null;

  const isLast = index === QUIZ.length - 1;
  const nextLabel = isLast ? "Fertig" : "Weiter";

  const imgSrc = QUIZ[index].img;

  root.innerHTML = `
    <div class="screen">
      ${headerHTML()}

      <div class="content">
        ${imgSrc ? `<img class="question-img question-img--hero" src="${imgSrc}" alt="" />` : ""}

        ${progressHTML(index)}

        <h2 class="question">Frage ${index + 1}</h2>
        <p>${escapeHtml(QUIZ[index].q)}</p>

        <div class="mc-group" role="radiogroup" aria-label="Antwortmöglichkeiten">
          ${optionsHTML(index, selected)}
        </div>

        <div class="btn-row">
          <button class="btn secondary" id="backBtn" type="button"><span>Zurück</span></button>
          <button class="btn" id="nextBtn" type="button">${nextLabel}</button>
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
        if (st) st.textContent = "Gespeichert.";
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

    setNotice(
      "Ihr habt leider nicht alle Fragen richtig beantwortet. Schaut in der Übersicht nach, welche Antworten noch nicht stimmen, und korrigiert sie."
    );
    return renderOverview();
  });

  bindNav();
}

function renderOverview() {
  setLastScreen({ screen: "overview" });

  const notice = popNotice();
  const correct = countCorrect();
  const total = QUIZ.length;
  const allCorrect = correct === total;

  const headline = allCorrect
    ? "Zeigt eure richtigen Antworten und holt euch die Buchstaben für euer Lösungswort ab!"
    : "Ihr habt leider nicht alle Fragen richtig beantwortet. Schaut in der Übersicht nach, welche Antworten noch nicht stimmen, und korrigiert sie.";

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
          <strong>Frage ${i + 1}</strong>
          <span class="q-status ${statusClass}" aria-label="${!has ? "nicht beantwortet" : isCorrect ? "richtig" : "falsch"}">
            ${statusSymbol}
          </span>
        </div>

        <div class="overview-q">${escapeHtml(item.q)}</div>

        <div class="overview-answer ${answerClass}">
          ${has ? escapeHtml(pickedText) : ""}
        </div>

        <button class="editIconBtn" data-index="${i}" type="button" aria-label="Antwort zu Frage ${i + 1} bearbeiten">
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
        ${notice ? `<div class="overview-notice">${escapeHtml(notice)}</div>` : ""}
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
        <h1 class="done-title">Toll gemacht!</h1>

        <p class="done-text">
          Ihr habt alle Fragen richtig. Holt euch bei euren Betreuer:innen Buchstaben ab und findet das Lösungswort!
        </p>

        <img class="done-hero" src="${SUCCESS_IMAGE}" alt="" />

        <button class="btn" id="overviewBtn" type="button">Zu euren Antworten</button>
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
        <h2>FAQ</h2>

        <div class="faq">
          <h3>Wie funktioniert die Rallye?</h3>
          <p>Ihr beantwortet die Fragen gemeinsam. Eure Auswahl wird automatisch gespeichert.</p>

          <h3>Wie bearbeiten wir Antworten?</h3>
          <p>Geht auf „Antworten“ und klickt bei der Frage auf das Stift-Symbol.</p>

          <h3>Was passiert am Ende?</h3>
          <p>Wenn ihr alles richtig habt, bekommt ihr den Abschluss. Sonst seht ihr in der Übersicht, was ihr nochmal prüfen solltet.</p>
        </div>

        <button class="btn" id="backToRallyBtn" type="button">Zurück</button>
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
        <h2>Gebt uns Feedback</h2>
        <p class="intro-text">
          Wie hat euch der Girls’ Day gefallen? Eure Rückmeldung hilft uns,
          den Tag noch besser zu machen.
        </p>
        <p class="scale-hint">1 = trifft gar nicht zu, 5 = trifft voll zu</p>

        <div class="scale-block">
          <div class="scale-q">Ich habe verstanden, was am Institut gemacht wird.</div>
          <div class="scale-row">${scaleRadios("q_understand", saved.q_understand)}</div>
        </div>

        <div class="scale-block">
          <div class="scale-q">Die Rallye war abwechslungsreich.</div>
          <div class="scale-row">${scaleRadios("q_fun", saved.q_fun)}</div>
        </div>

        <div class="scale-block">
          <div class="scale-q">Die Aufgaben waren gut machbar.</div>
          <div class="scale-row">${scaleRadios("q_easy", saved.q_easy)}</div>
        </div>

        <div class="scale-block">
          <div class="scale-q">Ich würde den Girls’ Day hier weiterempfehlen.</div>
          <div class="scale-row">${scaleRadios("q_recommend", saved.q_recommend)}</div>
        </div>

        <label class="label" for="rateText">Was war besonders gut – und was könnten wir besser machen?</label>
        <textarea id="rateText" class="input" rows="4" placeholder="Kurz euer Feedback...">${escapeHtml(saved.text || "")}</textarea>

        <button class="btn" id="rateSaveBtn" type="button">Feedback abschicken</button>
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
        <h1>Danke für euer Feedback!</h1>
        <p>Eure Rückmeldung hilft uns, den Girls’ Day weiter zu verbessern.</p>

        <img class="done-hero" src="${SUCCESS_IMAGE}" alt="" />

        <button class="btn" id="backHomeBtn" type="button">Zur Startseite</button>
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