import dot from 'dot-helpers';
import { merge } from 'lodash';
import { object } from 'q3-ui-helpers';
import flat from 'flat';

const isSimpleArray = (v) =>
  Array.isArray(v) &&
  v.every((item) => typeof item !== 'object');

const mangleArray = (v) =>
  `__${v.map((item) => String(item)).join(',')}__`;

const unmangleArray = (target = {}) =>
  Object.entries(target).reduce((curr, [key, value]) => {
    const copy = { ...curr };
    copy[key] =
      value.startsWith('__') && value.endsWith('__')
        ? value.replace(/__/g, '').split(',')
        : value;

    return copy;
  }, {});

export default class InitialValuesTranslator {
  constructor(seed = {}) {
    this.initialValues = seed;
  }

  translate(keyMap) {
    if (object.hasKeys(keyMap))
      this.initialValues = merge(
        {},
        this.initialValues,
        dot.translate(this.initialValues, keyMap),
      );

    return this;
  }

  prune(keep) {
    this.initialValues = dot.keep(this.initialValues, keep);
    return this;
  }

  modify(fnMap) {
    this.initialValues = dot.modify(
      this.initialValues,
      fnMap,
    );

    return this;
  }

  toString() {
    const exec = (obj = {}) =>
      Object.entries(obj).reduce((curr, [key, value]) => {
        const copy = { ...curr };

        if (Array.isArray(value)) {
          const raw = value.filter(Boolean);

          if (raw.length) {
            if (isSimpleArray(raw)) {
              copy[key] = mangleArray(raw);
            } else {
              copy[key] = raw.map(exec);
            }
          }
        } else if (typeof value === 'object') {
          copy[key] = exec(value);
        } else {
          copy[key] = String(value);
        }

        return copy;
      }, {});

    return unmangleArray(
      // we only want to flatten complex arrays
      // so it has to come post-stringify
      flat(exec(this.initialValues)),
    );
  }
}
