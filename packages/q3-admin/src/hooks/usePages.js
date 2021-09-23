import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import { groupBy } from 'lodash';
import { makePath } from '../components/app';

export default (pages = []) => {
  const { t } = useTranslation();
  const grouped = groupBy(pages, (v) => v.parent);

  const makePage = (page) => ({
    ...page,
    to: makePath(page),
    visible: page.collectionName
      ? useAuth(page.collectionName).inClient
      : true,
    label: t(`labels:${page.resourceName}`),
  });

  const cleanAndMake = (arr = []) =>
    arr.filter((p) => p.index).map(makePage);

  const entries = Object.entries(grouped).reduce(
    (acc, [key, value]) => {
      if (key === 'undefined')
        return acc.concat(cleanAndMake(value));

      return acc.concat({
        label: t(key),
        nestedMenuItems: cleanAndMake(value),
      });
    },
    [],
  );

  return entries;
};
