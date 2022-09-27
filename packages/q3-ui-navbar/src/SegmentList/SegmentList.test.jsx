import React from 'react';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import SegmentList from './SegmentList';
import SegmentListItemAll from '../SegmentListItemAll';
import SegmentListItem from '../SegmentListItem';
import SegmentListItemLink from '../SegmentListItemLink';

describe('SegmentList', () => {
  it('should render SegmentListItemAll', () => {
    exists(
      global
        .shallow(
          <SegmentList isTopTier onEnd={jest.fn()} />,
        )
        .find(SegmentListItemAll),
    );
  });

  it('should not render SegmentListItemAll', () => {
    doesNotExist(
      global
        .shallow(<SegmentList onEnd={jest.fn()} />)
        .find(SegmentListItemAll),
    );
  });

  it('should render folders differently', () => {
    const el = global.shallow(
      <SegmentList
        onEnd={jest.fn()}
        segments={[
          {
            id: 1,
            folder: true,
            label: 'foo',
          },
          {
            id: 2,
            label: 'bar',
          },
        ]}
      />,
    );

    expect(el.find(SegmentListItem)).toHaveLength(1);
    expect(el.find(SegmentListItemLink)).toHaveLength(1);
  });
});
