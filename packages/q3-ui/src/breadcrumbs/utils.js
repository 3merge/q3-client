const locales = ['en-ca', 'fr-ca'];

export default class PathBuilder {
  constructor(locale = '') {
    this.base =
      typeof locale === 'string'
        ? locale.toLowerCase()
        : '';
  }

  static split(path) {
    return path
      .split('/')
      .filter(
        (x) => x && !locales.includes(x.toLowerCase()),
      );
  }

  append(path) {
    this.base += `/${path}`;
    return this.base;
  }
}
