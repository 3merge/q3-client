const RESERVED_QUERIES = [
  // 'search',
  'sort',
  'page',
  'limit',
  'active',
];

const count = (xs = [], assertion) =>
  xs.reduce((acc, item) => {
    // eslint-disable-next-line
    if (assertion(item)) acc += 1;
    return acc;
  }, 0);

const negate = (fn) => (xs) => !fn(xs);

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

  countIn(xs = []) {
    return count(xs, this.containsInCurrent.bind(this));
  }

  countNin(xs = []) {
    return count(
      xs,
      negate(this.containsInCurrent.bind(this)),
    );
  }

  isActive() {
    const active = this.countIn(this.next);
    const inactive = this.countNin(this.next);

    return this.benchmarks.reduce((acc, next) => {
      const nextActive = this.countIn(next);
      const nextInactive = this.countNin(next);

      if (nextInactive && inactive)
        return nextInactive < inactive;
      if (acc) return nextActive <= active;
      return acc;
    }, true);
  }
}
