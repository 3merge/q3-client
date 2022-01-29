import React from 'react';
import Dialog from 'q3-ui-dialog';
import ItemActionsWrapper from './ItemActionsWrapper';
import useNextPrev from '../useNextPrev';

jest.mock('../useNextPrev');

const setState = jest.fn();

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    edit: jest.fn(),
    // state: 1,
    setState,
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

beforeEach(() => {
  useNextPrev.mockClear();
  setState.mockClear();
});

describe('ItemActionsWrapper', () => {
  describe('"callNavigateWithId"', () => {
    it('should navigate to next ID', () => {
      useNextPrev.mockReturnValue({
        next: jest.fn().mockReturnValue(2),
      });

      global
        .shallow(
          <ItemActionsWrapper id="1" label="test">
            <div />
          </ItemActionsWrapper>,
        )
        .find(Dialog)
        .props()
        .onNext();

      expect(setState).toHaveBeenCalledWith(2);
    });
  });
});
