import React from 'react';
import { createPortal } from 'react-dom';
import withActionPortal from './withActionPortal';

const El = withActionPortal(() => <div />);

jest.mock('react-dom', () => ({
  createPortal: jest.fn(),
}));

jest.mock('q3-ui-helpers', () => ({
  browser: {
    isBrowserReady: jest.fn().mockReturnValue(true),
  },
}));

describe('withActionPortal', () => {
  it('should invoke portal', () => {
    jest.spyOn(React, 'useState').mockReturnValue(['NODE']);

    global.shallow(<El />);
    expect(createPortal).toHaveBeenCalledWith(
      expect.any(Object),
      'NODE',
    );
  });

  it('should set state with DOM element', () => {
    const setState = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockReturnValue([null, setState]);

    jest
      .spyOn(React, 'useLayoutEffect')
      .mockImplementation((fn) => fn());

    global.shallow(<El />);
    expect(setState).toHaveBeenCalled();
  });
});
