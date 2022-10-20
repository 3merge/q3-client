import { isObject, join, size, isFunction } from 'lodash';
import * as string from '../string';

const useHelperFormats = (data) => (field, formatter) => {
  const rawValue = isObject(data) ? data[field] : field;

  const is = (str) => str === formatter;

  const getObj = () =>
    isObject(rawValue) ? rawValue : data;

  if (is('price')) return string.toPrice(rawValue);
  if (is('number')) return string.toNumber(rawValue);
  if (is('comma')) return join(rawValue, ', ');
  if (is('multiline')) return join(rawValue, '\n');
  if (is('date')) return string.toSimpleDate(rawValue);
  if (is('datetime'))
    return string.toDateSingleLine(rawValue);
  if (is('count')) return size(rawValue);
  if (is('truncate')) return string.ellipsis(rawValue, 55);
  if (is('fullname')) return string.makeName(getObj());
  if (is('address')) return string.makeAddress(getObj());
  if (isFunction(formatter))
    return formatter(rawValue, data);
  return rawValue || '--';
};

export default useHelperFormats;
