import { first, get, isObject, size, uniq } from 'lodash';
import { array } from 'q3-ui-helpers';
import {
  castToRegex,
  castToBeginning,
  castToEnd,
} from 'q3-ui-forms/lib/helpers';
import {
  EQUALS,
  NOT_EQUALS,
  ONE_OF,
  NOT_ONE_OF,
  MATCHES,
  GREATER_THAN_OR_EQUALS,
  LESS_THAN_OR_EQUALS,
  BETWEEN,
} from './constants';

const FieldToQueryBuilder = (initialSchema) => (values) => {
  const normalize = (xs) =>
    array.is(xs).map((item) => {
      if (isObject(item)) return item.value;
      return item;
    });

  const getInternalPropertiesOf = (key) => {
    const props = Object.entries(values).reduce(
      (acc, [k, v]) => {
        const [id, prop] = k.split('__');

        if (id === key) {
          acc[prop] = v;
        }

        return acc;
      },
      {},
    );

    let { operation } = props;

    const out = [];
    const type = get(
      initialSchema,
      `${key}.type`,
      'String',
    );

    const isOperation = (v) =>
      array.is(v).includes(operation);

    const genName = () => {
      if (isOperation([NOT_EQUALS, NOT_ONE_OF]))
        return `${key}!`;

      if (isOperation(GREATER_THAN_OR_EQUALS))
        return `${key}>`;

      if (isOperation(LESS_THAN_OR_EQUALS))
        return `${key}<`;

      return key;
    };

    const genValue = () => {
      const value = props[operation];

      if (isOperation(MATCHES))
        return normalize(value).map(castToRegex);

      if (isOperation([EQUALS, ONE_OF, NOT_ONE_OF]))
        return normalize(value);

      if (
        isOperation(LESS_THAN_OR_EQUALS) &&
        type === 'Date'
      )
        return castToEnd(value);

      if (
        isOperation(GREATER_THAN_OR_EQUALS) &&
        type === 'Date'
      )
        return castToBeginning(value);

      return value;
    };

    const addToOutput = () =>
      out.push({
        name: genName(),
        value: genValue(),
      });

    if (isOperation(BETWEEN)) {
      operation = GREATER_THAN_OR_EQUALS;
      addToOutput();
      operation = LESS_THAN_OR_EQUALS;
      addToOutput();
    } else {
      addToOutput();
    }

    return out;
  };

  return uniq(
    Object.keys(values).map((item) =>
      first(item.split('__')),
    ),
  ).reduce((acc, curr) => {
    getInternalPropertiesOf(curr).forEach(
      ({ name, value }) => {
        if (size(value)) acc[name] = value;
      },
    );

    return acc;
  }, {});
};

export default FieldToQueryBuilder;