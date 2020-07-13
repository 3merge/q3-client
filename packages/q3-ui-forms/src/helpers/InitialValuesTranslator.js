import dot from 'dot-helpers';
import { merge, pick, omit } from 'lodash';
import { array, object } from 'q3-ui-helpers';
import flat from 'flat';

const filterNumbers = (arr) =>
  arr.flat().filter((val) => typeof val !== 'number');

const reduceAndFlatten = (arr, target) =>
  arr.reduce((next, [key, maxDepth]) => {
    merge(next, flat(pick(target, [key]), { maxDepth }));
    return next;
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

  toString(unwind = []) {
    const exec = (obj = {}) =>
      Object.entries(obj).reduce((curr, [key, value]) => {
        const copy = { ...curr };

        if (Array.isArray(value)) {
          copy[key] = value
            .filter(Boolean)
            .map((item) =>
              object.hasKeys(item)
                ? exec(item)
                : String(item),
            );
        } else if (object.hasKeys(value)) {
          copy[key] = exec(value);
        } else {
          copy[key] = String(value);
        }

        return copy;
      }, {});

    const output = exec(this.initialValues);

    return array.hasLength(unwind)
      ? {
          ...omit(output, filterNumbers(unwind)),
          ...reduceAndFlatten(unwind, output),
        }
      : output;
  }
}
