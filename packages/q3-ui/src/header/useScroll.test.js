import React from 'react';
import useScroll from './useScroll';

const setValue = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

const useState = jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, setValue]);

jest.spyOn(React, 'useEffect').mockImplementation((fn) => {
  const returnFn = fn();
  returnFn();
});

beforeAll(() => {
  delete global.window.addEventListener;
  delete global.window.removeEventListener;

  global.window = Object.create(window);
  global.window.addEventListener = addEventListener;
  global.window.removeEventListener = removeEventListener;
});

beforeEach(() => {
  addEventListener.mockReset();
  removeEventListener.mockReset();
  setValue.mockReset();
});

describe('useScroll', () => {
  it('should attach event listeners', () => {
    useScroll();
    expect(addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      expect.any(Object),
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  it('should return white background on scroll', () => {
    useState.mockReturnValue([true, jest.fn()]);
    const out = useScroll('red');
    expect(out).toMatchObject({
      style: {
        backgroundColor: '#FFF',
        color: 'inherit',
      },
    });
  });
});
