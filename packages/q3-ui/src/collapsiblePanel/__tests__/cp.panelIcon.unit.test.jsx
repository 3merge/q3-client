import React from 'react';
import PanelIcon from '../panelIcon';

describe('PanelIcon', () => {
  it('should return expand icon', () => {
    expect(
      global.shallow(<PanelIcon hasChildren />).name(),
    ).toMatch('Expand');
  });

  it('should return Box without children', () => {
    expect(global.shallow(<PanelIcon />).name()).toMatch(
      'Box',
    );
  });
});
