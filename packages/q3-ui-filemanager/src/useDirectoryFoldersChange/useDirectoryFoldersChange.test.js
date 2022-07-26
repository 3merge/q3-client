import React from 'react';
import useDirectoryFoldersChange from './useDirectoryFoldersChange';

const runChangeCallback = (
  expectedPatchArgument,
  context = {},
) => {
  const patchHandler = jest
    .fn()
    .mockImplementation(() => Promise.resolve());

  const patch = jest.fn().mockReturnValue(patchHandler);
  const patchBulk = jest.fn().mockReturnValue(patchHandler);

  const clearSelected = jest.fn();

  jest.spyOn(React, 'useContext').mockReturnValue({
    ...context,
    clearSelected,
    patch,
    patchBulk,
  });

  return useDirectoryFoldersChange()({
    id: 1,
    folderId: 2,
  }).then(() => {
    expect(
      Array.isArray(expectedPatchArgument)
        ? patchBulk
        : patch,
    ).toHaveBeenCalledWith(expectedPatchArgument);
    expect(patchHandler).toHaveBeenCalledWith({
      folderId: 2,
    });

    expect(clearSelected).toHaveBeenCalled();
  });
};

beforeAll(() => {
  jest
    .spyOn(React, 'useCallback')
    .mockImplementation((callback) => callback);
});

describe('useDirectoryFoldersChange', () => {
  it('should pass id', () => runChangeCallback(1));
  it('should serialize selected ids', () =>
    runChangeCallback([1, 2], { selected: [1, 2] }));
});
