import {UrlValues} from '/mulheres-cientistas-memory-game/src/urlValues.js';
import { info } from '/mulheres-cientistas-memory-game/src/data/info.js';

function initGame(fieldMode, difficulty) {
  const cardsGrid = document.querySelector('.game-cards-grid');

  const scientistsKeys = Object.keys(info['scientists-data']);

  const matchingKeys = scientistsKeys.filter(key => {
    return info['scientists-i18n-texts']['en'][key]['discipline'] === fieldMode
  });

  // Fisher Yates 'Algorithm
  for (let i = matchingKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [matchingKeys[i], matchingKeys[j]] = [matchingKeys[j], matchingKeys[i]];
  }

  const numCards =
  (difficulty === 'hard') ? 36
  : (difficulty === 'medium') ? 24
  : (difficulty === 'easy') ? 18 : 0;

  const selectedKeys = matchingKeys.slice(0, numCards / 2);
  selectedKeys.forEach(key => {
    selectedKeys.push(key);
  })

  // Fisher Yates 'Algorithm
  for (let i = selectedKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedKeys[i], selectedKeys[j]] = [selectedKeys[j], selectedKeys[i]];
  }

  selectedKeys.forEach(key => {
    const cardElement = document.createElement('app-card-name-image');
    cardElement.setAttribute('scientist', key);
    cardElement.setAttribute('flipped', 'true');
    cardsGrid.appendChild(cardElement);
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
