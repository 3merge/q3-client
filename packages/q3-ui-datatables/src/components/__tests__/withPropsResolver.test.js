import React from 'react';
import { t } from 'react-i18next';
import { string } from 'q3-ui-helpers';
import withPropsResolver from '../withPropsResolver';

jest.mock('react-i18next', () => {
  const trans = jest.fn();
  return {
    t: trans,
    useTranslation: jest.fn().mockReturnValue({
      t: trans,
    }),
  };
});

jest.mock('q3-ui-helpers', () => ({
  string: {
    toDate: jest.fn(),
    toPrice: jest.fn(),
    toTruthy: jest.fn(),
  },
}));

const El = () => React.createElement('div');
const stub = 'Foo';

describe('withPropsResolver', () => {
  it('should run toDate', () => {
    withPropsResolver(El, {
      toDate: true,
      resolve: jest.fn(),
    })(stub);

    expect(string.toDate).toHaveBeenCalledWith(stub);
  });

  it('should run toPrice', () => {
    withPropsResolver(El, {
      toPrice: true,
      resolve: jest.fn(),
    })(stub);

    expect(string.toPrice).toHaveBeenCalledWith(stub);
  });

  it('should run toTruthy', () => {
    withPropsResolver(El, {
      toTruthy: true,
      resolve: jest.fn(),
    })(stub);

    expect(string.toTruthy).toHaveBeenCalledWith(
      stub,
      expect.any(Function),
    );
  });

  it('should run t', () => {
    withPropsResolver(El, {
      trans: true,
      resolve: jest.fn(),
    })(stub);

    expect(t).toHaveBeenCalledWith(stub);
  });
});
