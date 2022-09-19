import React from 'react';
import { isEqual, groupBy, reduce } from 'lodash';
import SegmentsContext from '../SegmentsContext';
import useSegmentsLocationCheck from '../useSegmentsLocationCheck';
import {
  clean,
  copyArray,
  mergeWithObjectArray,
} from '../utils';

const useSegmentsStructuredTree = () => {
  const { data } = React.useContext(SegmentsContext);
  const { check, state: locationState } =
    useSegmentsLocationCheck();

  /**
   * @NOTE
   * This function and its sub-functions rely heavily
   * on mutation. Do not refactor to avoid this intentional behaviour.
   */
  const createFolderTree = (collectionSegmentData) => {
    const copy = copyArray(collectionSegmentData);

    const removeMetaData = (obj) => {
      // eslint-disable-next-line
      delete obj.collectionName;
      return obj;
    };

    const findByFolderId = (id) =>
      copy.find(
        (item) =>
          item.folder && isEqual(clean(item.id), clean(id)),
      );

    return reduce(
      copy,
      (acc, curr) => {
        const outputObj = removeMetaData(curr);
        const { folderId } = curr;

        if (clean(folderId))
          mergeWithObjectArray(
            findByFolderId(folderId),
            'segments',
            outputObj,
          );
        else acc.push(outputObj);
        return acc;
      },
      [],
    );
  };

  return React.useMemo(
    () =>
      Object.entries(
        groupBy(data, 'collectionName'),
      ).reduce(
        (acc, [collectionName, segmentData]) =>
          clean(collectionName)
            ? Object.assign(acc, {
                [collectionName]: createFolderTree(
                  check(segmentData),
                ),
              })
            : acc,
        {},
      ),
    [data, locationState],
  );
};

export default useSegmentsStructuredTree;
