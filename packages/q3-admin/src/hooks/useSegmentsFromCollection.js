/* eslint-disable no-alert */
import { useTranslation } from 'q3-ui-locale';
import useSegments from './useSegments';
import useSegmentsFromProfile from './useSegmentsFromProfile';

const useSegmentsFromCollection = (
  collectionName,
  options = {},
) => {
  const { t } = useTranslation('labels');
  const {
    asArray: profileSegments,
    rename,
    remove,
    set,
  } = useSegmentsFromProfile(collectionName, options);

  const { active: name } = useSegments(profileSegments);
  const curryFunction = (fn) => () => fn(name);

  return [
    {
      label: 'addSegment',
      onClick() {
        set(prompt(t('nameSegment')));
      },
    },
  ].concat(
    name
      ? [
          {
            label: t('renameSegment', {
              name,
            }),
            onClick() {
              rename(
                prompt(t('renameSegmentPrompt')),
                name,
              );
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
        ]
      : [],
  );
};

export default useSegmentsFromCollection;
