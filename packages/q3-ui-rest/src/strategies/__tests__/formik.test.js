import useFormik from '../formik';

// const mapErrors = require('../formik').__get__('mapErrors');
/**
describe('mapErrors', () => {
  it('should return msg property', () => {
    expect(
      mapErrors({
        'hello.dolly': 'foo',
      }),
    ).toMatchObject({
      hello: {
        dolly: 'foo',
      },
    });
  });

  it('should return msg string', () => {
    expect(
      mapErrors({
        'foo': {
          msg: 'bar',
        },
      }),
    ).toMatchObject({
      foo: 'bar',
    });
  });
});
 */
describe('useFormik', () => {
  const { onComplete, onStart } = useFormik();
  const setSubmitting = jest.fn();
  const resetForm = jest.fn();
  const setErrors = jest.fn();

  beforeEach(() => {
    setSubmitting.mockReset();
  });

  it('should call setSubmitting property', () => {
    onStart({ setSubmitting });
    expect(setSubmitting).toHaveBeenCalledWith(true);
  });

  it('should reset the form', () => {
    onComplete(null, { setSubmitting, resetForm });
    expect(setSubmitting).toHaveBeenCalledWith(false);
    expect(resetForm).toHaveBeenCalled();
  });

  it('should process errors', () => {
    const actions = { setSubmitting, setErrors };
    onComplete({ errors: { 'foo.bar.a': 'b' } }, actions);
    expect(actions).toHaveProperty('isTouched');
    expect(setSubmitting).toHaveBeenCalledWith(false);
    expect(setErrors).toHaveBeenCalledWith({
      foo: {
        bar: {
          a: 'b',
        },
      },
    });
  });

  it('should do nothing without an action object', () => {
    expect(onStart()).toBeUndefined();
    expect(onComplete()).toBeUndefined();
  });
});
