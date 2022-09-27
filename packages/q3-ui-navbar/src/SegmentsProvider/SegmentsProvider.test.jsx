import React from 'react';
import {
  exists,
  doesNotExist,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import SegmentsProvider from './SegmentsProvider';
import useSegmentsFetch from '../useSegmentsFetch';
import SegmentsContext from '../SegmentsContext';

jest.mock('../useSegmentsFetch');

describe('SegmentsProvider', () => {
  it('should render fallback', () => {
    useSegmentsFetch.mockReturnValue({
      init: false,
    });

    // here
    doesNotExist(
      global
        .shallow(<SegmentsProvider />)
        .find(SegmentsContext.Provider),
    );
  });

  it('should render provider', () => {
    useSegmentsFetch.mockReturnValue({
      init: true,
    });

    // here
    exists(
      global
        .shallow(<SegmentsProvider />)
        .find(SegmentsContext.Provider),
    );
  });
});
