import {
  extractValue,
  serialize,
  deserialize,
  handleStateEncoding,
  handleStateDecoding,
} from './EncodedUrl';

beforeAll(() => {
  localStorage.getItem.mockReturnValue('America/Toronto');
});

describe('EncodedUrl adapter', () => {
  describe('serialize', () => {
    it('should convert greater than and less than operators', () => {
      const s = serialize({
        'createdAt>': '2020-04-01',
        'createdAt<': '2020-04-6',
        'tags!': ['a', 'b', 'c'],
      });

      expect(s).toEqual(
        'createdAt%3E=2020-04-01T04:00:00.000Z&createdAt%3C=2020-04-6&tags!=a%2Cb%2Cc',
      );
    });

    it('should convert weak booleans ($exists)', () => {
      const s = serialize({
        'status*': true,
        '!payment*': true,
        'verified*': '',
      });

      expect(s).toEqual('status&!payment');
    });

    it('should convert strong booleans', () => {
      const s = serialize({
        'status': true,
        'payment': false,
      });

      expect(s).toEqual('status=true&payment=false');
    });

    it('should drop undefined and empty values', () => {
      const s = serialize({
        'status': undefined,
        'repeatBuyer': null,
        'payment': '',
      });

      expect(s).toHaveLength(0);
    });
  });

  describe('deserialize', () => {
    it('should remove first character', () => {
      expect(
        deserialize('?status=Done&price%3E=123'),
      ).toMatchObject({
        status: 'Done',
        'price>': '123',
      });
    });
  });

  describe('handleStateEncoding', () => {
    it('should call done function', () => {
      const done = jest.fn();
      handleStateEncoding(done)({ foo: 1 });
      expect(done).toHaveBeenCalledWith('?foo=1');
    });
  });

  describe('handleStateDecoding', () => {
    it('should merge objects', () => {
      expect(
        handleStateDecoding('?foo=1', {
          bar: 2,
        }),
      ).toMatchObject({
        foo: '1',
        bar: 2,
      });
    });
  });

  describe('"extractValue"', () => {
    it('should return as String', () =>
      expect(extractValue(1)).toEqual(expect.any(String)));

    it('should serialize with commas', () =>
      expect(
        extractValue([
          { value: 'A' },
          { value: 'B' },
          { value: 'C' },
        ]),
      ).toEqual('A%2CB%2CC'));
  });
});
