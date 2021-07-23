import React from 'react';
import { isEqual } from 'lodash';
import { Definitions } from '../containers/state';
import useSegmentsFromProfile from './useSegmentsFromProfile';
import { mapSegmentsToListData } from './useSegments';

const setStarredAttributeForEach = (
  defaultSegmentLabel,
) => (item) => ({
  ...item,
  isStarred: isEqual(item.label, defaultSegmentLabel),
});

export default (search) => {
  const { segments = {} } = React.useContext(Definitions);
  const {
    asObject,
    asArray,
    main,
    ...rest
  } = useSegmentsFromProfile(search);

  return {
    filters: [
      {
        label: 'All',
        searchValue: '?active',
        value: '?active',
      },
      ...mapSegmentsToListData(segments),
      ...asArray,
    ].map(setStarredAttributeForEach(main)),

    defaultQuery: {
      ...segments,
      ...asObject,
    }[main],

    ...rest,
  };
};
