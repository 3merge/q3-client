import { FormikDecorator } from '../decorator';

jest.unmock('formik');
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => v.split(':')[1]),
  }),
}));

describe('FormikDecorator', () => {
  describe('constructor', () => {
    it('should throw an error', () =>
      expect(
        () => new FormikDecorator('foo'),
      ).toThrowError());

    it('should assign empty value', () =>
      expect(
        new FormikDecorator('foo', {
          values: { foo: null },
          setFieldValue: jest.fn(),
        }).value,
      ).toMatch(''));

    it('should override disabled', () =>
      expect(
        new FormikDecorator('foo', {
          values: { foo: null },
          setFieldValue: jest.fn(),
          isSubmitting: true,
        }).disabled,
      ).toBeTruthy());
  });

  describe('helper', () => {
    const propper = (v, err) => {
      const inst = new FormikDecorator('foo', {
        values: { foo: null },
        errors: { foo: err },
        setFieldValue: jest.fn(),
      });

      inst.helper = v;
      return inst.helperText;
    };

    it('should return this error', () =>
      expect(propper('custom', 'err!')).toMatch('err!'));

    it('should skip if name matches helper', () =>
      expect(propper('foo')).toBeNull());

    it('should return the helper', () =>
      expect(propper('custom')).toMatch('custom'));
  });

  describe('onChange', () => {
    it('should call setFieldValue', () => {
      const setFieldValue = jest.fn();
      const inst = new FormikDecorator('foo', {
        values: { foo: 'old' },
        setFieldValue,
      });

      inst.onChange('new');
      expect(setFieldValue).toHaveBeenCalledWith(
        'foo',
        'new',
      );
    });
  });

  describe('onArrayPush', () => {
    it('should call setFieldValue with new array', () => {
      const setFieldValue = jest.fn();
      const inst = new FormikDecorator('foo', {
        values: { foo: 'old' },
        setFieldValue,
      });

      inst.onArrayPush('new');
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'new',
      ]);
    });

    it('should remove duplicate from array', () => {
      const setFieldValue = jest.fn();
      const inst = new FormikDecorator('foo', {
        values: { foo: ['old'] },
        setFieldValue,
      });

      inst.onArrayPush('old');
      expect(setFieldValue).toHaveBeenCalledWith('foo', []);
    });

    it('should call setFieldValue with modified array', () => {
      const setFieldValue = jest.fn();
      const inst = new FormikDecorator('foo', {
        values: { foo: ['old'] },
        setFieldValue,
      });

      inst.onArrayPush('new');
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'old',
        'new',
      ]);
    });

    it('should call setFieldValue with flattened array', () => {
      const setFieldValue = jest.fn();
      const inst = new FormikDecorator('foo', {
        values: { foo: ['old'] },
        setFieldValue,
      });

      inst.onArrayPush(['new', 'old']);
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'new',
        'old',
      ]);
    });
  });

  describe('onArrayPull', () => {
    it('should call setFieldValue with redacted array', () => {
      const setFieldValue = jest.fn();
      const inst = new FormikDecorator('foo', {
        values: { foo: ['old', 'preserve'] },
        setFieldValue,
      });

      inst.onArrayPull('old');
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'preserve',
      ]);
    });
  });
});
