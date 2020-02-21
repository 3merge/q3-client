import React from 'react';
import { useFormikContext } from 'formik';
import Validate from '.';
import BuilderState from '../builderState';

const useState = jest.fn();

jest.mock('formik', () => ({
  useFormikContext: jest.fn(),
}));

jest
  .spyOn(React, 'useState')
  .mockReturnValue([null, useState]);

jest.spyOn(React, 'useEffect').mockImplementation((fn) => {
  fn();
});

describe('Validate', () => {
  it('should run validation on ready status', (done) => {
    const setStatus = jest.fn();
    const validateForm = jest.fn().mockReturnValue({
      then: jest.fn().mockImplementation((fn) => {
        fn();
        expect(useState).toHaveBeenCalledWith(true);
        expect(setStatus).toHaveBeenCalledWith('Validated');
        done();
      }),
    });

    useFormikContext.mockReturnValue({
      status: 'Ready',
      validateForm,
      setStatus,
    });

    global.shallow(<Validate />);
  });

  it('should not run validation if builder state is falsy', () => {
    const setStatus = jest.fn();

    useFormikContext.mockReturnValue({
      status: 'Ready',
      setStatus,
    });

    global.mount(
      <BuilderState.Provider
        value={{ validation: { run: false } }}
      >
        <Validate />
      </BuilderState.Provider>,
    );

    expect(setStatus).not.toHaveBeenCalled();
  });
});
