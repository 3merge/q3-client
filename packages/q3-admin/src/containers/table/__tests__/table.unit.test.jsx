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

    it('should include TableLink and TableDelete by default', () => {
      const [a, b] = TableDecorator({})
        .build()
        .renderCustomRowActions({
          id: '1',
        });

      expect(a.type.name).toMatch('TableLink');
      expect(b.type.name).toMatch('TableTrash');
    });

    it('should exclude TableDelete', () => {
      const el = TableDecorator({
        includeTrash: false,
      })
        .build()
        .renderCustomRowActions({
          id: '1',
        });

      expect(el).toHaveLength(1);
      expect(el[0].type.name).toMatch('TableLink');
    });

    it('should combine row actions', () => {
      const el = TableDecorator({
        includeLink: false,
        includeTrash: false,

        renderCustomRowActions: (props) => {
          expect(props).toMatchObject({
            id: '1',
          });

          return 'CUSTOM';
        },
      })
        .build()
        .renderCustomRowActions({
          id: '1',
        });

      expect(el).toHaveLength(1);
      expect(el[0].props.children).toMatch('CUSTOM');
    });
  });
});
