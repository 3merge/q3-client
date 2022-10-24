import { isObject, join, size, isFunction } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import {
  toPrice,
  toNumber,
  toSimpleDate,
  toDateSingleLine,
  ellipsis,
  makeName,
  makeAddress,
} from '../string';

const useHelperFormats = (data) => (field, formatter) => {
  const rawValue = isObject(data) ? data[field] : field;
  const { t } = useTranslation('labels');

  const is = (str) => str === formatter;

  const getObj = () =>
    isObject(rawValue) ? rawValue : data;

  if (is('price')) return toPrice(rawValue);
  if (is('number')) return toNumber(rawValue);
  if (is('comma')) return join(rawValue, ', ');
  if (is('multiline')) return join(rawValue, '\n');
  if (is('date')) return toSimpleDate(rawValue);
  if (is('datetime')) return toDateSingleLine(rawValue);
  if (is('count')) return size(rawValue);
  if (is('truncate')) return ellipsis(rawValue, 55);
  if (is('fullname')) return makeName(getObj());
  if (is('address')) return makeAddress(getObj());

  if (isFunction(formatter))
    return formatter(rawValue, data, t);

  return t(rawValue || '--');
};

export default useHelperFormats;
