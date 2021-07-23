import React from 'react';
import useActiveFilter from './useActiveFilter';

jest.mock('./useSegmentsFromProfile', () =>
  jest.fn().mockReturnValue({
    asArray: [
      {
        label: 'Quotes',
        searchValue: '?status=Quote',
        value: '?status=Quote',
        fromProfile: true,
      },
    ],
    asObject: {
      Quotes: '?status=Quote',
    },
    main: 'Quotes',
  }),
);

jest.spyOn(React, 'useContext').mockReturnValue({
  segments: {},
});

describe('useActiveFilter', () => {
  it('should combine filters from application and profile', () => {
    const { defaultQuery, filters } = useActiveFilter();

    expect(defaultQuery).toMatch('?status=Quote');
    expect(filters).toEqual([
      {
        label: 'All',
        searchValue: '?active',
        value: '?active',
        isStarred: false,
      },
      {
        label: 'Quotes',
        searchValue: '?status=Quote',
        value: '?status=Quote',
        fromProfile: true,
        isStarred: true,
      },
    ]);
  });
});
