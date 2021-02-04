import { useTranslation } from 'react-i18next';
import { first } from 'lodash';
import { timezone } from 'q3-ui-locale';

const hasValue = ([, result]) => Boolean(result);

export const replaceWorkaroundCharacters = (str) =>
  String(str).replace(/(>|<)/gi, '').replace(/~/gi, '.');

export const replaceTimestamp = (str) =>
  timezone.isUtc(str)
    ? timezone.toLocal(str, timezone.YMD)
    : String(str).replace(/^"(.*)"$/, '$1');

export default () => {
  const { t } = useTranslation();

  return (name, value, isArray = false) => {
    const a = String(name);
    const b = String(isArray ? 'in' : value);

    const op =
      first(
        Object.entries({
          hasNot: a.startsWith('!') || b === 'has(false)',
          has: b === 'undefined' || b === 'has(true)',
          doesNotInclude:
            a.endsWith('!') && b.startsWith('in'),
          doesNotEqual: a.endsWith('!'),
          equals: b.startsWith('string'),
          includes: b.startsWith('in'),
          lessThan: a.endsWith('<'),
          moreThan: a.endsWith('>'),
          exists: b === 'exists(true)',
          doesNotExist: b === 'exists(false)',
        }).find(hasValue),
      ) || 'equals';

    return t(`labels:${op}`, {
      key: t(`labels:${replaceWorkaroundCharacters(name)}`),
      value: t(`filters:${replaceTimestamp(value)}`),
    });
  };
};
