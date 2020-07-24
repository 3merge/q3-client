import React from 'react';
import Location from 'q3-ui-test-utils/lib/location';
import NavigationSubMenu from './NavigationSubMenu';
import { extendedMenuItems } from '../../__fixtures__/menuItems';

describe('NavigationSubMenu', () => {
  it('should identify link as active', () => {
    const el = global.mount(
      <Location initialPath="/messages">
        <NavigationSubMenu items={extendedMenuItems} />
      </Location>,
    );

    expect(el.find('.active').text()).toMatch('Messages');
  });

  it('should remove non-links', () => {
    const el = global.mount(
      <Location initialPath="/">
        <NavigationSubMenu items={[{ label: 'Foo' }]} />
      </Location>,
    );

    expect(el.find('a').exists()).toBeFalsy();
  });
});
