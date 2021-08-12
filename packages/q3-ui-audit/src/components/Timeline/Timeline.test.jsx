import React from 'react';
import GraphicWithMessage from 'q3-ui-assets';
import CircularProgress from '@material-ui/core/CircularProgress';
import Timeline from './Timeline';
import TimelineEntry from '../TimelineEntry';

const data = [
  {
    updated: { foo: 1 },
    added: { foo: 1 },
    date: new Date().toISOString(),
  },
  {
    deleted: { foo: 1 },
    date: new Date().toISOString(),
  },
];

describe('Timeline', () => {
  it('should render error', () => {
    expect(
      global
        .shallow(<Timeline error />)
        .find(GraphicWithMessage)
        .prop('title'),
    ).toMatch('cannotAudit');
  });

  it('should render loading', () => {
    expect(
      global
        .shallow(<Timeline loading />)
        .find(CircularProgress)
        .exists(),
    ).toBeTruthy();
  });

  it('should render empty', () => {
    expect(
      global
        .shallow(<Timeline />)
        .find(GraphicWithMessage)
        .prop('title'),
    ).toMatch('nothingToAudit');
  });

  it('should render data', () => {
    expect(
      global
        .shallow(<Timeline data={data} />)
        .find(TimelineEntry),
    ).toHaveLength(3);
  });

  it('should filter by operation', () => {
    expect(
      global
        .shallow(
          <Timeline
            filterState={{
              operation: 'deleted',
            }}
            data={data}
          />,
        )
        .find(TimelineEntry),
    ).toHaveLength(1);
  });

  it('should filter by operation array', () => {
    expect(
      global
        .shallow(
          <Timeline
            filterState={{
              operation: ['updated', 'added'],
            }}
            data={data}
          />,
        )
        .find(TimelineEntry),
    ).toHaveLength(2);
  });
});
