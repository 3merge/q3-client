import React from 'react';
import { wait } from 'q3-ui-test-utils/lib/enzymeUtils';
import useFileManagerInit from './useFileManagerInit';

let setState;

beforeAll(() => {
  setState = jest.fn();

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: null,
  });

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([false, setState]);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('useFileManagerInit', () => {
  it('should be truthy when auth can see', async () => {
    const next = jest
      .fn()
      .mockReturnValue(Promise.resolve());

    useFileManagerInit(
      {
        canSee: true,
      },
      next,
    );

    await wait();
    expect(next).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(true);
  });

  it('should be falsy when auth cannot see', () => {
    const next = jest.fn();
    useFileManagerInit(
      {
        canSee: false,
      },
      next,
    );
    expect(next).not.toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(true);
  });
});
