import React from 'react';
import Box from '@material-ui/core/Box';
import Title from '../title';

describe('Header', () => {
  it('should use resourceName as default title', () => {
    expect(
      global.shallow(<Title title="hey" />).find(Box),
    ).toHaveLength(2);
  });

  it('should use resourceName as default title', () => {
    expect(
      global
        .shallow(<Title title="hey" subtitle="there!" />)
        .find(Box),
    ).toHaveLength(3);
  });
});
