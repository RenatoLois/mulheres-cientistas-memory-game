import { Storage } from '/mulheres-cientistas-memory-game/src/storage.js';
import { translations } from '/mulheres-cientistas-memory-game/src/languages-texts.js';

export function changeLanguage(lang) {
  Storage.write('userLang', { 'langName': lang }, true);

  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    if (translations[lang] && translations[lang][key]) {
      const translationText = translations[lang][key];

      if (element.hasAttribute('placeholder')) {
        element.setAttribute('placeholder', translationText);
      } else {
        element.textContent = translationText;
      }
    }
  });
}

const initTranslation = () => {
  const savedData = Storage.read('userLang', true);
  const savedLang = savedData ? savedData['langName'] : 'pt';
  changeLanguage(savedLang);
};

document.addEventListener('DOMContentLoaded', () => {
  let renderCount = 0;
  const totalCards = document.querySelectorAll('mode-card').length;

  if (totalCards === 0) {
    initTranslation();
    return;
  }

  const fallbackTimeout = setTimeout(() => {
    initTranslation();
  }, 100);

  document.addEventListener('card-rendered', () => {
    renderCount++;
    if (renderCount === totalCards) {
      clearTimeout(fallbackTimeout);
      initTranslation();
    }
  });
});
