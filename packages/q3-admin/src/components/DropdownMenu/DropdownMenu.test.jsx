import React from 'react';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from './DropdownMenu';

jest.mock('@reach/router', () => ({
  useNavigate: jest.fn(),
}));

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

  it('should change click handlers for links', () => {
    const el = global
      .shallow(
        <DropdownMenu
          items={[
            {
              to: '',
              label: 'link',
            },
            {
              onClick: 1,
              label: 'button',
            },
          ]}
        >
          {jest.fn()}
        </DropdownMenu>,
      )
      .find(MenuItem);

    const getComponentValueAt = (index) =>
      el.at(index).props().onClick;

    expect(getComponentValueAt(0)).toEqual(
      expect.any(Function),
    );
  });
});
