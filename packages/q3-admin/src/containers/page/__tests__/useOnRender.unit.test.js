import React from 'react';
import useOnRender from '../useOnRender';

let effect;
let state;

beforeEach(() => {
  effect = jest
    .spyOn(React, 'useEffect')
    .mockImplementation((v) => v());

  state = jest
    .spyOn(React, 'useState')
    .mockImplementation((v) => [v, jest.fn()]);
});

describe('useOnRender', () => {
  it('should return truthy', () => {
    state.mockReturnValue([true]);
    expect(useOnRender({}, {})).toBeTruthy();
    expect(state).toHaveBeenCalledWith(true);
  });

  it('should return falsy', () => {
    state.mockReturnValue([false]);
    expect(
      useOnRender({ onInit: jest.fn() }, {}),
    ).toBeFalsy();
    expect(state).toHaveBeenCalledWith(false);
  });

  it('should call onInit', () => {
    const onInit = jest.fn();
    useOnRender({ onInit }, { fetching: true });
    expect(onInit).toHaveBeenCalled();
  });

  it('should call onEnter', () => {
    const onEnter = jest.fn();
    useOnRender({ onEnter }, { fetching: false });
    expect(onEnter).toHaveBeenCalled();
  });

  it('should call onExit', () => {
    state.mockReturnValue([true]);
    effect.mockImplementation((v) => {
      const fn = v();
      fn();
    });

    const onExit = jest.fn();
    useOnRender({ onExit }, { fetching: false });
    expect(onExit).toHaveBeenCalled();
  });
});
