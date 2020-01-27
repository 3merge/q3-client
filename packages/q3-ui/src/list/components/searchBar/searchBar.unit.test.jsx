import React from 'react';
import Searchbar from '.';
import SearchContext from '../../utils/searchContext';

jest.mock('useful-state', () => ({
  useValue: jest.fn().mockReturnValue({
    value: 'Mocked',
  }),
}));

describe('List/SearchBar', () => {
  it('should pass function to child', () => {
    const fn = jest.fn();
    global.shallow(<Searchbar>{fn}</Searchbar>);
    expect(fn).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should register value with Provider', () => {
    const props = global
      .shallow(<Searchbar>{jest.fn()}</Searchbar>)
      .find(SearchContext.Provider)
      .props();
    expect(props).toHaveProperty('value', {
      term: 'Mocked',
    });
  });
});
