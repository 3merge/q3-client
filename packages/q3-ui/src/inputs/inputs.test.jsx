import useFormik, { FormikPropsBuilder } from './useFormik';

jest.unmock('formik');
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => v.split(':')[1]),
  }),
}));

describe('useFormik', () => {
  describe('hook', () => {
    it('should return all formik props', () => {
      const resp = useFormik({
        name: 'textField',
        disabled: true,
        formik: {
          values: {
            textField: 'init',
          },
          errors: {},
          setFieldValue: jest.fn(),
        },
      });

      expect(resp).toMatchObject({
        value: 'init',
        disabled: true,
        name: 'textField',
        onChange: expect.any(Function),
        onArrayPull: expect.any(Function),
        onArrayPush: expect.any(Function),
        helperText: null,
      });
    });

    it('should override disabled', () => {
      const authFn = jest.fn().mockReturnValue({
        disabled: true,
        readOnly: true,
      });

      const resp = useFormik({
        name: 'textField',
        disabled: false,
        formik: {
          values: {
            textField: 'init',
          },
          errors: {},
          setFieldValue: jest.fn(),
        },
        isNew: true,
        authFn,
      });

      expect(authFn).toHaveBeenCalledWith({
        op: 'Create',
        name: 'textField',
      });

      expect(resp).toMatchObject({
        disabled: true,
        readOnly: true,
      });
    });
  });

  describe('FormikPropsBuilder', () => {
    describe('constructor', () => {
      it('should throw an error', () =>
        expect(
          () => new FormikPropsBuilder('foo'),
        ).toThrowError());

      it('should assign empty value', () =>
        expect(
          new FormikPropsBuilder('foo', {
            values: { foo: null },
            setFieldValue: jest.fn(),
          }).value,
        ).toMatch(''));

      it('should override disabled', () =>
        expect(
          new FormikPropsBuilder('foo', {
            values: { foo: null },
            setFieldValue: jest.fn(),
            isSubmitting: true,
          }).disabled,
        ).toBeTruthy());
    });

    describe('helper', () => {
      const propper = (v, err) => {
        const inst = new FormikPropsBuilder('foo', {
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
        const inst = new FormikPropsBuilder('foo', {
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
        const inst = new FormikPropsBuilder('foo', {
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
        const inst = new FormikPropsBuilder('foo', {
          values: { foo: ['old'] },
          setFieldValue,
        });

        inst.onArrayPush('old');
        expect(setFieldValue).toHaveBeenCalledWith(
          'foo',
          [],
        );
      });

      it('should call setFieldValue with modified array', () => {
        const setFieldValue = jest.fn();
        const inst = new FormikPropsBuilder('foo', {
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
        const inst = new FormikPropsBuilder('foo', {
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
        const inst = new FormikPropsBuilder('foo', {
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
});
