import React from 'react';
import useDialog from './useDialog';

let context;
let state;

jest.mock('../utils', () => ({
  checkSsr: (fn) => fn,
}));

beforeEach(() => {
  context = jest.spyOn(React, 'useContext');
  state = jest.spyOn(React, 'useState');
});

describe('useDialog', () => {
  it('should get data attribute', () => {
    const setState = jest.fn();
    const fn = jest.fn();

    context.mockReturnValue({});
    state.mockReturnValue([null, setState]);

    useDialog().handleOpen(
      {
        target: {
          getAttribute: () =>
            JSON.stringify({
              test: 1,
            }),
        },
      },
      fn,
    );

    expect(setState).toHaveBeenCalledWith({
      test: 1,
    });

    expect(fn).toHaveBeenCalled();
  });

  it('should open dialog by setting attributes and clicking', () => {
    const setAttribute = jest.fn();
    const click = jest.fn();

    context.mockReturnValue({});
    state.mockReturnValue([]);

    jest.spyOn(document, 'getElementById').mockReturnValue({
      setAttribute,
      click,
    });

    useDialog('foo', {
      test: 1,
    }).open();

    expect(setAttribute).toHaveBeenCalledWith(
      'data-props',
      JSON.stringify({ test: 1 }),
    );

    expect(click).toHaveBeenCalled();
  });

  it('should close dialog', () => {
    const removeAttribute = jest.fn();
    const setState = jest.fn();

    context.mockReturnValue({});
    state.mockReturnValue([null, setState]);

    jest.spyOn(document, 'getElementById').mockReturnValue({
      removeAttribute,
    });

    useDialog('foo').close();

    expect(removeAttribute).toHaveBeenCalledWith(
      'data-props',
    );

    expect(setState).toHaveBeenCalledWith(null);
  });
});
