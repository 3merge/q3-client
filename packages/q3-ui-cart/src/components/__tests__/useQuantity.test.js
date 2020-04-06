import React from 'react';
import useQuantity, {
  addBy,
  reduceBy,
} from '../useQuantity';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn(),
  }),
}));

let setState;

beforeEach(() => {
  setState = jest.fn();

  jest
    .spyOn(React, 'useState')
    .mockImplementation((v) => [v, setState]);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest
    .spyOn(React, 'useCallback')
    .mockImplementation((fn) => {
      return jest.fn().mockImplementation((args) => {
        fn(args);
      });
    });
});

describe('useQuantity', () => {
  it('should set quantity to 1 on reset', () => {
    useQuantity().reset({
      target: { value: null },
    });

    expect(setState).toHaveBeenCalledWith(1);
  });

  it('should set quantity to 1 on reset', () => {
    useQuantity().reset({
      target: { value: 4 },
    });

    expect(setState).not.toHaveBeenCalledWith();
  });

  it('should set quantity to value', () => {
    useQuantity().handleQuantity({
      target: {
        value: '123',
      },
    });

    expect(setState).toHaveBeenCalledWith(123);
    expect(setState).toHaveBeenCalledWith(false);
  });

  it('should set quantity to value', () => {
    useQuantity().handleQuantity({
      target: {
        value: 0,
      },
    });

    expect(setState).toHaveBeenCalledWith('');
    expect(setState).toHaveBeenCalledWith(false);
  });

  it('should set an error for values below 0', () => {
    useQuantity().handleQuantity({
      target: {
        value: -4,
      },
    });

    expect(setState).toHaveBeenCalledWith(-4);
    expect(setState).toHaveBeenCalledWith(true);
  });

  describe('"reduceBy"', () => {
    it('should decrease by 1', () => {
      expect(reduceBy(4)).toBe(3);
    });

    it('should clamp at 0', () => {
      expect(reduceBy(0)).toBe(0);
    });
  });

  describe('"addBy"', () => {
    it('should increase by 1', () => {
      expect(addBy(4)).toBe(5);
    });
  });
});
