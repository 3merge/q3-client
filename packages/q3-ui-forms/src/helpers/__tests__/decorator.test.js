import { FormikDecorator } from '../useDecorator';

jest.unmock('formik');
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => v.split(':')[1]),
  }),
}));

const getFormikBag = (args) => ({
  values: { foo: null },
  setFieldValue: jest.fn().mockReturnValue({
    then: (fn) => fn(),
    catch: (fn) => fn(),
  }),
  validateField: jest.fn().mockResolvedValue(),
  submitForm: jest.fn(),
  ...args,
});

describe('FormikDecorator', () => {
  describe('constructor', () => {
    it('should throw an error', () =>
      expect(
        () => new FormikDecorator('foo'),
      ).toThrowError());

    it('should override disabled', () =>
      expect(
        new FormikDecorator(
          'foo',
          getFormikBag({
            isSubmitting: true,
          }),
        ).disabled,
      ).toBeTruthy());
  });

  describe('helper', () => {
    const propper = (v, err) => {
      const inst = new FormikDecorator(
        'foo',
        getFormikBag({
          errors: { foo: err },
        }),
      );

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
    it('should call setFieldValue', (done) => {
      const bag = getFormikBag({
        values: { foo: 'old' },
      });

      const inst = new FormikDecorator('foo', bag);
      inst.onChange('new').then(() => {
        expect(bag.setFieldValue).toHaveBeenCalledWith(
          'foo',
          'new',
        );
        done();
      });
    });
  });

  describe('onArrayPush', () => {
    it('should call setFieldValue with new array', () => {
      const bag = getFormikBag({
        values: { foo: 'old' },
      });

      const inst = new FormikDecorator('foo', bag);

      inst.onArrayPush('new');
      expect(bag.setFieldValue).toHaveBeenCalledWith(
        'foo',
        ['new'],
      );
    });

    it('should remove duplicate from array', () => {
      const bag = getFormikBag({
        values: { foo: ['old'] },
      });

      const { setFieldValue } = bag;
      const inst = new FormikDecorator('foo', bag);

      inst.onArrayPush('old');
      expect(setFieldValue).toHaveBeenCalledWith('foo', []);
    });

    it('should call setFieldValue with modified array', () => {
      const bag = getFormikBag({
        values: { foo: ['old'] },
      });

      const { setFieldValue } = bag;
      const inst = new FormikDecorator('foo', bag);

      inst.onArrayPush('new');
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'old',
        'new',
      ]);
    });

    it('should call setFieldValue with flattened array', () => {
      const bag = getFormikBag({
        values: { foo: ['old'] },
      });

      const { setFieldValue } = bag;
      const inst = new FormikDecorator('foo', bag);

      inst.onArrayPush(['new', 'old']);
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'new',
        'old',
      ]);
    });
  });

  describe('onArrayPull', () => {
    it('should call setFieldValue with redacted array', () => {
      const bag = getFormikBag({
        values: { foo: ['old', 'preserve'] },
      });

      const { setFieldValue } = bag;
      const inst = new FormikDecorator('foo', bag);

      inst.onArrayPull('old');
      expect(setFieldValue).toHaveBeenCalledWith('foo', [
        'preserve',
      ]);
    });
  });
});
