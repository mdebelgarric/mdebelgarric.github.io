const WORDS = [
  "TU9ERUxMSU5I", "RFlOQU1JQw==", "RU5FUkdZ", "QlVER0VU", "TU9ERUxT", "VEhFT1JZ",
  "TUVUQUJPTElTTQ==", "UkVQUk9EVUNUSU9O", "UkVTRVJWRQ==", "U1RSVUNUVVJFCg==", "QVNTSU1JTEFUSU9O",
  "QUxMT0NBVElPTg==", "TUFJTlRFTkFOQ0U=", "VFVSTk9WRVI=", "Q0xFQVJBTkNFCg==", "TUFUVVJBVElPTg==",
  "VE9YSUNPTE9HWQ==", "VE9YSUNBTlQ=", "UE9MTFVUSU9O", "RVhQT1NVUkU=", "TUVUQUxT",
  "UEVTVElDSURF", "Q0hFTUlDQUxT", "UkVTUE9OU0U=", "VE9YSUNJVFk=", "U1RSRVNTT1I=",
  "U0VOVElORUw=", "RUZGRUNUUw==", "Q0FETUlVTQ==", "Q09QUEVSDQ==", "TklDS0VM", "TEVBRA==",
  "R0FNTUFSIVM=", "R0FNTUFSSUQ=", "REFQSE5JQQ==", "VFJPVVQ=", "RlJFU0hXQVRFUg==",
  "T1JHQU5JU00=", "U1BFQ0lFUw==", "UE9QVUxBVElPTg==", "Q09NTVU3SVRZ", "QVFVQVRJQw==",
  "RUNPU1lTVEVNCg==", "SEFCSVRBVA==", "UklWRVJTNQ==", "U1RSRUFNUw==", "RUNUT1RIRVJNCg==",
  "RVZPTFVUSU9O", "VFJBSVRT", "U1VSVklWQUw=", "RklUTkVTUw==", "TElGRVNQQU4=",
  "VFJBREVPRkY=", "UExBU1RJQ0lUWQ==", "QURBUFRBVElPTg==", "UEhFTk9UWVBFCg==", "Q09OU1RSQUlOVA==",
  "U0VMRUNUSU9O", "R0VORVRJQ1M=", "VEhFUk1BTA==", "RElWRVJTSVRZ",
  "QkFZRVNJQU4=", "SU5GRVJFTkNF", "QU5BTFlTSVM=", "REFUQVNFVA==", "UEFSQU1FVEVSCg==",
  "RVNUSU1BVElPTg==", "U1RBVFM=", "TUVUUklDUw==", "VkFMSURBVElPTg==", "UElQRUxJTkU=",
  "Q0xJTUFURQ==", "V0FSTUlORw==", "R0xPQkFM", "Q0hBTkdFCg==", "SU1QQUNU",
  "UEhZU0lPTE9HWQ==", "U1RSRVNTCg=="
];
  
  /* =========================================================
     2) CHOISIR LE MOT DU JOUR DE FAÇON DÉTERMINISTE
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
  
  const WORD = atob(WORDS[getTodayIndex()]).trim();
  const WORD_LENGTH = WORD.length;
  const MAX_TRIES = 6;
  
  /* =========================================================
     3) NORMALISATION
     ========================================================= */
  function normalize(str) {
    return str
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  
  /* =========================================================
     4) ÉTAT DU JEU (localStorage)
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
  if (gridEl) {
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
       6) ÉVALUER UN ESSAI
       ========================================================= */
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
  
    /* =========================================================
       7) AFFICHAGE
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
      if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = kind || "";
      }
    }
  
    function lockGame() {
      if (inputEl) inputEl.disabled = true;
      if (submitBtn) submitBtn.disabled = true;
    }
  
    if (state.finished) {
      lockGame();
      setMessage(
        state.won ? "Congrats, you found the word of the day!" : `The word was ${WORD}. Come back tomorrow!`,
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
      setMessage(`Attempt ${state.guesses.length} / ${MAX_TRIES}`);
    }
  
    if (submitBtn) submitBtn.addEventListener("click", submitGuess);
    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitGuess();
      });
    }
  }