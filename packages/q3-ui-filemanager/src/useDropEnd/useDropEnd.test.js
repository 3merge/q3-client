import React from 'react';
import { wait } from 'q3-ui-test-utils/lib/enzymeUtils';
import useDropEnd from './useDropEnd';
import useDirectoryFoldersChange from '../useDirectoryFoldersChange';

let change;
jest.mock('../useDirectoryFoldersChange');

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

beforeEach(() => {
  change = jest
    .fn()
    .mockImplementation(() => Promise.resolve());

  useDirectoryFoldersChange.mockReturnValue(change);
});

describe('useDropEnd', () => {
  it('should skip change without state', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValue([null, jest.fn()]);

    useDropEnd();
    expect(change).not.toHaveBeenCalled();
  });

  it('should change based on state', async () => {
    const setState = jest.fn();
    const state = {
      id: 1,
      folderId: null,
    };

    jest
      .spyOn(React, 'useState')
      .mockReturnValue([state, setState]);

    useDropEnd(1);
    await wait(250);

    expect(change).toHaveBeenCalledWith(state);
    expect(setState).toHaveBeenCalledWith(null);
  });

  it('should change based on state', () => {
    const setState = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockReturnValue([{}, setState]);

    useDropEnd(1)(
      {
        foo: 1,
      },
      {
        didDrop: jest.fn().mockReturnValue(true),
        getDropResult: jest.fn().mockReturnValue({
          bar: 1,
        }),
      },
    );

    expect(setState).toHaveBeenCalledWith({
      foo: 1,
      bar: 1,
    });
  });
});
