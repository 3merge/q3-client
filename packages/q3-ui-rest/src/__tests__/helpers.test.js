import {
  getFn,
  isEmpty,
  acceptCsvFiletype,
  formatUrlPath,
} from '../helpers';

jest.mock('js-file-download');

jest.mock('axios', () => ({
  get: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        values: ['Foo', 'Bar'],
      },
    })
    .mockResolvedValue({
      data: {
        values: [
          { id: '1', name: 'Foo' },
          { id: '2', name: 'Bar' },
        ],
      },
    }),
}));

describe('q3-ui-rest helpers', () => {
  describe('getFn', () => {
    it('should throw an error on unknown function', () =>
      expect(() =>
        getFn({ bar: jest.fn() }, 'foo'),
      ).toThrowError());

    it('should call method', () => {
      const foo = jest.fn();
      getFn({ foo }, 'foo');
      expect(foo).toHaveBeenCalled();
    });
  });

  describe('isEmpty', () => {
    it('should return truthy', () =>
      expect(isEmpty({})).toBeTruthy());

    it('should return falsy', () =>
      expect(isEmpty({ foo: 'bar' })).toBeFalsy());
  });

  describe('acceptCsvFiletype', () => {
    it('should assign "accept" header', () => {
      const headers = {};
      acceptCsvFiletype({})({}, headers);
      expect(headers.Accept).toMatch('text/csv');
    });
  });

  describe('"formatUrlPath"', () => {
    it('should do nothing', () => {
      const str = formatUrlPath('localhost', '');
      expect(str).toMatch('localhost');
    });

    it('should append query string', () => {
      const str = formatUrlPath('localhost', 'foo=bar');
      expect(str).toMatch('localhost?foo=bar');
    });

    it('should add query string to existing query', () => {
      const str = formatUrlPath(
        'localhost?foo=bar',
        'quuz=garply',
      );
      expect(str).toMatch('localhost?foo=bar&quuz=garply');
    });

    it('should add query string to existing query', () => {
      const str = formatUrlPath(
        'localhost?foo=bar',
        'quuz=garply&thunk',
        '1,2,3',
      );

      expect(str).toMatch(
        'localhost?foo=bar&quuz=garply&thunk&fields=1,2,3',
      );
    });

    it('should add projection without  query', () => {
      const str = formatUrlPath('localhost', '', '1,2,3');
      expect(str).toMatch('localhost?fields=1,2,3');
    });
  });
});
