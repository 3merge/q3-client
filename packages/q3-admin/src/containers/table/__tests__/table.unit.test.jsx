import { TableDecorator } from '..';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    Redirect: ({ children }) => children,
  }),
}));

describe('Table', () => {
  describe('"TableDecorator"', () => {
    it('should filter values from the first parameter', () => {
      const value = 'bar';
      const filterer = jest
        .fn()
        .mockImplementation((v) => v === value);
      const out = TableDecorator({
        allColumns: ['foo', value, 'quux'],
        defaultColumns: ['garply'],
      }).makeBlacklist(filterer);

      expect(out).toHaveLength(3);
      expect(out).not.toContain(value);
    });

    it('should assign URL prop', () => {
      const out = TableDecorator({
        data: [{ id: 1 }],
      }).makeLinks('foo');

      expect(out[0]).toHaveProperty('url');
    });
  });
});
