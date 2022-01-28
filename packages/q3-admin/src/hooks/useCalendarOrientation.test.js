import React from 'react';
import '@fullcalendar/react';
import { useMediaQuery } from '@material-ui/core';
import useCalendarOrientation from './useCalendarOrientation';

jest.mock('@material-ui/core/useMediaQuery');

let fn;

beforeEach(() => {
  fn = jest.fn();

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((f) => f());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      getApi: jest.fn().mockReturnValue({
        changeView: fn,
      }),
    },
  });
});

describe('useCalendarOrientation', () => {
  it('should change view on mobile', () => {
    useMediaQuery.mockReturnValue(true);
    const { headerToolbar } = useCalendarOrientation();
    expect(fn).toHaveBeenCalled();
    expect(headerToolbar).toEqual({});
  });

  it('should change view on mobile', () => {
    useMediaQuery.mockReturnValue(false);
    const { headerToolbar } = useCalendarOrientation();
    expect(fn).not.toHaveBeenCalled();
    expect(headerToolbar).toHaveProperty('center');
  });
});
