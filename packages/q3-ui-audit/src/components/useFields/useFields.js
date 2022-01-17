import { useTranslation } from 'q3-ui-locale';
import { isObject, uniq } from 'lodash';
import flat from 'flat';

export default (xs) => {
  const { t } = useTranslation('labels');

  return isObject(xs)
    ? uniq(
        Object.keys(flat(xs)).map((item) =>
          String(item).replace(/\.(\d+)/g, ''),
        ),
      ).map((k) => ({
        label: t(k),
        value: k,
      }))
    : [];
};
