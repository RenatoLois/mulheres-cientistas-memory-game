import { info } from '/mulheres-cientistas-memory-game/src/data/info.js';
import { showPopup } from '/mulheres-cientistas-memory-game/view/js/info-popup.js';

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.cards-overview-grid');

  const scientistsKeys = Object.keys(info['scientists-data']);

  scientistsKeys.forEach(key => {
    const cardElement = document.createElement('app-card-name-image');
    cardElement.setAttribute('scientist', key);
    cardElement.setClickEvent(showPopup);
    gridContainer.appendChild(cardElement);
  });
});

document.dispatchEvent(
  new CustomEvent('card-name-image-loaded', { bubbles: true })
);
