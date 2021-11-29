import BuilderStateDecorator from '../BuilderStateDecorator';

jest.mock('q3-ui-locale', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => v.split(':')[1]),
  }),
}));

const getContext = (args) => ({
  values: { foo: null },
  onChange: jest.fn().mockReturnValue({
    then: (fn) => fn(),
    catch: (fn) => fn(),
  }),
  ...args,
});

describe('BuilderStateDecorator', () => {
  describe('constructor', () => {
    it('should throw an error', () =>
      expect(
        () => new BuilderStateDecorator('foo'),
      ).toThrowError());

    it('should override disabled', () =>
      expect(
        new BuilderStateDecorator(
          'foo',
          getContext({
            isSubmitting: true,
          }),
        ).disabled,
      ).toBeTruthy());
  });

  describe('helper', () => {
    const propper = (v, error) => {
      const inst = new BuilderStateDecorator(
        'foo',
        getContext({
          error,
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
    it('should call onChange', (done) => {
      const bag = getContext({
        value: 'old',
      });

      const inst = new BuilderStateDecorator('foo', bag);
      inst.next('new').then(() => {
        expect(bag.onChange).toHaveBeenCalledWith(
          'foo',
          'new',
        );
        done();
      });
    });
  });

  describe('onArrayPush', () => {
    it('should call onChange with new array', () => {
      const bag = getContext({
        value: 'old',
      });

      const inst = new BuilderStateDecorator('foo', bag);

      inst.onArrayPush('new');
      expect(bag.onChange).toHaveBeenCalledWith('foo', [
        'old',
        'new',
      ]);
    });

    it('should remove duplicate from array', () => {
      const bag = getContext({
        value: ['old'],
      });

      const { onChange } = bag;
      const inst = new BuilderStateDecorator('foo', bag);

      inst.onArrayPush('old');
      expect(onChange).toHaveBeenCalledWith('foo', []);
    });

    it('should call onChange with modified array', () => {
      const bag = getContext({
        value: ['old'],
      });

      const { onChange } = bag;
      const inst = new BuilderStateDecorator('foo', bag);

      inst.onArrayPush('new');
      expect(onChange).toHaveBeenCalledWith('foo', [
        'old',
        'new',
      ]);
    });

    it('should call onChange with flattened array', () => {
      const bag = getContext({
        value: ['old'],
      });

      const { onChange } = bag;
      const inst = new BuilderStateDecorator('foo', bag);

      inst.onArrayPush(['new', 'old']);
      expect(onChange).toHaveBeenCalledWith('foo', [
        'old',
        'new',
      ]);
    });
  });

  describe('onArrayPull', () => {
    it('should call onChange with redacted array', () => {
      const bag = getContext({
        value: ['old', 'preserve'],
      });

      const { onChange } = bag;
      const inst = new BuilderStateDecorator('foo', bag);

      inst.onArrayPull('old');
      expect(onChange).toHaveBeenCalledWith('foo', [
        'preserve',
      ]);
    });
  });
});
