import React from 'react';
import useDomTreeToSegments from './useDomTreeToSegments';
import useSegmentsUpdate from '../useSegmentsUpdate';

jest.mock('../useSegmentsUpdate');

const mockReorder = () => {
  const reorder = jest.fn();
  useSegmentsUpdate.mockReturnValue({
    reorder,
  });
  return reorder;
};

describe('useDomTreeToSegments', () => {
  it('should', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        querySelectorAll: jest.fn().mockReturnValue([
          {
            parentNode: {
              closest: jest.fn().mockReturnValue({
                id: 2,
              }),
            },
            id: 1,
          },
          {
            parentNode: {
              closest: jest.fn().mockReturnValue(null),
            },
            id: 3,
          },
        ]),
      },
    });

    const reorder = mockReorder();
    useDomTreeToSegments().onEnd();
    expect(reorder).toHaveBeenCalledWith([
      {
        id: 1,
        folderId: 2,
      },
      {
        id: 3,
        folderId: null,
      },
    ]);
  });
});
