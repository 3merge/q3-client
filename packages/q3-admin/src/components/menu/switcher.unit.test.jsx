import React from 'react';
import Menu from 'q3-ui/lib/menu';
import Switcher from './switcher';

describe('Switcher', () => {
  it('should render <Menu />', () => {
    const el = global.shallow(
      <Switcher items={[]} title="WithoutFilter" />,
    );
    expect(el.find(Menu)).toHaveLength(1);
  });

  it('should invoke renderFilter on activePage prop', () => {
    const renderFilter = jest.fn();
    global.shallow(
      <Switcher
        activePage={{ renderFilter }}
        items={[]}
        title="WitFilter"
      />,
    );
    expect(renderFilter).toHaveBeenCalled();
  });
});
