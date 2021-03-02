const RESERVED_QUERIES = [
  'search',
  'sort',
  'page',
  'limit',
  'active',
];

export default class QueryStringMatcher {
  static clean(v) {
    return ['/', '?'].reduce(
      (value, char) =>
        String(value).charAt(0) === char
          ? String(value).substring(1)
          : String(value),
      v,
    );
  }

  static split(v) {
    return v.split('&').filter((item) => {
      const [key] = item.split('=');
      return key
        ? !RESERVED_QUERIES.includes(key.toLowerCase())
        : false;
    });
  }

  constructor(a, b, benchmarks = []) {
    const normalize = (v) =>
      this.constructor.split(this.constructor.clean(v));

    this.current = normalize(a);
    this.next = normalize(b);
    this.benchmarks = Array.isArray(benchmarks)
      ? benchmarks.map(normalize)
      : [];
  }

  containsInCurrent(item) {
    const includes = this.current.includes(item);
    try {
      return (
        decodeURIComponent(this.current).includes(
          decodeURIComponent(item),
        ) || includes
      );
    } catch (e) {
      return includes;
    }
  }

  count(queryParts = []) {
    return queryParts.reduce((acc, item) => {
      // eslint-disable-next-line
      if (this.containsInCurrent(item)) acc += 1;
      return acc;
    }, 0);
  }

  compare() {
    return this.next.every((item) =>
      this.containsInCurrent(item),
    );
  }

  isActive() {
    if (!this.compare()) return false;
    const numberOfActiveQueries = this.count(this.next);

    return this.benchmarks.reduce((acc, next) => {
      if (!acc) return acc;

      // will award "active" if it all query parameters are in the current search string
      // AND it has more instances of query than its siblings
      return this.count(next) <= numberOfActiveQueries;
    }, true);
  }
}
