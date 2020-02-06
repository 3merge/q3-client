import { marshalFormFieldsIntoUrlString } from '../utils';

const getValue = (operand) => ({
  operand,
  value: 1,
});

describe('Filter utils', () => {
  describe('"marshalFormFieldsIntoUrlString"', () => {
    it('', () => {
      const add = jest.fn();
      const remove = jest.fn();
      const out = marshalFormFieldsIntoUrlString(
        {
          foo: getValue('='),
        },
        {
          add,
          remove,
        },
      );

      expect(out).toMatchObject({
        foo: 1,
      });
    });
  });
});
