import {
  useContextMock,
  useMemoMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import useSegmentsWithPages from './useSegmentsWithPages';

jest.mock('@reach/router', () => ({
  useMatch: jest.fn(),
  useLocation: jest.fn().mockReturnValue({}),
}));

useContextMock().changeReturnValue({
  data: [
    {
      id: 'folder-1',
      folder: true,
      label: 'foo',
    },
    {
      label: 'bar',
      value: '?',
    },
    {
      folderId: 'folder-2',
      label: 'quuz',
      value: '?',
    },
    {
      id: 'folder-1a',
      folder: true,
      folderId: 'folder-1',
      label: 'thunk',
    },
    {
      id: 'folder-2',
      folder: true,
      label: 'tharp',
    },
    {
      folderId: 'folder-1a',
      label: 'baz',
      value: '?',
    },
  ].map((item) => ({
    collectionName: 'foo',
    ...item,
  })),
});

useMemoMock();

describe('useSegmentsWithPages', () => {
  it('should include segment tree per collection match', () => {
    expect(
      useSegmentsWithPages()([
        {
          collectionName: 'foo',
          to: '/foo',
        },
        {
          collectionName: 'bar',
          to: '/bar',
        },
      ]),
    ).toEqual([
      {
        collectionName: 'foo',
        to: '/foo',
        segments: [
          expect.objectContaining({
            id: 'folder-1',
            folder: true,
            label: 'foo',
            segments: [
              expect.objectContaining({
                id: 'folder-1a',
                folderId: 'folder-1',
                folder: true,
                label: 'thunk',
                segments: [
                  expect.objectContaining({
                    folderId: 'folder-1a',
                    label: 'baz',
                    value: '/foo?',
                  }),
                ],
              }),
            ],
          }),
          expect.objectContaining({
            label: 'bar',
            value: '/foo?',
          }),
          expect.objectContaining({
            id: 'folder-2',
            folder: true,
            label: 'tharp',
            segments: [
              expect.objectContaining({
                folderId: 'folder-2',
                label: 'quuz',
                value: '/foo?',
              }),
            ],
          }),
        ],
      },
      {
        collectionName: 'bar',
        to: '/bar',
        segments: [],
      },
    ]);
  });
});
