import {
  marshalFormFieldsIntoUrlString,
  extractTextualValue,
  queryParam,
  handleOnChange,
  handleOnChangeBoolean,
  appendEmptyValues,
} from '../utils';

const getValue = (operand) => ({
  operand,
  value: 1,
});

const getPropName = (name, type) => ({
  props: { name, type },
});

describe('Filter utils', () => {
  describe('"marshalFormFieldsIntoUrlString"', () => {
    it('', () => {
      const add = jest.fn();
      const remove = jest.fn();
      const out = marshalFormFieldsIntoUrlString(
        {
          foo: getValue('='),
          bar: getValue('>='),
          'quuz.0': getValue('!*'),
        },
        {
          add,
          remove,
        },
      );

      expect(out).toMatchObject({
        foo: 1,
        'bar>': 1,
        'quuz%2E0': '!*',
      });
    });
  });

  describe('"queryParam"', () => {
    it('should return key/value pair', () => {
      const r = queryParam('foo', '=', 1);
      expect(r).toEqual(['foo', 1]);
    });

    it('should suffice key with greater than', () => {
      const r = queryParam('foo', '>=', 1);
      expect(r).toEqual(['foo>', 1]);
    });

    it('should suffice key with lesser than', () => {
      const r = queryParam('foo', '<=', 1);
      expect(r).toEqual(['foo<', 1]);
    });

    it('should convert into negative wildcard', () => {
      const r = queryParam('foo', '!*', 1);
      expect(r).toEqual(['foo', '!*']);
    });

    it('should cast to null', () => {
      const r = queryParam('foo', '!*', 0);
      expect(r).toEqual(['foo', null]);
    });

    it('should convert into serialized array', () => {
      const r = queryParam('foo', '[]', [1, 2, 3, 4]);
      expect(r).toEqual(['foo', '1,2,3,4']);
    });

    it('should convert into netgative serialized array', () => {
      const r = queryParam('foo', '![]', [1, 2, 3, 4]);
      expect(r).toEqual(['foo!', '1,2,3,4']);
    });
  });

  describe('"extractTextualValue"', () => {
    it('should get value', () => {
      expect(extractTextualValue({ value: 1 })).toBe(1);
    });

    it('should return with default value', () => {
      expect(extractTextualValue({}, 1)).toBe(1);
    });
  });

  describe('"handleOnChange"', () => {
    it('should call setFieldValue cb', () => {
      const fn = jest.fn();
      const cb = jest.fn();
      handleOnChange(fn, '!', cb)({ target: { value: 2 } });
      expect(fn).toHaveBeenCalledWith({
        value: 2,
        operand: '!',
      });
      expect(cb).toHaveBeenCalled();
    });

    it('should call setFieldValue with second parameter', () => {
      const fn = jest.fn();
      handleOnChangeBoolean(fn, '!')(
        { target: { value: 2 } },
        true,
      );
      expect(fn).toHaveBeenCalledWith({
        value: true,
        operand: '!',
      });
    });
  });

  describe("'appendEmptyValues'", () => {
    it.only('should match against existing values', () => {
      const matched = appendEmptyValues(
        [
          getPropName('foo'),
          getPropName('bar'),
          getPropName('quuz'),
        ],
        {
          foo: 1,
          'bar<': 1,
          '!quuz': 1,
        },
      );

      expect(matched).toMatchObject({
        foo: { value: 1 },
        bar: { value: 1 },
        quuz: { value: 1 },
      });
    });

    it('should populate with empty values', () => {
      const matched = appendEmptyValues([
        getPropName('foo'),
        getPropName('bar', 'select'),
      ]);

      expect(matched).toMatchObject({
        foo: { value: '' },
        bar: { value: [] },
      });
    });
  });
});
