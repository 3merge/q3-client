import { get, invoke, isFunction } from 'lodash';
import { string } from 'q3-ui-helpers';

const useStringHelper = (value, options) =>
  [
    'toFullName',
    'toTruthy',
    'toDate',
    'toPrice',
    'toCheck',
    'toTel',
  ].reduce(
    (acc, curr) =>
      get(options, curr) && isFunction(get(string, curr))
        ? invoke(string, curr, value)
        : acc,
    value,
  );

export default useStringHelper;
