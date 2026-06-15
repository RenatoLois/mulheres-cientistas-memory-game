export class UrlValues {
  static params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

  static get(key) {
    return this.params[key] ?? null;
  }
}
