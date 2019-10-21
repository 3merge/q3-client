import React from 'react';
import Paper from '@material-ui/core/Paper';
import Timeline, { TimelineMeta } from '.';
import data from './data';

describe('Entry iteration', () => {
  it('should return nth Papers', () => {
    expect(
      global
        .shallow(<Timeline entries={data} />)
        .find(Paper),
    ).toHaveLength(data.length);
  });
});

describe('TimelineMeta', () => {
  it('should default to SYS', () => {
    expect(
      global
        .mount(<TimelineMeta />)
        .find('.MuiTypography-overline')
        .text(),
    ).toMatch('SYS');
  });
});
