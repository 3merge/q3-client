import React from 'react';
import {
  TimelineContent,
  TimelineSeparator,
  TimelineOppositeContent,
} from '@material-ui/lab';
import Timeline, { filterData } from './Timeline';

describe('Timeline', () => {
  it('should block rendering while fetching', () => {
    expect(
      global
        .shallow(<Timeline entries={[]} fetching />)
        .isEmptyRender(),
    ).toBeTruthy();
  });

  const genData = (
    updatedFields,
    removedFields,
    modifiedOn,
  ) => ({
    updatedFields,
    removedFields,
    modifiedOn,
  });

  it('should filter timeline entries', () => {
    const data = [
      genData(),
      genData('foo'),
      genData('foo', 'bar'),
      genData('foo', 'bar', 'today'),
    ];
    const res = filterData(data);
    expect(res).toHaveLength(1);
    expect(res).toEqual([genData('foo', 'bar', 'today')]);
  });

  it('should block rendering without entries', () => {
    const data = [genData('foo'), genData('john', 'doe')];
    expect(
      global
        .shallow(<Timeline entries={data} />)
        .isEmptyRender(),
    ).toBeTruthy();
  });

  it('should block render timeline', () => {
    const data = [genData('foo', 'bar', 'today')];
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
