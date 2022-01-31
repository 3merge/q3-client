import React from 'react';
import { compact, get } from 'lodash';
import { Definitions } from '../containers/state';
import useSegments, {
  mapSegmentsToListData,
} from './useSegments';
import useSegmentsFromProfile from './useSegmentsFromProfile';

const useSegmentsActiveLabel = () => {
  const { collectionName, segments } =
    React.useContext(Definitions);

  const fromCollection = mapSegmentsToListData(segments);
  const fromProfile = get(
    useSegmentsFromProfile(collectionName),
    'asArray',
    [],
  );

  const merge = (a, b) => {
    try {
      return compact(a.concat(b).flat());
    } catch (e) {
      return [];
    }
  };

  return get(
    useSegments(merge(fromCollection, fromProfile)),
    'active',
  );
};

export default useSegmentsActiveLabel;
