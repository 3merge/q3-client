import React from 'react';
import useResults, {
  isOfAdequateLength,
} from '../useResults';

const setState = jest.fn().mockImplementation((v) => v);

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, setState]);

jest
  .spyOn(React, 'useCallback')
  .mockImplementation((fn) => (params) => fn(params));

jest
  .spyOn(React, 'useRef')
  .mockReturnValue({ current: {} });

describe('useResults', () => {
  it('should return truthy', () =>
    expect(isOfAdequateLength('aabb', 2)).toBeTruthy());

  it('should return falsy', () =>
    expect(isOfAdequateLength('a', 2)).toBeFalsy());

  it.only('should', async () => {
    const { run } = useResults(
      () => Promise.resolve([1, 2]),
      'Term',
    );

    return expect(run()).resolves.toEqual([1, 2]);
  });
});
