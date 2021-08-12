import React from 'react';
import GraphicWithMessage from 'q3-ui-assets';
import CircularProgress from '@material-ui/core/CircularProgress';
import Timeline from './Timeline';
import TimelineEntry from '../TimelineEntry';

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
        .shallow(
          <Timeline
            data={[
              { date: new Date().toISOString() },
              { date: new Date().toISOString() },
            ]}
          />,
        )
        .find(TimelineEntry),
    ).toHaveLength(2);
  });
});
