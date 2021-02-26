import React from 'react';
import {
  TimelineContent,
  TimelineSeparator,
  TimelineOppositeContent,
} from '@material-ui/lab';
import Timeline from './Timeline';
import data from './data';

describe('Timeline', () => {
  it('should block rendering while fetching', () => {
    expect(
      global
        .shallow(<Timeline entries={[]} fetching />)
        .isEmptyRender(),
    ).toBeTruthy();
  });

  it('should block rendering without entries', () => {
    expect(
      global
        .shallow(<Timeline entries={[]} />)
        .isEmptyRender(),
    ).toBeTruthy();
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
