import axios from 'axios';
import { handleSubmitWrapper } from '../utils';
import configFormHandler from '../../providers/formik';

jest.mock('axios', () => ({
  post: jest.fn().mockImplementation(() => {
    const out = {};
    out.then = jest.fn().mockImplementation((fn) => {
      fn({ data: {} });
      return out;
    });
    out.catch = jest.fn().mockImplementation(() => {
      return out;
    });

    return out;
  }),
}));

jest.mock('../../providers/formik', () => {
  const onStart = jest.fn();
  const onComplete = jest.fn();
  const fn = jest.fn().mockReturnValue({
    onStart,
    onComplete,
  });

  fn.onStart = onStart;
  fn.onComplete = onComplete;
  return fn;
});

const { onStart, onComplete } = configFormHandler('formik');

describe('"handleSubmitWrapper"', () => {
  it('should handle success', () => {
    const actions = {
      setStatus: jest.fn(),
    };

    handleSubmitWrapper('/foo', { onSuccessStatus: 'yup' })(
      {},
      actions,
    );

    expect(axios.post).toHaveBeenCalled();
    expect(onStart).toHaveBeenCalledWith(actions);
    expect(onComplete).toHaveBeenCalledWith(null, actions);
    expect(actions.setStatus).toHaveBeenCalledWith(
      'Success:yup',
    );
  });

  it('should handle custom callback', () => {
    const onDone = jest.fn();
    const actions = {
      setStatus: jest.fn(),
    };

    handleSubmitWrapper('/foo', {
      onSuccessStatus: 'noop',
      onDone,
    })({}, actions);

    expect(axios.post).toHaveBeenCalled();
    expect(onStart).toHaveBeenCalledWith(actions);
    expect(onComplete).toHaveBeenCalledWith(null, actions);
    expect(actions.setStatus).not.toHaveBeenCalled();
    expect(onDone).toHaveBeenCalled();
  });
});
