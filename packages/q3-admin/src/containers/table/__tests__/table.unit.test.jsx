import React from 'react';
import Table, { TableSkeleton } from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import List from '..';
import EmptyView from '../../../components/empty';
import ErrorView from '../../../components/error';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    Redirect: ({ children }) => children,
  }),
}));

const spy = jest.spyOn(React, 'useContext');

describe('List', () => {
  it('should render <Error />', () => {
    spy.mockReturnValue({
      fetchingError: true,
    });
    const rows = jest.fn();
    const el = global.shallow(<List>{rows}</List>);
    expect(el.find(ErrorView)).toHaveLength(1);
    expect(rows).not.toHaveBeenCalled();
  });

  it('should render <TableSkeleton />', () => {
    spy.mockReturnValue({
      fetching: true,
    });
    const rows = jest.fn();
    const el = global.shallow(<List>{rows}</List>);
    expect(el.find(TableSkeleton)).toHaveLength(1);
    expect(rows).not.toHaveBeenCalled();
  });

  it('should render <Empty />', () => {
    spy.mockReturnValue({
      resourceName: 'foo',
      foo: [],
    });

    const rows = jest.fn();
    const el = global.shallow(<List>{rows}</List>);
    expect(el.find(EmptyView)).toHaveLength(1);
    expect(rows).not.toHaveBeenCalled();
  });

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
    expect(el.find(Table).props().actions).toHaveLength(2);
  });
});
