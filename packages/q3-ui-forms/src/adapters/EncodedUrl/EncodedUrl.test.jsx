import {
  serialize,
  deserialize,
  handleStateEncoding,
  handleStateDecoding,
} from './EncodedUrl';

describe('EncodedUrl adapter', () => {
  describe('serialize', () => {
    it('should convert greater than and less than operators', () => {
      const s = serialize({
        'createdAt%3E': '2020-04-01',
        'createdAt%3C': '2020-04-6',
        'tags%21': ['a', 'b', 'c'],
      });

      expect(s).toEqual(
        'createdAt>=2020-04-01&createdAt<=2020-04-6&tags!=a,b,c',
      );
    });

    it('should convert weak booleans ($exists)', () => {
      const s = serialize({
        'status*': true,
        '%21payment*': true,
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

      expect(s).toEqual('repeatBuyer=null');
    });
  });

  describe('deserialize', () => {
    it('should remove first character', () => {
      expect(
        deserialize('?status=Done&price>=123'),
      ).toMatchObject({
        status: 'Done',
        'price%3E': '123',
      });
    });

    it('should convert length', () => {
      expect(
        deserialize(
          'items.0&total<=100&payment=Visa,Mastercard',
        ),
      ).toMatchObject({
        'items%2Elength': true,
        'total%3C': '100',
        payment: ['Visa', 'Mastercard'],
      });
    });
  });

  describe('handleStateEncoding', () => {
    it('should call done function', () => {
      const done = jest.fn();
      const actions = { setSubmitting: jest.fn() };
      handleStateEncoding(done)({ foo: 1 }, actions);
      expect(done).toHaveBeenCalledWith('?foo=1');
      expect(actions.setSubmitting).toHaveBeenCalledWith(
        false,
      );
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
});
