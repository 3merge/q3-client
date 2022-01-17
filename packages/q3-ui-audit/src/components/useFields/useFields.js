import { useTranslation } from 'q3-ui-locale';
import { isObject, uniq } from 'lodash';
import flat from 'flat';

export default (xs) => {
  const { t } = useTranslation('labels');

  return isObject(xs)
    ? uniq(
        Object.keys(flat(xs)).map((item) => {
          const k = String(item).replace(/\.(\d+)/g, '');

          return {
            label: t(k),
            value: k,
          };
        }),
      )
    : [];
};
