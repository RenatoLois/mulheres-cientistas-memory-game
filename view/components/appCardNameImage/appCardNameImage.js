import { info } from '/mulheres-cientistas-memory-game/src/data/info.js';

export class AppCardNameImage extends HTMLElement {
  clickCallback(card) {
    const memoryCard = card.querySelector('.memory-card');
    memoryCard.classList.toggle('flip');
  }

  static get observedAttributes() {
    return ['scientist'];
  }

  static styles = '';
  static stylesDark = '';

  static stylePromises = Promise.all([
    fetch(new URL('/mulheres-cientistas-memory-game/view/components/appCardNameImage/css/styles.css', import.meta.url)).then(res => res.text()),
    fetch(new URL('/mulheres-cientistas-memory-game/view/components/appCardNameImage/css/styles-dark.css', import.meta.url)).then(res => res.text()),
  ]).then(([cssNormal, cssDark]) => {
    this.styles = "<style>" + cssNormal + "</style>";
    this.stylesDark = "<style>" + cssDark + "</style>";
  });

  static template = `
    <div class="memory-card" data-scientist="{{scientistKey}}">
      <div class="card-inner">
        <div class="card-front">
          <img src="{{imagePath}}" 
               alt="{{formattedName}}" 
               class="card-img"
               onload="this.classList.add('loaded')"
               onerror="this.removeAttribute('alt'); this.style.opacity='0'; this.classList.add('loaded');">
          <p class="card-name">{{formattedName}}</p>
          <span class="card-discipline" data-i18n="{{disciplineKey}}"></span>
        </div>
        <div class="card-back">
          <i class="fa-solid fa-question card-back-icon"></i>
        </div>
      </div>
    </div>
  `;

  async connectedCallback() {
    await this.constructor.stylePromises;

    const scientistKey = this.getAttribute('scientist') || '';
    const scientistData = info['scientists-data'][scientistKey];

    if (!scientistKey || !scientistData) {
      this.innerHTML = `<div class="card-error">Scientist not found</div>`;
      return;
    }
  
    const formattedName = scientistData['name'];
    const imagePath = `/mulheres-cientistas-memory-game/${scientistData['image-path']}`;
    const disciplineKey = `scientists-i18n-texts.${scientistKey}.discipline`;

    let instanceTemplate = this.constructor.template
      .replace('{{scientistKey}}', scientistKey)
      .replace('{{imagePath}}', imagePath)
      .replace(/{{formattedName}}/g, formattedName)
      .replace('{{disciplineKey}}', disciplineKey);

    this.innerHTML = this.constructor.styles + this.constructor.stylesDark + instanceTemplate;

    if (this.hasAttribute('flipped') && this.getAttribute('flipped') === 'true') {
      this.querySelector('.memory-card')?.classList.add('flip');
    }

    const memoryCard = this.querySelector('.memory-card');
    if (memoryCard) {
      memoryCard.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('card-clicked', { 
          bubbles: true,
          detail: { scientistKey: scientistKey } 
        }));
        this.clickCallback(this);
      });
    }

    this.dispatchEvent(
      new CustomEvent('card-name-image-rendered', { bubbles: true })
    );
  }

  attributeChangedCallback() {
    if (this.innerHTML) {
      this.connectedCallback();
    }
  }

  setClickEvent(newCallback) {
    this.clickCallback = newCallback;
  }
}

customElements.define('app-card-name-image', AppCardNameImage);
