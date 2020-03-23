import 'jest-localstorage-mock';
import React from 'react';
import { useFormikContext } from 'formik';
import Persist from '.';

jest
  .spyOn(React, 'useEffect')
  .mockImplementation((v) => v());

jest.mock('formik', () => ({
  useFormikContext: jest.fn(),
}));

describe('Persist', () => {
  it('should remove from sessionStorage API', () => {
    useFormikContext.mockReturnValue({
      isSubmitting: true,
      isValidating: false,
    });

    global.shallow(<Persist id="foo" />);
    expect(sessionStorage.removeItem).toHaveBeenCalled();
  });

  it('should set formik values', () => {
    const setValues = jest.fn();
    sessionStorage.getItem.mockReturnValue(
      JSON.stringify({ foo: 'bar' }),
    );

    useFormikContext.mockReturnValue({
      status: 'Initializing',
      setValues,
    });

    global.shallow(<Persist id="foo" />);
    expect(setValues).toHaveBeenCalled();
  });

  it('should add to sessionStorage API', () => {
    const stub = { foo: 'bar' };

    sessionStorage.getItem.mockReturnValue(null);

    useFormikContext.mockReturnValue({
      values: stub,
      status: 'Ready',
      dirty: true,
    });

    global.shallow(<Persist id="foo" />);
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(stub),
    );
  });
});
