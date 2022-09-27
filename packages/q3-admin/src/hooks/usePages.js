import { useTranslation } from 'q3-ui-locale';
import { useAuth } from 'q3-ui-permissions';
import { reduce } from 'lodash';
import { makePath } from '../components/app';
import useAccountPages from './useAccountPages';

export default (pages = []) => {
  const { t } = useTranslation('labels');

  const makePage = (page) => ({
    ...page,
    label: t(page.resourceName),
    segments: [], // see q3-ui-navbar for implementation details
    to: makePath(page),
    visible: page.collectionName
      ? useAuth(page.collectionName)?.inClient
      : true,
  });

  const makePageTree = () =>
    reduce(
      pages,
      (acc, page) => {
        if (page?.index) {
          const newPage = makePage(page);
          const { parent = 'undefined' } = page;
          if (!Array.isArray(acc[parent])) acc[parent] = [];
          acc[parent].push(newPage);
        }

        return acc;
      },
      {},
    );

  return {
    ...makePageTree(),
    account: useAccountPages(),
  };
};
