import React from 'react';
import TooltipList, { applyFormatter } from './TooltipList';

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

  it('should invoke and return', () => {
    expect(applyFormatter(() => 'HIT', 1)).toBe('HIT');
  });

  it('should return', () => {
    expect(applyFormatter(null, 1)).toBe(1);
  });
});
