import { Storage } from '/mulheres-cientistas-memory-game/src/storage.js';
import { translations } from '/mulheres-cientistas-memory-game/src/languages-texts.js';

export function changeLanguage(lang) {
  Storage.write('userLang', { 'langName': lang }, true);
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    let translationText = null;

    if (translations[lang] && translations[lang][key]) {
      translationText = translations[lang][key];
    }

    if (translationText) {
      if (element.hasAttribute('placeholder')) {
        element.setAttribute('placeholder', translationText);
      } else {
        element.textContent = translationText;
      }
    }
  });
}

function initTranslation() {
  const savedData = Storage.read('userLang', true);
  const savedLang = savedData ? savedData['langName'] : 'pt';
  changeLanguage(savedLang);
}

let totalCards = 0;
let renderedCount = 0;
let fallbackTimer = null;
let isInitialized = false;

function tryTranslate() {
  if (totalCards > 0 && renderedCount >= totalCards) {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    initTranslation();
    return true;
  }
  return false;
}

document.addEventListener('card-name-image-rendered', () => {
  renderedCount++;
  tryTranslate();
});

function initialize() {
  if (isInitialized) return;
  isInitialized = true;

  const cards = document.querySelectorAll('app-card-name-image');
  totalCards = cards.length;

  if (totalCards === 0) {
    const hasGrid = document.querySelector('.cards-overview-grid') !== null;
    if (hasGrid) {
      setTimeout(() => {
        const newCards = document.querySelectorAll('app-card-name-image');
        if (newCards.length > 0) {
          totalCards = newCards.length;
          if (renderedCount >= totalCards) {
            initTranslation();
          }
        } else {
          initTranslation();
        }
      }, 3000);
      return;
    } else {
      initTranslation();
      return;
    }
  }

  if (renderedCount >= totalCards) {
    initTranslation();
    return;
  }

  fallbackTimer = setTimeout(() => {
    if (renderedCount < totalCards) {
      console.warn(`[i18n] Fallback: ${renderedCount}/${totalCards} cartas renderizadas em 3s. Aplicando tradução parcial.`);
    }
    initTranslation();
    fallbackTimer = null;
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

document.addEventListener('DOMContentLoaded', () => {
  const modeCards = document.querySelectorAll('mode-card');
  if (modeCards.length === 0) return;

  let modeCount = 0;
  const modeTotal = modeCards.length;
  const modeFallback = setTimeout(() => {
    initTranslation();
  }, 200);

  document.addEventListener('mode-card-rendered', () => {
    modeCount++;
    if (modeCount === modeTotal) {
      clearTimeout(modeFallback);
      initTranslation();
    }
  });
});
