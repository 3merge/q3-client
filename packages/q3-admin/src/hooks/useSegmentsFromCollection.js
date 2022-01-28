/* eslint-disable no-alert */
import { get, filter, map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import useSegments from './useSegments';
import useSegmentsFromProfile from './useSegmentsFromProfile';

const useSegmentsFromCollection = (collectionName) => {
  const { t } = useTranslation('labels');
  const {
    asArray: profileSegments,
    rename,
    remove,
    set,
  } = useSegmentsFromProfile(collectionName);

  const profileSegmentsWithActiveStats =
    useSegments(profileSegments);

  const mapActive = (segmentContext, callback) =>
    map(
      filter(
        get(segmentContext, 'active'),
        (v) => v !== 'All',
      ),
      callback,
    ).flat();

  return [
    {
      label: 'addSegment',
      onClick() {
        set(prompt(t('nameSegment')));
      },
    },
  ].concat(
    mapActive(profileSegmentsWithActiveStats, (name) => {
      const curryFunction = (fn) => () => fn(name);

      return [
        {
          label: t('renameSegment', {
            name,
          }),
          onClick() {
            rename(prompt(t('renameSegmentPrompt')), name);
          },
        },
        {
          label: t('replaceSegment', {
            name,
          }),
          onClick: curryFunction(set),
        },
        {
          label: t('removeSegment', {
            name,
          }),
          onClick: curryFunction(remove),
        },
      ];
    }),
  );
};

export default useSegmentsFromCollection;
