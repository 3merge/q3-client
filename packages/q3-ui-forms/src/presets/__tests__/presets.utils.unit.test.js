import axios from 'axios';
import { handleSubmitWrapper } from '../utils';

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

describe('"handleSubmitWrapper"', () => {
  it('should handle success', () => {
    handleSubmitWrapper('/foo', { onSuccessStatus: 'yup' })(
      {},
    );

    expect(axios.post).toHaveBeenCalled();
    //  expect(onStart).toHaveBeenCalledWith(actions);
    // expect(onComplete).toHaveBeenCalledWith(null, actions);
    //   expect(actions.setStatus).toHaveBeenCalledWith(
    //   'Success:yup',
    // );
  });

  it('should handle custom callback', () => {
    const onDone = jest.fn();

    handleSubmitWrapper('/foo', {
      onSuccessStatus: 'noop',
      onDone,
    })({});

    expect(axios.post).toHaveBeenCalled();
    expect(onDone).toHaveBeenCalled();
  });
});
