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

    expect(el).toHaveLength(0);
  });

  it('should show ID if one other tab exists', () => {
    const el = global
      .shallow(
        <SidebarTabs commentTab={() => null}>
          <div />
        </SidebarTabs>,
      )
      .find(Tab);

    expect(el).toHaveLength(2);
  });
});
