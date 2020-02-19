import React from 'react';
import Box from '@material-ui/core/Box';
import Authorship from '.';

describe('Authorship', () => {
  it('should print authorship text line', () => {
    const text = global
      .shallow(
        <Authorship
          author="Jon Doe"
          date={new Date('01-01-2020').toISOString()}
        />,
      )
      .find(Box)
      .text();

    expect(text).toMatch('Jon Doe on Jan 01, 2020');
  });
});
