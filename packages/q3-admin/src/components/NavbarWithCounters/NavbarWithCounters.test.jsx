import { mergeCountersWithPages } from './NavbarWithCounters';

describe('mergeCountersWithPages', () => {
  it('should handle pages', () => {
    expect(
      mergeCountersWithPages({
        notifications: 9,
        shows: 3,
        432: 3,
      })({
        id: 'shows',
      }),
    ).toMatchObject({
      id: 'shows',
      badge: 3,
    });
  });

  it('should recurse segmets', () => {
    expect(
      mergeCountersWithPages({
        432: 3,
        9234: 1,
      })({
        id: 'movies',
        segments: [
          {
            id: 432,
            folder: true,
            segments: [
              {
                id: 9234,
              },
            ],
          },
        ],
      }),
    ).toMatchObject({
      id: 'movies',
      segments: [
        {
          id: 432,
          badge: 3,
          folder: true,
          segments: [
            {
              id: 9234,
              badge: 1,
            },
          ],
        },
      ],
    });
  });
});
