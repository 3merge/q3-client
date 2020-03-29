import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import List, { searchObject } from './List';

const itemStub = {
  foo: 'Foo',
  bar: 'Bar',
  quuz: 1,
};

jest.mock('@material-ui/core/useMediaQuery', () =>
  jest.fn().mockReturnValue(true),
);

describe('List', () => {
  it('should render attributes', () => {
    const el = global
      .shallow(
        <List
          data={[]}
          cardProps={{ attributes: ['foo', 'bar'] }}
        >
          <div />{' '}
        </List>,
      )
      .find(TableHead)
      .find(TableCell);
    expect(el.length).toBeGreaterThan(2);
  });

  it('should match term to object', () => {
    expect(searchObject(itemStub)('Foo')).toBeTruthy();
    expect(searchObject(itemStub)('1')).toBeTruthy();
    expect(searchObject(itemStub)('Barn')).toBeFalsy();
  });
});
