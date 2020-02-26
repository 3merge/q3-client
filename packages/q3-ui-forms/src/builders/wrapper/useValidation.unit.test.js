import React from 'react';
import useValidation from './useValidation';
import { Validator } from '../../helpers/validation';

const setState = jest.fn().mockImplementation((fn) => {
  fn({ foo: 1 });
});

jest.mock('../../helpers/validation', () => ({
  Validator: jest.fn().mockImplementation(() => {
    return {
      build: jest.fn(),
    };
  }),
}));

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, setState]);

jest
  .spyOn(React, 'useCallback')
  .mockImplementation((fn) => fn);

describe('useValidation', () => {
  it('should call setState and Validator on init', () => {
    const stub = { foo: 1 };
    const res = useValidation();

    res.setField('name', stub);
    expect(setState).toHaveBeenCalled();
    expect(Validator).toHaveBeenCalledWith(stub);
  });
});
