import React from 'react';
import Table from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import List from '..';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    Redirect: ({ children }) => children,
  }),
}));

const spy = jest.spyOn(React, 'useContext');

describe('List', () => {
  it('should include the bulk delete action', () => {
    spy.mockReturnValue({
      resourceName: 'foo',
      removeBulk: jest.fn(),
      foo: [{ id: 1 }],
    });

    useAuth.mockReturnValue({
      Redirect: ({ children }) => children,
      canDelete: true,
    });

    const rows = jest.fn();
    const el = global.shallow(<List id={1}>{rows}</List>);
    expect(el.find(Table).props().actions).toHaveLength(1);
  });
});
