import React from 'react';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import SegmentListItemLink from './SegmentListItemLink';
import SegmentListItemLinkMenu from '../SegmentListItemLinkMenu';

describe('SegmentListItemLink', () => {
  it('should render null', () => {
    doesNotExist(
      global
        .shallow(
          <SegmentListItemLink id={1} label="test" />,
        )
        .find(SegmentListItemLinkMenu),
    );
  });

  it('should render link', () => {
    exists(
      global
        .shallow(
          <SegmentListItemLink
            id={1}
            label="test"
            value="?age=22"
          />,
        )
        .find(SegmentListItemLinkMenu),
    );
  });
});
