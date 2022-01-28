import React from 'react';
import useSegmentsFromProfile from './useSegmentsFromProfile';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?search=Test',
  }),
}));

const update = jest.fn();
const spy = jest
  .spyOn(React, 'useContext')
  .mockReturnValue({
    collectionName: 'test',
    rootPath: '/app',
    segments: {},
    state: {
      profile: {
        filters: {
          test: {
            Quotes: '?status=Quote',
          },
        },
      },
    },
    update,
  });

beforeEach(() => {
  update.mockClear();
  spy.mockClear();
});

describe('useSegmentsFromProfile', () => {
  it('should add', () => {
    const { set } = useSegmentsFromProfile('test');
    set('Testing');

    expect(update).toHaveBeenCalledWith({
      filters: {
        test: {
          'Quotes': '?status=Quote',
          'Testing': '?search=Test',
        },
      },
    });
  });

  it('should remove', () => {
    const { remove } = useSegmentsFromProfile('test');
    remove('Quotes');

    expect(update).toHaveBeenCalledWith({
      filters: {
        test: {},
      },
    });
  });

  it('should rename', () => {
    const { rename } = useSegmentsFromProfile('test');
    rename('Quotes1', 'Quotes');

    expect(update).toHaveBeenCalledWith({
      filters: {
        test: {
          'Quotes1': '?status=Quote',
        },
      },
    });
  });
});
