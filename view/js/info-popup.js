import { info } from '/mulheres-cientistas-memory-game/src/data/info.js';
import { Storage } from '/mulheres-cientistas-memory-game/src/storage.js';
import { translations } from '/mulheres-cientistas-memory-game/src/languages-texts.js';

export class InfoPopup {
  static styles = '';
  static stylesDark = '';

  static stylePromises = Promise.all([
    fetch(new URL('/mulheres-cientistas-memory-game/view/css/info-popup.css', import.meta.url)).then(res => res.text()),
    fetch(new URL('/mulheres-cientistas-memory-game/view/css/info-popup-dark.css', import.meta.url)).then(res => res.text())
  ]).then(([cssNormal, cssDark]) => {
    this.styles = "<style>" + cssNormal + "</style>";
    this.stylesDark = "<style>" + cssDark + "</style>";
  });
}

export async function showPopup(card) {
  await InfoPopup.stylePromises;

  const scientistKey = card.getAttribute('scientist');
  
  const data = info['scientists-data'][scientistKey];
  
  const savedLangObj = Storage.read('userLang', true);
  const savedLang = savedLangObj ? savedLangObj['langName'] : 'pt';

  const texts = info['scientists-i18n-texts'][savedLang][scientistKey];

  if (!data || !texts) return;

  const labelField = translations[savedLang] && translations[savedLang]['field'];
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  
  popupOverlay.innerHTML = InfoPopup.styles + InfoPopup.stylesDark + `
    <div class="popup-content">
      <button class="popup-close">&times;</button>
      <img src="/mulheres-cientistas-memory-game/${data['image-path']}" alt="${data.name}" class="popup-img">
      <h2>${data.name}</h2>
      <p class="popup-discipline"><strong>${labelField}:</strong> ${texts.discipline}</p>
      <p class="popup-description">${texts.description}</p>
    </div>
  `;

  const closePopup = () => {
    popupOverlay.remove();
    document.removeEventListener('keydown', handleEsc);
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  };

  popupOverlay.querySelector('.popup-close').addEventListener('click', closePopup);
  
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) closePopup();
  });

  document.body.appendChild(popupOverlay);
  document.addEventListener('keydown', handleEsc);
}
