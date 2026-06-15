export class ModeCard extends HTMLElement {
  static styles = '';
  static stylesDark = '';

  static stylePromises = Promise.all([
    fetch(new URL('/mulheres-cientistas-memory-game/view/components/appModeCard/css/styles.css', import.meta.url)).then(res => res.text()),
    fetch(new URL('/mulheres-cientistas-memory-game/view/components/appModeCard/css/styles-dark.css', import.meta.url)).then(res => res.text()),
  ]).then(([cssNormal, cssDark]) => {
    this.styles = "<style>" + cssNormal + "</style>";
    this.stylesDark = "<style>" + cssDark + "</style>";
  });

  static template = `
    <div class="mode-card">
      <div class="mode-image-wrapper">
        <img src="{{img}}" class="mode-image">
      </div>

      <div class="mode-info">
        <h3 class="mode-title" data-i18n="{{titleKey}}"></h3>
        <p class="mode-description" data-i18n="{{descKey}}"></p>
      </div>
    </div>
  `;

  async connectedCallback() {
    await this.constructor.stylePromises;

    const img = this.getAttribute('img') || '';
    const titleKey = this.getAttribute('title-key') || '';
    const descKey = this.getAttribute('desc-key') || '';
    const href = this.getAttribute('href');

    let instanceTemplate = this.constructor.template
      .replace('{{img}}', img)
      .replace('{{titleKey}}', titleKey)
      .replace('{{descKey}}', descKey);

    this.innerHTML = this.constructor.styles + this.constructor.stylesDark + instanceTemplate;

    if (href) {
      const cardDiv = this.querySelector('.mode-card');
      if (cardDiv) {
        cardDiv.style.cursor = 'pointer';
        cardDiv.addEventListener('click', () => {
          window.location.href = `${href}`;
        });
      }
    }

    this.dispatchEvent(
      new CustomEvent('card-rendered', { bubbles: true })
    );
  }
}

customElements.define('mode-card', ModeCard);
