import {Storage} from '/src/storage.js';
import {changeLanguage} from '/src/i18n.js';

export class AppHeader extends HTMLElement {
  static data = {
    'title': "ISERJ"
  };

  static styles = '';
  static stylesDark = '';

  static stylePromises = Promise.all([
    fetch(new URL('/view/components/appHeader/css/styles.css', import.meta.url)).then(res => res.text()),
    fetch(new URL('/view/components/appHeader/css/styles-dark.css', import.meta.url)).then(res => res.text()),
  ]).then(([cssNormal, cssDark]) => {
    this.styles = "<style>" + cssNormal +"</style>";
    this.stylesDark = "<style>" + cssDark + "</style>";
  });

  static template = `
    <header>
      <button class="home-btn"><i class="fa-solid fa-house"></i></button>
      <h1>${this.data['title']}</h1>
      
      <div class="lang-container">
        <button class="menu-toggle"><i class="fa-solid fa-bars"></i></button>
        <div class="lang-dropdown">
          <button class="lang-option" data-value="pt">PT</button>
          <button class="lang-option" data-value="en">EN</button>
          <button class="lang-option" data-value="es">ES</button>
        </div>
      </div>

      <button class="theme-btn"><i class="fa-solid fa-circle-half-stroke"></i></button>
    </header>
  `;

  async connectedCallback() {
    await this.constructor.stylePromises;
    this.innerHTML = this.constructor.styles + this.constructor.stylesDark + this.constructor.template;

    const menuToggle = this.querySelector('.menu-toggle');
    const langContainer = this.querySelector('.lang-container');
    const langOptions = this.querySelectorAll('.lang-option');

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langContainer.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      langContainer.classList.remove('active');
    });

    const savedLangObj = Storage.read('userLang', true);
    const savedLang = savedLangObj ? savedLangObj['langName'] : 'pt';

    const activeBtn = this.querySelector(`.lang-option[data-value="${savedLang}"]`);
    if (activeBtn) {
      activeBtn.classList.add('selected');
    } else {
      this.querySelector('.lang-option[data-value="pt"]')?.classList.add('selected');
    }

    this.querySelector(`[data-value="${savedLang}"]`)?.classList.add('selected');

    langOptions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedLang = e.target.getAttribute('data-value');
        
        langOptions.forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
        
        changeLanguage(selectedLang);
        langContainer.classList.remove('active');
      });
    });

    const themeBtn = this.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      Storage.write('darkmode', { 'enabled': isDark ? 'true' : 'false' }, true);
    });

    const homeBtn = this.querySelector('.home-btn');
    homeBtn.addEventListener('click', () => {
      window.location.href = `/mulheres-cientistas-memory-game/view/pages/main.html`;
    });
  }
}

customElements.define('app-header', AppHeader);
