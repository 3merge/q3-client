import React from 'react';
import { useNavigate } from '@reach/router';
import useNotificationClickEvent from './useNotificationClickEvent';

jest.mock('@reach/router', () => ({
  useNavigate: jest.fn(),
}));

let open;

const makeCallback = () =>
  jest.fn().mockReturnValue({
    then: (cb) => {
      cb();
      return {
        catch: jest.fn(),
      };
    },
  });

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  open = jest.spyOn(window, 'open').mockReturnValue({
    focus: jest.fn(),
  });
});

describe('useNotificationClickEvent', () => {
  it('should invoke window.open', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValue(['https://google.ca', jest.fn()]);

    useNavigate.mockReturnValue(jest.fn());

    useNotificationClickEvent([], makeCallback());
    expect(open).toHaveBeenCalled();
  });

  it('should invoke navigate', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValue(['/app/1', jest.fn()]);

    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    useNotificationClickEvent([], makeCallback());
    expect(navigate).toHaveBeenCalled();
  });

  it('should assign click hanlder', () => {
    const setState = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockReturnValue(['https://google.ca', setState]);

    useNavigate.mockReturnValue(jest.fn());
    const data = [
      {
        acknowledge: jest.fn(),
        url: 'https://google.ca',
      },
      {
        acknowledge: jest.fn(),
      },
    ];

    useNotificationClickEvent(data, makeCallback());
    expect(data[0]).toHaveProperty('onClick');
    expect(data[1]).not.toHaveProperty('onClick');

    data[0].onClick({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });

    expect(data[0].acknowledge).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(
      'https://google.ca',
    );
  });
});
