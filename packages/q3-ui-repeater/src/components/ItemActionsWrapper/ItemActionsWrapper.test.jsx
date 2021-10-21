import React from 'react';
import Dialog from 'q3-ui-dialog';
import { navigate, useLocation } from '@reach/router';
import ItemActionsWrapper from './ItemActionsWrapper';
import useNextPrev from '../useNextPrev';

jest.mock('../useNextPrev');

jest.mock('@reach/router', () => {
  // eslint-disable-next-line
  const navigate = jest.fn();

  return {
    navigate,
    useLocation: jest.fn().mockReturnValue({}),
    useNavigate: jest.fn().mockReturnValue(navigate),
  };
});

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    edit: jest.fn(),
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

beforeEach(() => {
  navigate.mockClear();
  useNextPrev.mockClear();
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

      expect(navigate).toHaveBeenCalledWith('', {
        state: {
          selectedSubDocument: 2,
        },
      });
    });
  });

  it('should not close dialog', () => {
    const close = jest.fn();
    useNextPrev.mockReturnValue({
      data: {
        id: 1,
      },
    });

    global
      .shallow(
        <ItemActionsWrapper id="1" label="test">
          <div />
        </ItemActionsWrapper>,
      )
      .find(Dialog)
      .props()
      .renderContent(close, true);

    expect(close).not.toHaveBeenCalled();
  });

  it('should close dialog', () => {
    const close = jest.fn();

    useNextPrev.mockReturnValue({
      data: {},
    });

    global
      .shallow(
        <ItemActionsWrapper id="1" label="test">
          <div />
        </ItemActionsWrapper>,
      )
      .find(Dialog)
      .props()
      .renderContent(close, true);

    expect(close).toHaveBeenCalled();
  });
});
