import React from 'react';
import TimelineEntry from './TimelineEntry';
import TimelineCode from '../TimelineCode';

describe('TimelineEntry', () => {
  it('should return empty without data', () => {
    expect(
      global.shallow(<TimelineEntry />).isEmptyRender(),
    ).toBeTruthy();
  });

  it('should return fields if changes under length', () => {
    const data = {
      updatedFields: {
        achievement: [{ description: 'England' }],
        seasons: Array(15).fill(1),
      },
    };
    const res = global.shallow(
      <TimelineEntry data={data} />,
    );

    expect(res.find(TimelineCode).exists()).toBeTruthy();
  });

  it('should return bulk op message', () => {
    const data = {
      updatedFields: {
        achievement: [{ description: 'England' }],
        seasons: Array(21).fill(1),
      },
    };
    const res = global.shallow(
      <TimelineEntry data={data} />,
    );
  });

  it.todo(
    'should replace array dot notation with positional characters ($)',
  );
});
