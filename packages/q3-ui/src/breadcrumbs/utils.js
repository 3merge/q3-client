const locales = ['en-ca', 'fr-ca'];

export default class PathBuilder {
  constructor() {
    this.base = '';
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
