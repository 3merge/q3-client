import React from 'react';
import { Link } from '@reach/router';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from './DropdownMenu';

describe('DropdownMenu', () => {
  it('should render dividers', () => {
    const el = global.shallow(
      <DropdownMenu
        items={[
          {
            divider: true,
          },
        ]}
      >
        {jest.fn()}
      </DropdownMenu>,
    );

    expect(el.find(Divider)).toHaveLength(1);
    expect(el.find(MenuItem)).toHaveLength(0);
  });

  it('should render links and buttons', () => {
    const el = global
      .shallow(
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
        </DropdownMenu>,
      )
      .find(MenuItem);

    const getComponentValueAt = (index) =>
      el.at(index).props().component;

    expect(getComponentValueAt(0)).toEqual(Link);
    expect(getComponentValueAt(1)).toMatch('button');
  });
});
