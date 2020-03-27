import React from 'react';
import PanelIcon from '../panelIcon';

describe('PanelIcon', () => {
  it('should return expand icon', () => {
    expect(
      global.shallow(<PanelIcon hasChildren />).name(),
    ).toMatch('Expand');
  });

  it('should return warning icon', () => {
    expect(
      global
        .shallow(<PanelIcon hasChildren warning />)
        .name(),
    ).toMatch('Warning');
  });

  it('should return error icon', () => {
    expect(
      global
        .shallow(<PanelIcon hasChildren error />)
        .name(),
    ).toMatch('Error');
  });
});
