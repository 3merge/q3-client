import React from 'react';
import Searchbar from 'q3-ui/lib/searchBar';
import { Search } from './search';

jest.mock('q3-ui-rest', () => ({
  getSafelyForAutoCompleteWithProjection: jest
    .fn()
    .mockImplementation(() => () =>
      Promise.resolve([1, 2]),
    ),
}));

describe('Search', () => {
  it('should modify response', async () => {
    const intercept = jest.fn();
    const params = {
      delete: jest.fn(),
      set: jest.fn(),
      toString: jest.fn(),
    };

    const { getResults } = global
      .shallow(
        <Search resolvers={intercept} params={params} />,
      )
      .find(Searchbar)
      .props();

    await getResults();
    expect(params.delete).toHaveBeenCalledWith('search');
    expect(params.delete).toHaveBeenCalledWith('page');
    expect(params.set).toHaveBeenCalledWith('limit', 25);
    expect(intercept.mock.calls).toHaveLength(2);
  });
});
