import useSegmentsAppliedByCollection from './useSegmentsAppliedByCollection';

jest.mock('../useSegmentsStructuredTree', () =>
  jest.fn().mockReturnValue({
    tests: [
      {
        id: 1,
        applied: true,
        folder: true,
        segments: [
          {
            id: 2,
            applied: true,
            folder: true,
            segments: [
              {
                id: 3,
                applied: true,
              },
            ],
          },
        ],
      },
    ],
  }),
);

describe('useSegmentsAppliedByCollection', () => {
  it('should', () => {
    expect(
      useSegmentsAppliedByCollection('tests'),
    ).toMatchObject({
      id: 3,
    });
  });
});
