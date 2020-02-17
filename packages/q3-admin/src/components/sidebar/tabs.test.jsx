import React from 'react';
import Tab from '@material-ui/core/Tab';
import SidebarTabs from './tabs';

describe('SidebarTabs', () => {
  it('should disable missing tabs', () => {
    const el = global
      .shallow(
        <SidebarTabs>
          <div />
        </SidebarTabs>,
      )
      .find(Tab);

    // there are three tabs in total
    expect(el.at(1).props()).toHaveProperty(
      'disabled',
      true,
    );
    expect(el.at(2).props()).toHaveProperty(
      'disabled',
      true,
    );
  });
});
