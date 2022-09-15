import {
  useContextMock,
  useMemoMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import useSegmentsWithPages from './useSegmentsWithPages';

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
        },
        {
          collectionName: 'bar',
        },
      ]),
    ).toEqual([
      {
        collectionName: 'foo',
        segments: [
          {
            id: 'folder-1',
            folder: true,
            label: 'foo',
            segments: [
              {
                id: 'folder-1a',
                folderId: 'folder-1',
                folder: true,
                label: 'thunk',
                segments: [
                  {
                    folderId: 'folder-1a',
                    label: 'baz',
                    value: '?',
                  },
                ],
              },
            ],
          },
          {
            label: 'bar',
            value: '?',
          },
          {
            id: 'folder-2',
            folder: true,
            label: 'tharp',
            segments: [
              {
                folderId: 'folder-2',
                label: 'quuz',
                value: '?',
              },
            ],
          },
        ],
      },
      {
        collectionName: 'bar',
        segments: [],
      },
    ]);
  });
});
