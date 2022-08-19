import usePages from './usePages';

describe('usePages', () => {
  it('should filter empty page entries', () => {
    expect(
      usePages([
        {
          label: 'foo',
          pages: [
            {
              label: 'quuz',
              href: 'quuz',
            },
            {
              label: 'thunk',
            },
          ],
        },
        {
          label: 'bar',
        },
      ]).pages,
    ).toEqual([
      {
        label: 'foo',
        pages: [
          {
            label: 'quuz',
            href: 'quuz',
          },
        ],
      },
    ]);
  });

  it('should return active item', () => {
    expect(
      usePages([
        { label: 'foo', href: 1 },
        { label: 'bar', href: 1, active: true },
        { label: 'quuz', href: 1 },
      ]).initialSelectedParent,
    ).toMatchObject({
      label: 'bar',
    });
  });

  it('should return first item', () => {
    expect(
      usePages([
        { label: 'foo', href: 1 },
        { label: 'bar', href: 1 },
        { label: 'quuz', href: 1 },
      ]).initialSelectedParent,
    ).toMatchObject({
      label: 'foo',
    });
  });
});
