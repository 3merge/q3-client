import {
  getOptions,
  getFn,
  isEmpty,
  makePath,
  acceptCsvFiletype,
} from '../helpers';

jest.mock('js-file-download');

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
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

  describe('makePath', () => {
    it('should return nested url', () =>
      expect(makePath(['foo', 'bar/'])).toMatch(
        '/foo/bar',
      ));

    it('should strip leading slashes', () =>
      expect(makePath(['/foo', '/bar'])).toMatch(
        '/foo/bar',
      ));

    it('should preserve internal slashes', () =>
      expect(makePath(['/foo/bar', '/quux'])).toMatch(
        '/foo/bar/quux',
      ));
  });

  describe('getOptions', () => {
    it('should add label and value properties', () =>
      expect(
        getOptions('/', 'values', 'name'),
      ).resolves.toEqual([
        { label: 'Foo', value: '1', id: '1', name: 'Foo' },
        { label: 'Bar', value: '2', id: '2', name: 'Bar' },
      ]));

    it('should return just the property', () =>
      expect(
        getOptions('/', 'values', 'name', true),
      ).resolves.toEqual(['Foo', 'Bar']));
  });

  describe('acceptCsvFiletype', () => {
    it('should assign "accept" header', () => {
      const headers = {};
      acceptCsvFiletype({})({}, headers);
      expect(headers.Accept).toMatch('text/csv');
    });
  });
});
