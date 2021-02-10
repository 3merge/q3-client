import React from 'react';
import TooltipList from './TooltipList';

describe('TooltipList', () => {
  it('should return list items', () => {
    expect(
      global
        .render(
          <TooltipList
            data={[
              {
                name: 'Testing',
                payload: {
                  Testing: 'Component',
                },
              },
            ]}
          />,
        )
        .find('li')
        .text(),
    ).toMatch('Testing: Component');
  });
});
