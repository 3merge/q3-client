import React from 'react';
import Add from '@material-ui/icons/Add';
import MuiAvatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Avatar, { WithTooltip, WithBadge } from '.';
import Tooltip from '../tooltip';

describe('Avatar', () => {
  it('should parse the first letter', () =>
    expect(
      global
        .shallow(<Avatar word="Mike" />)
        .find(MuiAvatar)
        .text(),
    ).toBe('M'));

  it('should assign click handler', () =>
    expect(
      global
        .shallow(<Avatar onClick={jest.fn()} />)
        .find(MuiAvatar)
        .props(),
    ).toMatchObject({
      tabIndex: 0,
      onClick: expect.any(Function),
    }));

  it('should wrap in a tooltip', () =>
    expect(
      global
        .shallow(<WithTooltip tooltip="Hey" />)
        .find(Tooltip).length,
    ).toBe(1));

  it('should wrap in a badge', () =>
    expect(
      global
        .shallow(<WithBadge superscript="Badge!" />)
        .find(Badge).length,
    ).toBe(1));

  it('should render Icon', () =>
    expect(
      global
        .shallow(<Avatar word="Mike" icon={Add} />)
        .find(Add),
    ).toHaveLength(1));
});
