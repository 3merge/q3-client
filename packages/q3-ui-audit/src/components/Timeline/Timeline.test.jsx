import React from 'react';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Timeline from './Timeline';
import TimelineEntry from '../TimelineEntry';

const data = [
  {
    updates: [{ foo: 1 }],
    additions: [{ foo: 1 }],
    date: new Date().toISOString(),
  },
  {
    deletions: [{ foo: 1 }],
    date: new Date().toISOString(),
  },
];

describe('Timeline', () => {
  it('should render error', () => {
    expect(
      global
        .shallow(<Timeline fetchingError />)
        .find(Alert)
        .prop('severity'),
    ).toMatch('error');
  });

  it('should render loading', () => {
    expect(
      global
        .shallow(<Timeline fetching />)
        .find(CircularProgress)
        .exists(),
    ).toBeTruthy();
  });

  it('should render empty', () => {
    expect(
      global
        .shallow(<Timeline />)
        .find(Alert)
        .prop('severity'),
    ).toMatch('warning');
  });

  it('should render data', () => {
    expect(
      global
        .shallow(<Timeline changes={data} />)
        .find(TimelineEntry),
    ).toHaveLength(3);
  });
});
