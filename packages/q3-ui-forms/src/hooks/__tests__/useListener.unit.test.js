import React from 'react';
import useListener, {
  selectFromObject,
} from '../useListener';

let useEffect;
let useState;

beforeEach(() => {
  useState = jest.fn();

  useEffect = jest
    .spyOn(React, 'useContext')
    .mockReturnValue({
      values: {},
    });

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
    useListener({ listen: 'foo', name: 'bar' });
    expect(useEffect).toHaveBeenCalledWith(
      expect.any(Function),
      [JSON.stringify({}), '', 'foo'],
    );

    expect(useState).toHaveBeenCalledWith(
      JSON.stringify({}),
    );
  });
});
