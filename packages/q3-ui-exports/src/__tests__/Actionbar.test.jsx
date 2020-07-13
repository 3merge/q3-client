import React from 'react';
import { renderActions, intersects } from '../Actionbar';

let hasChecked;

const genActionProps = (label) => ({
  label,
});

jest.mock('../useStyle', () => () => ({
  Actionbar: 'actionbar-cls',
}));

beforeEach(() => {
  hasChecked = jest.fn();
  jest.spyOn(React, 'useContext').mockReturnValue({
    hasChecked,
  });
});

describe('Actionbar', () => {
  it('should render custom actions', () => {
    renderActions(
      [
        genActionProps('Foo'),
        genActionProps('Bar'),
        genActionProps('Quuz'),
      ],
      jest.fn(),
    ).forEach((fn) => {
      expect(fn.type.displayName).toMatch(
        'BottomNavigationAction',
      );
    });
  });

  it('should do nothing', () => {
    expect(renderActions()).toEqual(null);
  });

  it('should only pick from selected ids', () => {
    const arr = intersects(
      [
        { id: 1, foo: 1 },
        { id: 2, foo: 2 },
      ],
      [1],
    );
    expect(arr).toHaveLength(1);
    expect(arr[0]).toHaveProperty('id', 1);
  });
});
