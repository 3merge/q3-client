import React from 'react';
import { first } from 'lodash';
import { CircularProgress } from '@material-ui/core';
import {
  TimelineContent,
  TimelineSeparator,
  TimelineOppositeContent,
} from '@material-ui/lab';
import GraphicWithMessage from 'q3-ui-assets';
import Timeline from './Timeline';
import data from './data';

describe('Timeline', () => {
  it('should block rendering while fetching', () => {
    expect(
      global
        .shallow(<Timeline entries={[]} fetching />)
        .find(CircularProgress),
    ).toHaveLength(1);
  });

  it('should block rendering without entries', () => {
    expect(
      global
        .shallow(<Timeline entries={[first(data)]} />)
        .find(GraphicWithMessage),
    ).toHaveLength(1);
  });

  it('should block render timeline', () => {
    const res = global.mount(<Timeline entries={data} />);
    [
      TimelineContent,
      TimelineSeparator,
      TimelineOppositeContent,
    ].forEach((el) =>
      expect(res.find(el).exists).toBeTruthy(),
    );
  });
});
