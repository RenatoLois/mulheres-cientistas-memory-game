export class AppFooter extends HTMLElement {
  static styles = '';
  static stylesDark = '';

  static stylePromises = Promise.all([
    fetch(new URL('/view/components/appFooter/css/styles.css', import.meta.url)).then(res => res.text()),
    fetch(new URL('/view/components/appFooter/css/styles-dark.css', import.meta.url)).then(res => res.text()),
  ]).then(([cssNormal, cssDark]) => {
    this.styles = "<style>" + cssNormal + "</style>";
    this.stylesDark = "<style>" + cssDark + "</style>";
  });

  static template = `
    <footer>
      <p>© 2026 Renato Lóis</p>
    </footer>
  `;

  async connectedCallback() {
    await this.constructor.stylePromises;
    this.innerHTML = this.constructor.styles + this.constructor.stylesDark + this.constructor.template;
  }
}

customElements.define('app-footer', AppFooter);
