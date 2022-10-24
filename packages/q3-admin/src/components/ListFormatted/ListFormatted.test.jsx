import React from 'react';
import { ListItemText } from '@material-ui/core';
import { ListFormatted } from './ListFormatted';

describe('ListFormatted', () => {
  it('should', () => {
    const el = global
      .shallow(
        <ListFormatted
          data={{
            name: 'George',
            netWorth: '100000',
          }}
          fields={[
            {
              field: 'name',
              label: 'firstName',
            },
            {
              field: 'netWorth',
              formatter: 'price',
            },
          ]}
        />,
      )
      .find(ListItemText);

    expect(el).toHaveLength(2);
    expect(el.at(0).props()).toMatchObject({
      primary: 'firstName',
      secondary: 'George',
    });

    expect(el.at(1).props()).toMatchObject({
      primary: 'netWorth',
      secondary: '$100,000.00',
    });
  });
});
