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
  it('should get data ids', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        querySelectorAll: jest.fn().mockReturnValue([
          {
            parentNode: {
              closest: jest.fn().mockReturnValue({
                getAttribute: jest.fn().mockReturnValue(2),
              }),
            },
            getAttribute: jest.fn().mockReturnValue(1),
          },
          {
            parentNode: {
              closest: jest.fn().mockReturnValue(null),
            },

            getAttribute: jest.fn().mockReturnValue(3),
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
