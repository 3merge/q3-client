import React from 'react';
import PanelIcon from '../panelIcon';

describe('PanelIcon', () => {
  it('should return expand icon', () => {
    expect(global.shallow(<PanelIcon />).name()).toMatch(
      'Expand',
    );
  });

  it('should return warning icon', () => {
    expect(
      global.shallow(<PanelIcon warning />).name(),
    ).toMatch('Warning');
  });

  it('should return error icon', () => {
    expect(
      global.shallow(<PanelIcon error />).name(),
    ).toMatch('Error');
  });
});
