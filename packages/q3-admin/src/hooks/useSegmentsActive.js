import React from 'react';
import { compact, get, isFunction } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../containers/state';
import useSegments, {
  mapSegmentsToListData,
} from './useSegments';
import useSegmentsFromProfile from './useSegmentsFromProfile';

const useSegmentsActive = () => {
  const { collectionName, segments } =
    React.useContext(Definitions);

  const { state } = React.useContext(AuthContext);

  const fromCollection = mapSegmentsToListData(
    isFunction(segments)
      ? segments(state?.profile)
      : segments,
  );
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

  return useSegments(merge(fromCollection, fromProfile));
};

export default useSegmentsActive;
