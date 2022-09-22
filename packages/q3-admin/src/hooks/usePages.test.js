import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import usePages from './usePages';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

jest.mock('./useAccountPages', () =>
  jest.fn().mockReturnValue([]),
);

const stubProfile = (state = {}) =>
  jest.spyOn(React, 'useContext').mockReturnValue({
    state,
  });

describe('usePages', () => {
  it('should remove non-index pages', () => {
    stubProfile();
    useAuth.mockReturnValue({
      inClient: false,
    });

    expect(
      usePages([
        {
          collectionName: 'foo',
          id: true,
        },
      ]),
    ).toEqual({
      account: [],
    });
  });

  it('should mark as visible', () => {
    stubProfile();
    useAuth.mockReturnValue({
      inClient: true,
    });

    expect(
      usePages([
        {
          collectionName: 'foo',
          resourceName: 'foo',
          index: true,
        },
      ]),
    ).toMatchObject({
      undefined: [
        expect.objectContaining({
          label: 'foo',
          visible: true,
        }),
      ],
    });
  });

  it('should filter', () => {
    stubProfile({
      profile: {
        filters: {
          test: {
            custom: '?',
          },
        },
      },
    });

    useAuth.mockReturnValue({
      inClient: false,
    });

    expect(
      usePages([
        {
          collectionName: 'test',
          resourceName: 'test',
          index: true,
          parent: 'test',
        },
      ]),
    ).toMatchObject({});
  });
});
