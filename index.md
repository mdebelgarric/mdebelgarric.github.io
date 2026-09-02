---
layout: default
title: Home
permalink: /
---

# Mélanie Debelgarric

Welcome on my website. I'm currently a post-doctoral researcher at the LBBE in Lyon (France).

## Presentation

My main area of research is applying the 'Dynamic Energy Budget' (DEB) theory (Kooijman, 2010) to explain the effect of environmental stressors on the physiology of freshwater organisms.

After defending my thesis in December 2024, which used bioenergetic modelling to explore the impact of temperature variations and physiological constraints on the evolutionary trajectories of two freshwater species (the water flea *Daphnia magna* and the brown trout *Salmo trutta*), I began my first postdoctoral position with the MEPS team at the LBBE in March 2025. I am currently applying this approach to examine the physiological effects of various heavy metals on the reproduction of *Gammarus fossarum*, a sentinel species found in our rivers.

You can download my updated CV here:

<p style="margin-top: 1.5rem;">
  <a href="{{ '/cv.pdf' | relative_url }}" target="_blank" style="padding: 8px 16px; background-color: #1b4332; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem;">📄 Download CV (PDF)</a>
</p>

## Have you tried to guess the daily word ?

<style>
  .game-card {
    max-width: 420px;
    margin: 2rem auto;
    background: #FBFAF6;
    border: 1px solid #B7B29E;
    padding: 24px;
    border-radius: 8px;
  }
  .game-subtitle {
    font-size: 0.85rem;
    color: #55594E;
    margin-bottom: 20px;
    line-height: 1.4;
  }
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
    border: 2px solid #B7B29E;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    font-weight: bold;
    font-size: 1.1rem;
    color: #21261F;
    background: #FBFAF6;
  }
  .tile.correct { background: #2F5D50; border-color: #2F5D50; color: #fff; }
  .tile.present { background: #B08947; border-color: #B08947; color: #fff; }
  .tile.absent  { background: #C9C4B5; border-color: #C9C4B5; color: #21261F; }
  
  #input-row {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  #letter-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #B7B29E;
    font-size: 1rem;
    text-transform: uppercase;
  }
  #submit-btn {
    border: 1px solid #21261F;
    background: #21261F;
    color: #fff;
    padding: 8px 16px;
    cursor: pointer;
  }
  #message.win  { color: #2F5D50; font-weight: bold; }
  #message.lose { color: #9C4A3B; font-weight: bold; }
</style>

<div class="game-card">
  <h3>Word of the day</h3>
  <p class="game-subtitle"><strong>How to play:</strong> Guess the hidden word in 6 tries. Dark tiles mean the letter is in the right spot, light tiles mean it's in the word but misplaced, and grey tiles mean it's not in the word.</p>

  <div id="grid"></div>

  <div id="input-row">
    <input id="letter-input" type="text" maxlength="12" autocomplete="off" placeholder="Your word...">
    <button id="submit-btn">Validate</button>
  </div>
  <p id="message"></p>
</div>

<script src="{{ '/assets/js/daily-game.js' | relative_url }}"></script>