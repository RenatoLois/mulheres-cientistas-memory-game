import {UrlValues} from '/mulheres-cientistas-memory-game/src/urlValues.js';
import { info } from '/mulheres-cientistas-memory-game/src/data/info.js';

function initGame(fieldMode, difficulty) {
  // initialization
  const cardsGrid = document.querySelector('.game-cards-grid');

  const scientistsKeys = Object.keys(info['scientists-data']);

  const matchingKeys = scientistsKeys.filter(key => {
    return info['scientists-i18n-texts']['en'][key]['discipline'] === fieldMode
  });

  // Fisher Yates 'Algorithm (shuffling)
  for (let i = matchingKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [matchingKeys[i], matchingKeys[j]] = [matchingKeys[j], matchingKeys[i]];
  }

  const numCards =
  (difficulty === 'hard') ? 36 / 2
  : (difficulty === 'medium') ? 24 / 2
  : (difficulty === 'easy') ? 18 / 2 : 0;

  let selectedKeys = matchingKeys.slice(0, numCards);

  // duplication cards
  selectedKeys = [...selectedKeys, ...selectedKeys];

  // Fisher Yates 'Algorithm (shuffling again)
  for (let i = selectedKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedKeys[i], selectedKeys[j]] = [selectedKeys[j], selectedKeys[i]];
  }

  selectedKeys.forEach(key => {
    const cardElement = document.createElement('app-card-name-image');
    cardElement.setAttribute('scientist', key);
    cardElement.setAttribute('flipped', 'true');
    // cardElement.setClickEvent(e => {});
    cardsGrid.appendChild(cardElement);
  });

  
  // game logic
  let locked = false;
  let lastClickedCard = null;
  let lastClickedKey = null;
  document.addEventListener('game-card-clicked', e => {
    if(locked) return;
    else {

    }

    let clickedKey = e.detail.scientistKey;
    if (lastClickedKey === null) {
      lastClickedCard = document.querySelector('.memory-card:not(.flip):not(.matched)');
      lastClickedKey = clickedKey;
    } else if(clickedKey !== lastClickedKey) {
      document.querySelectorAll('.memory-card:not(.flip):not(.matched)').forEach(e => {
        setTimeout(() => {
          e.classList.toggle('flip');
        }, 700);
        lastClickedKey = null;
        lastClickedCard = null;
      });
    } else {
      document.querySelectorAll('.memory-card:not(.flip):not(.matched)').forEach(e => {
        e.classList.toggle('matched');
        lastClickedKey = null;
        lastClickedCard = null;
      });
    }
  });
}

let fieldMode = UrlValues.get('fieldMode');
if (fieldMode == null) {
  window.location.href = `/mulheres-cientistas-memory-game/view/pages/main.html`;
} else {
  let difficulty = UrlValues.get('difficulty');
  if(difficulty === null) {
    window.location.href = `/mulheres-cientistas-memory-game/view/pages/game.html?fieldMode=${fieldMode}`;
  } else {
    initGame(fieldMode, difficulty);
  }
}
