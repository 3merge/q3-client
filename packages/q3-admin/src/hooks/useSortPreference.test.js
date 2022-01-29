import React from 'react';
import useSortPreference from './useSortPreference';

let context;

beforeAll(() => {
  context = jest
    .spyOn(React, 'useContext')
    .mockReturnValue(() => {
      // here
    });
});

describe('useSortPreference', () => {
  it('should call update func', () => {
    const update = jest.fn();
    context.mockReturnValue({
      update,
    });

    useSortPreference().update('-test');
    expect(update).toHaveBeenCalledWith({
      sorting: {
        profile: '-test',
      },
    });
  });

  it('should return state default', () => {
    context.mockReturnValue({
      state: {
        profile: {
          sorting: {
            profile: 'foo',
          },
        },
      },
    });

    expect(useSortPreference()).toHaveProperty(
      'sort',
      'foo',
    );
  });

  it('should return param default', () => {
    context.mockReturnValue({
      state: {},
    });

    expect(useSortPreference()).toHaveProperty(
      'sort',
      '-updatedAt',
    );
  });
});
