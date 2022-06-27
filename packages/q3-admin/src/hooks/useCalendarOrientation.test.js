import React from 'react';
import '@fullcalendar/react';
import useCalendarOrientation from './useCalendarOrientation';

let setState;

beforeEach(() => {
  setState = jest.fn();

  jest
    .spyOn(React, 'useLayoutEffect')
    .mockImplementation((f) => f());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      getApi: jest.fn().mockReturnValue({
        changeView: jest.fn(),
      }),
    },
  });

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([null, setState]);
});

describe('useCalendarOrientation', () => {
  it('should set view type', () => {
    useCalendarOrientation();
    expect(setState).toHaveBeenCalledWith('timeGridWeek');
  });
});
