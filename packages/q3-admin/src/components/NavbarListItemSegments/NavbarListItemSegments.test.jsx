import React from 'react';
import Button from '@material-ui/core/Button';
import NavbarListItemSegments from './NavbarListItemSegments';
import useSegments from '../../hooks/useSegments';

jest.mock('@reach/router', () => ({
  Link: ({ children }) => children,
}));

jest.mock('../../hooks/useSegments', () => jest.fn());

const cls = 'makeStyles-activeSegment-2';

const getButton = (props) =>
  global
    .shallow(
      <NavbarListItemSegments
        to="/"
        label="test"
        isActive
        segments={{
          foo: '?',
          bar: '?',
        }}
        {...props}
      />,
    )
    .find(Button);

describe('NavbarListItemSegments', () => {
  test.each([
    [[], true, undefined],
    [[], false, undefined],
    [['All', 'Plus'], true, undefined],
    [['All', 'Plus'], false, undefined],
    [['All'], false, undefined],
    [['All'], true, cls],
  ])('all segment matches', (a, b, expected) => {
    useSegments.mockReturnValue({
      active: a,
    });

    expect(
      getButton({
        isActive: b,
      })
        .first()
        .prop('className'),
    ).toBe(expected);
  });

  it('should match other segment', () => {
    useSegments.mockReturnValue({
      active: ['bar'],
    });

    expect(getButton({}).last().prop('className')).toBe(
      cls,
    );
  });
});
