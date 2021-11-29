import { useTranslation } from 'q3-ui-locale';
import { useAuth } from 'q3-ui-permissions';
import { makePath } from '../app';

export default (pages = []) => {
  const { t } = useTranslation();

  return Array.isArray(pages)
    ? pages
        .filter((page) => page.index)
        .map((page) => ({
          ...page,
          to: makePath(page),
          visible: useAuth(page.collectionName).canSee,
          label: t(`labels:${page.resourceName}`),
          icon: page.icon,
        }))
    : [];
};
