import React from 'react';
import { useCallbackMock } from 'q3-ui-test-utils/lib/reactUtils';
import '@fullcalendar/react';
import useCalendarOrientation from './useCalendarOrientation';

let setState;
const changeView = jest.fn();

useCallbackMock();

beforeEach(() => {
  setState = jest.fn();

  jest
    .spyOn(React, 'useLayoutEffect')
    .mockImplementation((f) => f());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      getApi: jest.fn().mockReturnValue({
        changeView,
        updateSize: jest.fn(),
      }),
    },
  });

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([null, setState]);

  jest.spyOn(React, 'useContext').mockReturnValue({});
});

describe('useCalendarOrientation', () => {
  it('should set view type', () => {
    useCalendarOrientation();
    expect(changeView).toHaveBeenCalledWith('timeGridWeek');
  });
});
