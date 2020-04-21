import React from 'react';
import useListen, { selectFromObject } from '../useListen';

jest.mock('formik', () => ({
  useFormikContext: jest.fn().mockReturnValue({
    setFieldValue: jest.fn(),
    setFieldError: jest.fn(),
    values: {
      foo: 1,
      bar: 1,
    },
  }),
}));

let useEffect;
let useState;

beforeEach(() => {
  useState = jest.fn();

  useEffect = jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest
    .spyOn(React, 'useState')
    .mockImplementation((v) => [v, useState]);
});

describe('useListen', () => {
  it('should call lodash pick method', () => {
    expect(
      selectFromObject({ foo: 1, bar: 1 }, 'foo'),
    ).toMatch(
      JSON.stringify({
        foo: 1,
      }),
    );
  });

  it('should forward props to lodash pick method', () => {
    const stub = { foo: 1, bar: 1 };
    expect(selectFromObject(stub, ['foo', 'bar'])).toMatch(
      JSON.stringify(stub),
    );
  });

  it('should call setState', () => {
    useListen({ listen: 'foo', name: 'bar' });
    expect(useEffect).toHaveBeenCalledWith(
      expect.any(Function),
      [JSON.stringify({ foo: 1 }), '', 'foo'],
    );

    expect(useState).toHaveBeenCalledWith(
      JSON.stringify({ foo: 1 }),
    );
  });
});
