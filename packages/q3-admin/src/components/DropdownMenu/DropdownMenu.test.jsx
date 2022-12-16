import React from 'react';
import { Link } from '@reach/router';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Location from 'q3-ui-test-utils/lib/location';
import DropdownMenu from './DropdownMenu';

describe('DropdownMenu', () => {
  it('should render dividers', () => {
    const el = global.shallow(
      <Location>
        <DropdownMenu
          items={[
            {
              divider: true,
            },
          ]}
        >
          {jest.fn()}
        </DropdownMenu>
      </Location>,
    );

    expect(el.find(Divider)).toHaveLength(1);
    expect(el.find(MenuItem)).toHaveLength(0);
  });

  it('should render links and buttons', () => {
    const el = global
      .shallow(
        <Location>
          <DropdownMenu
            items={[
              {
                to: '',
                label: 'link',
              },
              {
                onClick: jest.fn(),
                label: 'button',
              },
            ]}
          >
            {jest.fn()}
          </DropdownMenu>
        </Location>,
      )
      .find(MenuItem);

    const getComponentValueAt = (index) =>
      el.at(index).props().component;

    expect(getComponentValueAt(0)).toEqual(Link);
    expect(getComponentValueAt(1)).toMatch('button');
  });
});
