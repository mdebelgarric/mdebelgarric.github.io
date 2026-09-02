<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Word of the day</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Spectral:wght@500;600&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
<style>
  :root {
    --paper: #EFEDE4;
    --ink: #21261F;
    --ink-soft: #55594E;
    --line: #B7B29E;
    --correct: #2F5D50;
    --present: #B08947;
    --absent: #C9C4B5;
    --card: #FBFAF6;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--paper);
    color: var(--ink);
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .card {
    width: 100%;
    max-width: 420px;
    background: var(--card);
    border: 1px solid var(--line);
    padding: 32px 28px;
  }

  h1 {
    font-family: 'Spectral', serif;
    font-weight: 600;
    font-size: 1.4rem;
    margin: 0 0 4px;
  }

  .subtitle {
    font-size: 0.85rem;
    color: var(--ink-soft);
    margin: 0 0 24px;
    line-height: 1.5;
  }

  /* La grille : une ligne par essai, une case par lettre */
  #grid {
    display: grid;
    gap: 6px;
    margin-bottom: 20px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(var(--word-length, 6), 1fr);
    gap: 6px;
  }

  .tile {
    aspect-ratio: 1;
    border: 2px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--ink);
    background: var(--card);
    transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .tile.correct { background: var(--correct); border-color: var(--correct); color: #fff; }
  .tile.present { background: var(--present); border-color: var(--present); color: #fff; }
  .tile.absent  { background: var(--absent);  border-color: var(--absent);  color: var(--ink); }
  .tile.pop     { transform: scale(1.08); }

  #input-row {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  #letter-input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid var(--line);
    background: var(--card);
    color: var(--ink);
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }
  #letter-input:focus { outline: 2px solid var(--correct); outline-offset: 1px; }

  button {
    border: 1px solid var(--ink);
    background: var(--ink);
    color: var(--card);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.85rem;
    padding: 10px 16px;
    cursor: pointer;
  }
  button:disabled { opacity: 0.4; cursor: not-allowed; }

  #message {
    min-height: 1.4em;
    font-size: 0.85rem;
    color: var(--ink-soft);
  }

  #message.win  { color: var(--correct); font-weight: 500; }
  #message.lose { color: #9C4A3B; font-weight: 500; }
</style>
</head>
<body>

<div class="card">
  <h1>Word of the day</h1>
  <p class="subtitle">How to play: Guess the hidden word in 6 tries. Dark tiles mean the letter is in the right spot, light tiles mean it's in the word but misplaced, and grey tiles mean it's not in the word.</p>
  <div id="grid"></div>
  <div id="input-row">
    <input id="letter-input" type="text" maxlength="12" autocomplete="off" placeholder="Your word...">
    <button id="submit-btn">Valider</button>
  </div>
  <p id="message"></p>
</div>

<script>
/* =========================================================
   1) LA LISTE DE MOTS
   Idée : garder tous les mots de la même longueur au début
   simplifie beaucoup l'affichage de la grille.
   À toi d'agrandir cette liste avec ton propre vocabulaire.
   ========================================================= */
const WORDS = [
  "EVOLUTION", "GAMMARID", "MODELLING", "DYNAMIC", "ENERGY",
  "BUDGET", "MODELS", "TRAITS", "SURVIVAL", "TOXICANT",
  "ENVIRONMENT", "TEMPERATURE", "GLOBAL", "CLIMATE"
];

/* =========================================================
   2) CHOISIR LE MOT DU JOUR DE FAÇON DÉTERMINISTE
   Principe Wordle/Tusmo : pas de tirage aléatoire à chaque
   visite. On calcule un index à partir de la date, identique
   pour tout le monde le même jour.

   On utilise Date.UTC(...) plutôt que new Date() tout court
   pour que le changement de mot se fasse au même instant
   pour tous les visiteurs, quel que soit leur fuseau horaire
   (sinon, le mot changerait à minuit heure locale de chacun,
   donc pas au même moment pour tout le monde).
   ========================================================= */
function getTodayIndex() {
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const epoch = Date.UTC(2024, 0, 1); // date de référence arbitraire, fixe pour toujours
  const daysSinceEpoch = Math.floor((todayUTC - epoch) / 86400000); // 86 400 000 ms = 1 jour
  return daysSinceEpoch % WORDS.length;
}

function getTodayKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
}

const WORD = WORDS[getTodayIndex()];
const WORD_LENGTH = WORD.length;
const MAX_TRIES = 6;

/* =========================================================
   3) NORMALISATION (utile si tu ajoutes des mots accentués)
   Pas utilisé par la liste actuelle (sans accents), mais prêt
   pour le jour où tu voudras écrire "GÉNÉTIQUE" par exemple.
   ========================================================= */
function normalize(str) {
  return str
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // enlève les accents
}

/* =========================================================
   4) ÉTAT DU JEU, SAUVEGARDÉ DANS localStorage
   Clé unique par jour : si la personne revient plus tard
   dans la journée, elle retrouve sa grille telle quelle.
   ========================================================= */
const storageKey = "tusmo-scientifique-" + getTodayKey();

function loadState() {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : { guesses: [], finished: false, won: false };
}

function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

let state = loadState();

/* =========================================================
   5) CONSTRUCTION DE LA GRILLE
   ========================================================= */
const gridEl = document.getElementById("grid");
gridEl.style.setProperty("--word-length", WORD_LENGTH);

function buildGrid() {
  gridEl.innerHTML = "";
  for (let r = 0; r < MAX_TRIES; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      row.appendChild(tile);
    }
    gridEl.appendChild(row);
  }
}
buildGrid();

/* =========================================================
   6) ÉVALUER UN ESSAI (logique façon Wordle/Tusmo)
   - "correct" : bonne lettre, bonne position
   - "present" : lettre présente ailleurs dans le mot
   - "absent"  : lettre absente du mot
   Gère aussi les lettres en double correctement.
   ========================================================= */
function evaluateGuess(guess) {
  const result = new Array(WORD_LENGTH).fill("absent");
  const wordLetters = WORD.split("");
  const guessLetters = guess.split("");

  // Passe 1 : marquer les lettres bien placées
  guessLetters.forEach((letter, i) => {
    if (letter === wordLetters[i]) {
      result[i] = "correct";
      wordLetters[i] = null; // consommée, ne peut plus être réutilisée
    }
  });

  // Passe 2 : marquer les lettres présentes mais mal placées
  guessLetters.forEach((letter, i) => {
    if (result[i] === "correct") return;
    const idx = wordLetters.indexOf(letter);
    if (idx !== -1) {
      result[i] = "present";
      wordLetters[idx] = null;
    }
  });

  return result;
}

/* =========================================================
   7) AFFICHAGE D'UN ESSAI DANS LA GRILLE
   ========================================================= */
function renderGuess(guess, rowIndex) {
  const result = evaluateGuess(guess);
  const row = gridEl.children[rowIndex];
  guess.split("").forEach((letter, i) => {
    const tile = row.children[i];
    tile.textContent = letter;
    tile.classList.add(result[i], "pop");
    setTimeout(() => tile.classList.remove("pop"), 150);
  });
  return result;
}

function renderAllGuesses() {
  state.guesses.forEach((guess, i) => renderGuess(guess, i));
}
renderAllGuesses();

/* =========================================================
   8) MESSAGE ET FIN DE PARTIE
   ========================================================= */
const messageEl = document.getElementById("message");
const inputEl = document.getElementById("letter-input");
const submitBtn = document.getElementById("submit-btn");

function setMessage(text, kind) {
  messageEl.textContent = text;
  messageEl.className = kind || "";
}

function lockGame() {
  inputEl.disabled = true;
  submitBtn.disabled = true;
}

if (state.finished) {
  lockGame();
  setMessage(
    state.won ? "Congrats, you find the word of the day !" : `The word was ${WORD}. Come back tomorrow !`,
    state.won ? "win" : "lose"
  );
}

/* =========================================================
   9) SOUMISSION D'UN ESSAI
   ========================================================= */
function submitGuess() {
  const guess = normalize(inputEl.value.trim());

  if (guess.length !== WORD_LENGTH) {
    setMessage(`The word must be ${WORD_LENGTH} letters long.`);
    return;
  }

  const rowIndex = state.guesses.length;
  renderGuess(guess, rowIndex);
  state.guesses.push(guess);
  inputEl.value = "";

  if (guess === WORD) {
    state.finished = true;
    state.won = true;
    saveState(state);
    lockGame();
    setMessage("Congrats, you find the word of the day !", "win");
    return;
  }

  if (state.guesses.length >= MAX_TRIES) {
    state.finished = true;
    state.won = false;
    saveState(state);
    lockGame();
    setMessage(`The word was ${WORD}. Come back tomorrow !`, "lose");
    return;
  }

  saveState(state);
  setMessage(`Attempt ${state.guesses.length} / ${MAX_TRIES}`);
}

submitBtn.addEventListener("click", submitGuess);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitGuess();
});
</script>

</body>
</html>