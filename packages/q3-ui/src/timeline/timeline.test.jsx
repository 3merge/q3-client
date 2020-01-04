import React from 'react';
import { TimelineMeta } from '.';

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
