import React from 'react';
import List, { searchObject } from './List';
import ActionBar from '../ActionBar';

const itemStub = {
  foo: 'Foo',
  bar: 'Bar',
  quuz: 1,
};

jest.mock('@material-ui/core/useMediaQuery', () =>
  jest.fn().mockReturnValue(true),
);

describe('List', () => {
  it.skip('should render attributes', () => {
    const { renderUnselected } = global
      .shallow(
        <List
          data={[]}
          cardProps={{ attributes: ['foo', 'bar'] }}
        >
          <div />{' '}
        </List>,
      )
      .find(ActionBar)
      .props();

    expect(renderUnselected).not.toBeNull();
  });

  it('should match term to object', () => {
    expect(searchObject(itemStub)('Foo')).toBeTruthy();
    expect(searchObject(itemStub)('1')).toBeTruthy();
    expect(searchObject(itemStub)('Barn')).toBeFalsy();
  });
});
