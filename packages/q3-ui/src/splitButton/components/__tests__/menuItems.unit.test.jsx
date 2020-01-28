import React from 'react';
import { MenuItem } from '@material-ui/core';
import Menu from '../menuItems';

describe('"MenuItems"', () => {
  it('should iterate options', () =>
    expect(
      global
        .shallow(
          <Menu
            items={[
              { onClick: jest.fn(), label: 'One!' },
              { onClick: jest.fn(), label: 'Two!' },
            ]}
          />,
        )
        .find(MenuItem),
    ).toHaveLength(2));
});
