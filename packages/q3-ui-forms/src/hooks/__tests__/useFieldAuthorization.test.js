import React from 'react';
import useFieldAuthorization from '../useFieldAuthorization';

let spy;

beforeAll(() => {
  spy = jest.spyOn(React, 'useContext');
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('useFieldAuthorization', () => {
  it('should detect base permissions', () => {
    const setFieldValue = jest.fn();

    spy.mockReturnValue({
      setFieldValue,
      canSee: jest.fn().mockReturnValue(true),
      canEdit: jest.fn().mockReturnValue(false),
      isDynamic: jest.fn(),
      initialValues: {},
      values: {},
    });

    expect(
      useFieldAuthorization({
        name: 'foo',
        disabled: false,
      }),
    ).toMatchObject({
      readOnly: true,
      visible: true,
    });

    expect(setFieldValue).not.toHaveBeenCalled();
  });

  it('should revert value', () => {
    const setFieldValue = jest.fn();
    spy.mockReturnValue({
      setFieldValue,
      canSee: jest.fn().mockReturnValue(true),
      canEdit: jest.fn().mockReturnValue(false),
      isDynamic: jest.fn().mockReturnValue(true),
      initialValues: {
        foo: 1,
      },
      values: {
        foo: 2,
      },
    });

    useFieldAuthorization({
      name: 'foo',
    });

    expect(setFieldValue).toHaveBeenCalledWith('foo', 1);
  });

  it('should assemble path', () => {
    const isDynamic = jest.fn().mockReturnValue(true);

    spy.mockReturnValue({
      canSee: jest.fn().mockReturnValue(true),
      canEdit: jest.fn().mockReturnValue(false),
      isDynamic,
      initialValues: {},
      values: {},
    });

    useFieldAuthorization({
      name: 'bar',
      under: 'foo',
    });

    expect(isDynamic).toHaveBeenCalledWith('foo.bar');
  });
});
