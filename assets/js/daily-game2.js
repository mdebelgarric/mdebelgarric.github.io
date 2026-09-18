(function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .game-card {
        --correct: #571487;   /* dark purple : right letter, right spot   */
        --present: #ff7ef9;   /* bright pink : right letter, wrong spot   */
        --absent:  #fae3ff;   /* light pink  : letter not in the word     */
        --ink:     #21261F;
        --line:    #cfc7d6;
      }
  
      #grid { display: grid; gap: 6px; margin: 16px 0; }
  
      .row {
        display: grid;
        grid-template-columns: repeat(var(--word-length, 6), 1fr);
        gap: 6px;
        transition: background 0.2s ease;
        border-radius: 4px;
      }
  
      /* the row the player is currently filling in */
      .row.active { background: rgba(87, 20, 135, 0.07); }
      .row.active .tile:not(.correct):not(.present):not(.absent) {
        border-color: var(--ink);
      }
  
      .tile {
        aspect-ratio: 1;
        border: 2px solid var(--line);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.05rem;
        color: var(--ink);
        background: transparent;
        transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
      }
      .tile.filled { border-color: var(--ink); }
      .tile.pop    { transform: scale(1.08); }
  
      .tile.correct { background: var(--correct); border-color: var(--correct); color: #fff; }
      .tile.present { background: var(--present); border-color: var(--present); color: #fff; }
      .tile.absent  { background: var(--absent);  border-color: var(--absent);  color: var(--ink); }
  
      #message {
        min-height: 1.4em;
        font-size: 0.85rem;
        margin: 4px 0 16px;
      }
      #message.win  { color: var(--correct); font-weight: 600; }
      #message.lose { color: #9C4A3B; font-weight: 600; }
  
      #keyboard { display: flex; flex-direction: column; gap: 6px; }
      .kb-row { display: flex; gap: 5px; justify-content: center; }
  
      .key {
        flex: 1;
        max-width: 34px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1px solid var(--line);
        border-radius: 4px;
        font-weight: 500;
        font-size: 0.8rem;
        color: var(--ink);
        cursor: pointer;
        user-select: none;
        padding: 0;
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .key:hover  { border-color: var(--ink); }
      .key.wide   { max-width: 52px; font-size: 1rem; }
      .key.correct { background: var(--correct); border-color: var(--correct); color: #fff; }
      .key.present { background: var(--present); border-color: var(--present); color: #fff; }
      .key.absent  { background: var(--absent);  border-color: var(--absent);  color: var(--ink); }
    `;
    document.head.appendChild(style);
  })();
  
  /* =========================================================
     1) THE WORD LIST — edit freely, lengths can vary.
     ========================================================= */
  const WORDS = [
    "MODELLING", "DYNAMIC", "ENERGY", "BUDGET", "MODELS", "THEORY",
    "METABOLISM", "REPRODUCTION", "RESERVE", "STRUCTURE", "ASSIMILATION",
    "ALLOCATION", "MAINTENANCE", "TURNOVER", "CLEARANCE", "MATURATION",
    "TOXICOLOGY", "TOXICANT", "POLLUTION", "EXPOSURE", "METALS",
    "PESTICIDE", "CHEMICALS", "RESPONSE", "TOXICITY", "STRESSOR",
    "SENTINEL", "EFFECTS", "CADMIUM", "COPPER", "NICKEL", "LEAD",
    "GAMMARUS", "GAMMARID", "DAPHNIA", "TROUT", "FRESHWATER",
    "ORGANISM", "SPECIES", "POPULATION", "COMMUNITY", "AQUATIC",
    "ECOSYSTEM", "HABITAT", "RIVERS", "STREAMS", "ECTOTHERM",
    "EVOLUTION", "TRAITS", "SURVIVAL", "FITNESS", "LIFESPAN",
    "TRADEOFF", "PLASTICITY", "ADAPTATION", "PHENOTYPE", "CONSTRAINT",
    "SELECTION", "GENETICS", "THERMAL", "DIVERSITY",
    "BAYESIAN", "INFERENCE", "ANALYSIS", "DATASET", "PARAMETER",
    "ESTIMATION", "STATS", "METRICS", "VALIDATION", "PIPELINE",
    "CLIMATE", "WARMING", "GLOBAL", "CHANGE", "IMPACT",
    "PHYSIOLOGY", "STRESS"
  ];
  
  /* =========================================================
     2) PICK TODAY'S WORD DETERMINISTICALLY (UTC-based)
     ========================================================= */
  function getTodayIndex() {
    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const epoch = Date.UTC(2024, 0, 1);
    const daysSinceEpoch = Math.floor((todayUTC - epoch) / 86400000);
    return daysSinceEpoch % WORDS.length;
  }
  
  function getTodayKey() {
    const now = new Date();
    return `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
  }
  
  const WORD = WORDS[getTodayIndex()];
  const WORD_LENGTH = WORD.length;
  const MAX_TRIES = 6;
  
  function normalize(str) {
    return str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  /* =========================================================
     3) GAME STATE (localStorage, one key per day)
     ========================================================= */
  const storageKey = "daily-science-word-" + getTodayKey();
  
  function loadState() {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : { guesses: [], finished: false, won: false };
  }
  function saveState(state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }
  let state = loadState();
  
  /* =========================================================
     4) EVERYTHING BELOW ONLY RUNS IF #grid EXISTS ON THE PAGE
     ========================================================= */
  const gridEl = document.getElementById("grid");
  if (gridEl) {
    const keyboardEl = document.getElementById("keyboard");
    const messageEl = document.getElementById("message");
  
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
  
    /* ---- evaluate one guess against WORD ---- */
    function evaluateGuess(guess) {
      const result = new Array(WORD_LENGTH).fill("absent");
      const wordLetters = WORD.split("");
      const guessLetters = guess.split("");
  
      guessLetters.forEach((letter, i) => {
        if (letter === wordLetters[i]) {
          result[i] = "correct";
          wordLetters[i] = null;
        }
      });
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
  
    function renderGuess(guess, rowIndex) {
      const result = evaluateGuess(guess);
      const row = gridEl.children[rowIndex];
      guess.split("").forEach((letter, i) => {
        const tile = row.children[i];
        tile.textContent = letter;
        tile.classList.remove("filled");
        tile.classList.add(result[i], "pop");
        setTimeout(() => tile.classList.remove("pop"), 150);
      });
      return result;
    }
  
    /* ---- letters locked in from earlier correct guesses ---- */
    let knownLetters = new Array(WORD_LENGTH).fill(null);
    let currentGuess = new Array(WORD_LENGTH).fill("");
  
    function initCurrentGuess() {
      currentGuess = knownLetters.map((letter) => letter || "");
    }
  
    function updateCurrentRowDisplay() {
      if (state.finished) return;
      const row = gridEl.children[state.guesses.length];
      if (!row) return;
      for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = row.children[i];
        const letter = currentGuess[i] || "";
        tile.textContent = letter;
        if (knownLetters[i]) {
          tile.classList.add("correct");
          tile.classList.remove("filled");
        } else {
          tile.classList.remove("correct");
          tile.classList.toggle("filled", !!letter);
        }
      }
    }
  
    function updateActiveRow() {
      Array.from(gridEl.children).forEach((row, i) => {
        row.classList.toggle("active", !state.finished && i === state.guesses.length);
      });
    }
  
    /* ---- on-screen keyboard ---- */
    const KEY_ROWS = [
      ["Q","W","E","R","T","Y","U","I","O","P"],
      ["A","S","D","F","G","H","J","K","L"],
      ["Enter","Z","X","C","V","B","N","M","Backspace"]
    ];
    const keyStatus = {};
    const STATUS_RANK = { absent: 0, present: 1, correct: 2 };
  
    function buildKeyboard() {
      if (!keyboardEl) return;
      keyboardEl.innerHTML = "";
      KEY_ROWS.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "kb-row";
        row.forEach((key) => {
          const isWide = key === "Enter" || key === "Backspace";
          const keyEl = document.createElement("button");
          keyEl.type = "button";
          keyEl.className = "key" + (isWide ? " wide" : "");
          keyEl.textContent = key === "Backspace" ? "⌫" : key === "Enter" ? "↵" : key;
          if (!isWide) keyEl.id = "key-" + key;
          keyEl.addEventListener("click", () => handleKey(key));
          rowEl.appendChild(keyEl);
        });
        keyboardEl.appendChild(rowEl);
      });
    }
    buildKeyboard();
  
    function updateKeyboard(guess, result) {
      guess.split("").forEach((letter, i) => {
        const status = result[i];
        if (!keyStatus[letter] || STATUS_RANK[status] > STATUS_RANK[keyStatus[letter]]) {
          keyStatus[letter] = status;
        }
      });
      Object.entries(keyStatus).forEach(([letter, status]) => {
        const keyEl = document.getElementById("key-" + letter);
        if (keyEl) {
          keyEl.classList.remove("correct", "present", "absent");
          keyEl.classList.add(status);
        }
      });
    }
  
    /* ---- replay saved guesses on page reload ---- */
    function renderAllGuesses() {
      state.guesses.forEach((guess, i) => {
        const result = renderGuess(guess, i);
        updateKeyboard(guess, result);
        result.forEach((status, pos) => {
          if (status === "correct") knownLetters[pos] = guess[pos];
        });
      });
    }
    renderAllGuesses();
    initCurrentGuess();
    updateCurrentRowDisplay();
    updateActiveRow();
  
    function setMessage(text, kind) {
      if (!messageEl) return;
      messageEl.textContent = text;
      messageEl.className = kind || "";
    }
  
    function lockGame() {
      if (keyboardEl) keyboardEl.querySelectorAll(".key").forEach((k) => (k.disabled = true));
      updateActiveRow();
    }
  
    if (state.finished) {
      lockGame();
      setMessage(
        state.won ? "Congrats, you found the word of the day!" : `The word was ${WORD}. Come back tomorrow!`,
        state.won ? "win" : "lose"
      );
    }
  
    function submitGuess() {
      if (currentGuess.includes("")) {
        setMessage("Fill in all the letters before submitting.");
        return;
      }
      const guess = normalize(currentGuess.join(""));
      const rowIndex = state.guesses.length;
      const result = renderGuess(guess, rowIndex);
      updateKeyboard(guess, result);
      result.forEach((status, pos) => {
        if (status === "correct") knownLetters[pos] = guess[pos];
      });
      state.guesses.push(guess);
  
      if (guess === WORD) {
        state.finished = true;
        state.won = true;
        saveState(state);
        lockGame();
        setMessage("Congrats, you found the word of the day!", "win");
        return;
      }
      if (state.guesses.length >= MAX_TRIES) {
        state.finished = true;
        state.won = false;
        saveState(state);
        lockGame();
        setMessage(`The word was ${WORD}. Come back tomorrow!`, "lose");
        return;
      }
  
      saveState(state);
      initCurrentGuess();
      updateCurrentRowDisplay();
      updateActiveRow();
      setMessage(`Attempt ${state.guesses.length} / ${MAX_TRIES}`);
    }
  
    function handleKey(key) {
      if (state.finished) return;
      if (key === "Enter") {
        submitGuess();
      } else if (key === "Backspace") {
        for (let i = WORD_LENGTH - 1; i >= 0; i--) {
          if (currentGuess[i] && !knownLetters[i]) {
            currentGuess[i] = "";
            break;
          }
        }
        updateCurrentRowDisplay();
      } else if (/^[a-zA-Z]$/.test(key)) {
        const nextEmpty = currentGuess.indexOf("");
        if (nextEmpty !== -1) {
          currentGuess[nextEmpty] = key.toUpperCase();
          updateCurrentRowDisplay();
        }
      }
    }
  
    document.addEventListener("keydown", (e) => handleKey(e.key));
  }