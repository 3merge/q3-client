import {
  extractData,
  getPathOrExtractPathFromObject,
  handleResponse,
} from './getOptions';

const name = 'Joe';

describe('getForAutocomplete', () => {
  describe('"extractData"', () => {
    it('should return label-value pair by ID', () => {
      const out = extractData(
        { name, id: 1, foo: 'bar' },
        'name',
      );
      expect(out).toMatchObject({
        label: name,
        value: 1,
        foo: 'bar',
      });
    });

    it('should return label-value pair by name', () => {
      const out = extractData({ name, foo: 'bar' }, 'name');
      expect(out).toMatchObject({
        label: name,
        value: name,
      });
    });

    it('should return label-value pair by string', () => {
      const out = extractData(name, 'name');
      expect(out).toMatchObject({
        label: name,
        value: name,
      });
    });
  });

  describe('"getPathOrExtractFromObject"', () => {
    it('should return extractData fn', () => {
      const out = getPathOrExtractPathFromObject(
        false,
        'name',
      )({
        name,
      });

      expect(out).toMatchObject({
        value: name,
        label: name,
      });
    });

    it('should return path from object', () => {
      const out = getPathOrExtractPathFromObject(
        true,
        'name',
      )({
        name,
      });

      expect(out).toMatch(name);
    });
  });

  describe('"handleResponse"', () => {
    it('should map data response to label-value pairs', () => {
      const out = handleResponse(
        'orders',
        'seq',
      )({
        data: {
          orders: [
            {
              seq: 1,
            },
            {
              seq: 2,
            },
          ],
        },
      });

      expect(out).toEqual([
        {
          value: 1,
          label: 1,
          seq: 1,
        },
        {
          value: 2,
          label: 2,
          seq: 2,
        },
      ]);
    });

    it('should flatten response to array of strings', () => {
      const out = handleResponse(
        'orders',
        'seq',
        true,
      )({
        data: {
          orders: [
            {
              seq: 1,
            },
            {
              seq: 2,
            },
          ],
        },
      });

      expect(out).toEqual([1, 2]);
    });
  });
});
