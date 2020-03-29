import { interpretCardsProps } from './Item';

describe('Item', () => {
  describe('"interpretCardsProps"', () => {
    it('should return extract from the first param', () => {
      const out = interpretCardsProps(
        {
          attributes: [1, 2],
          onColor: ({ color }) => color,
          describe: () => 'Foo',
          disableEditor: true,
          disableRemove: false,
        },
        { color: 'Green' },
        { disableMultiselect: true },
      );

      expect(out).toMatchObject({
        attributes: [1, 2],
        color: 'Green',
        description: 'Foo',
        showEditor: false,
        showMultiselect: false,
        showRemove: true,
      });
    });

    it('should merge name with editable property', () => {
      const out = interpretCardsProps(
        { editable: { foo: { type: 'text' } } },
        {},
        {},
      ).isIn('foo');

      expect(out).toMatchObject({
        type: 'text',
        name: 'foo',
      });
    });
  });
});
