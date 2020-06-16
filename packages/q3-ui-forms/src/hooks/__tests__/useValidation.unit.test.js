import React from 'react';
import useValidation, {
  assignNewValidationKey,
  convertIntoIndexNumber,
} from '../useValidation';
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

  describe('"convertIntoIndexNumber"', () => {
    it('should remove braces from the index number ', () => {
      expect(convertIntoIndexNumber('.2.')).toBe(2);
    });

    it('should return null otherwise', () => {
      expect(convertIntoIndexNumber('.noop.')).toBeNull();
    });

    it('should return null without a value', () => {
      expect(convertIntoIndexNumber(undefined)).toBeNull();
    });
  });

  describe('"assignNewValidationKey"', () => {
    it('should split nested arrays', () => {
      const state = {};
      Object.assign(
        state,
        assignNewValidationKey('foo.0.bar', {
          type: 'text',
          required: true,
        })(state),
      );

      Object.assign(
        state,
        assignNewValidationKey('foo.1.bar', {
          type: 'text',
          required: true,
        })(state),
      );

      expect(state).toHaveProperty('foo');
      expect(state.foo).toHaveLength(2);
    });
  });
});
