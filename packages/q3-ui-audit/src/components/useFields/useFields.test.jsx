import useFields from './useFields';

describe('useFields', () => {
  it('should return flattened keys', () => {
    expect(
      useFields({
        parent: {
          children: [
            {
              subchildren: ['foo', 'bar'],
            },
          ],
        },
        other: true,
      }),
    ).toEqual(
      ['parent.children.subchildren', 'other'].map(
        (value) => ({
          label: value,
          value,
        }),
      ),
    );
  });
});
