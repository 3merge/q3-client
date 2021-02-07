import { url } from 'q3-ui-helpers';
import { timezone } from 'q3-ui-locale';
import {
  clean,
  ensureBoolean,
  ensureNumber,
  unquote,
} from '../utils';

export default (v) => {
  if (!v) return {};

  return url
    .removeLeadingQueryCharacter(v)
    .split('&')
    .reduce((acc, next) => {
      // eslint-disable-next-line
      let [key, value] = next ? next.split('=') : [next];

      if (timezone.isUtc(value))
        value = timezone.toLocal(value, timezone.YMD);

      if (typeof value === 'string') value = clean(value);
      if (value === undefined) value = true;

      value = decodeURIComponent(String(value));

      if (value.includes(','))
        value = value.match(/(".*?"|[^",]+)/g).map(unquote);

      acc[
        decodeURIComponent(key).replace(/\./g, '~')
      ] = Array.isArray(value)
        ? value.map(ensureBoolean).map(ensureNumber)
        : ensureNumber(ensureBoolean(unquote(value)));

      return acc;
    }, {});
};
