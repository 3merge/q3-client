import React from 'react';
import useActiveFilter from './useActiveFilter';

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
            default: 'Quotes',
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
  it('should update profile and replace default', () => {
    const { modify } = useActiveFilter();
    modify(
      'All Quotes',
      'Quotes',
    )('?status=Quote&partial=false');

    expect(update).toHaveBeenCalledWith(
      {
        filters: {
          test: {
            'All Quotes': '?status=Quote&partial=false',
            default: 'All Quotes',
          },
        },
      },
      expect.any(Function),
    );
  });

  it('should update profile and leave default as-is', () => {
    const { modify } = useActiveFilter();
    modify('Testing', 'Other')('?search=Foo');

    expect(update).toHaveBeenCalledWith(
      {
        filters: {
          test: {
            'Quotes': '?status=Quote',
            'Testing': '?search=Foo',
            default: 'Quotes',
          },
        },
      },
      expect.any(Function),
    );
  });

  it('should add as current search', () => {
    const { add } = useActiveFilter('?search=Test');
    add('Testing');

    expect(update).toHaveBeenCalledWith(
      {
        filters: {
          test: {
            'Quotes': '?status=Quote',
            'Testing': '?search=Test',
            default: 'Quotes',
          },
        },
      },
      undefined,
    );
  });

  it('should remove', () => {
    const { remove } = useActiveFilter();
    remove('Quotes');

    expect(update).toHaveBeenCalledWith(
      {
        filters: {
          test: {
            default: 'Quotes',
          },
        },
      },
      undefined,
    );
  });
});
