import { get, filter, map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import useSegments from './useSegments';
import useSegmentsFromProfile from './useSegmentsFromProfile';

const mapActive = (segmentContext, callback) =>
  map(
    filter(
      get(segmentContext, 'active'),
      (v) => v !== 'All',
    ),
    callback,
  ).flat();

const useSegmentsFromCollection = (collectionName) => {
  const { t } = useTranslation('labels');
  const {
    asArray: profileSegments,
    rename,
    remove,
    set,
  } = useSegmentsFromProfile(collectionName);

  return [
    {
      label: 'addSegment',
      onClick() {
        // eslint-disable-next-line
        set(prompt('nameSegment'));
      },
    },
  ].concat(
    mapActive(useSegments(profileSegments), (s) => {
      const curryFunction = (fn) => () => fn(s);

      return [
        {
          label: `${t('rename')} "${s}"`,
          onClick() {
            // eslint-disable-next-line
            rename(prompt(t('renameSegment')), s);
          },
        },
        {
          label: t('replaceSegment', {
            name: s,
          }),
          onClick: curryFunction(set),
        },
        {
          label: `${t('remove')} "${s}"`,
          onClick: curryFunction(remove),
        },
        {},
      ];
    }),
  );
};

export default useSegmentsFromCollection;
