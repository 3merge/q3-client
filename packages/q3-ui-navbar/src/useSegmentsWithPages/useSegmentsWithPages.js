import { useMatch } from '@reach/router';
import {
  compact,
  get,
  map,
  pick,
  isFunction,
} from 'lodash';
import useSegmentsStructuredTree from '../useSegmentsStructuredTree';

const useSegmentsWithPages = (customizer) => {
  const structured = useSegmentsStructuredTree();

  return (pages) =>
    map(pages, (page) => {
      const { to } = page;
      const isOnPage = useMatch(to);

      const addPagePath = (segments) => {
        const combineWithTo = (str) =>
          str ? compact([to, str]).join('') : null;

        const shouldConsiderCollectionSegmentApplied = (
          bool,
        ) => (isOnPage ? bool : false);

        const addPagePathExec = (xs) =>
          map(compact(xs), (item) => ({
            ...item,
            applied: shouldConsiderCollectionSegmentApplied(
              item.applied,
            ),
            segments: addPagePathExec(item.segments),
            value: combineWithTo(item.value),
          }));

        return addPagePathExec(segments);
      };

      const output = {
        ...pick(page, [
          'id',
          'collectionName',
          'enableSegments',
          'label',
          'icon',
          'parent',
          'to',
          'badge',
        ]),
        segments: addPagePath(
          get(structured, page?.collectionName, []),
        ),
      };

      return isFunction(customizer)
        ? customizer(output)
        : output;
    });
};

export default useSegmentsWithPages;
