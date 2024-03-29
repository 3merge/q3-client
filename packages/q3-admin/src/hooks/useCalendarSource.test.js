import React from 'react';
import { castToUTC } from 'q3-ui-forms/lib/helpers';
import { useQueryParams } from 'q3-ui-queryparams';
import { useNavigate } from '@reach/router';
import useCalendarSource from './useCalendarSource';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?foo=bar&date>=2021-01-01',
  }),
  useNavigate: jest.fn(),
}));

let ref;

beforeAll(() => {
  ref = {
    current: null,
  };

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([[], jest.fn()]);

  jest.spyOn(React, 'useRef').mockReturnValue(ref);
  jest.spyOn(React, 'useEffect').mockImplementation(() => {
    // noop
  });
});

describe('useCalendarSource', () => {
  it('should get initial date', () => {
    const poll = jest.fn().mockResolvedValue([]);
    const navigate = jest.fn();

    ref.current = {};
    useNavigate.mockReturnValue(navigate);

    jest.spyOn(React, 'useContext').mockReturnValue({
      poll,
    });

    const out = useCalendarSource({
      fromKey: 'date',
    });

    expect(out.initialDate).toMatch('2021-01-01');
  });

  it('should poll with start/end dates', (done) => {
    const poll = jest.fn().mockResolvedValue([]);
    const qp = useQueryParams();
    const navigate = jest.fn();

    ref.current = {};
    useNavigate.mockReturnValue(navigate);

    const context = {
      startStr: '2022-01-01',
      endStr: '2022-02-01',
    };

    const getBackgroundEvents = jest
      .fn()
      .mockResolvedValue([]);

    jest.spyOn(React, 'useContext').mockReturnValue({
      poll,
    });

    jest
      .spyOn(React, 'useEffect')
      .mockImplementation((fn) => fn());

    // this is debounced
    useCalendarSource({
      getBackgroundEvents,
      fromKey: 'date',
    }).getEvents(context);

    expect(getBackgroundEvents).toHaveBeenCalledWith(
      '?foo=bar&date>=2021-01-01&limit=500',
    );

    expect(poll).toHaveBeenCalledWith(
      '?foo=bar&date>=2021-01-01&limit=500',
    );

    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith(
        // location not mocked
        `undefined${qp.encode({
          foo: 'bar',
          'date>': castToUTC('2022-01-01'),
          'date<': castToUTC('2022-02-01'),
        })}&sort=-date`,
      );

      // allows us to requery
      expect(ref.current).toMatchObject(context);

      done();
    }, [600]);
  });

  it('should navigate by ID', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const getBackgroundEvents = jest
      .fn()
      .mockResolvedValue([]);

    jest.spyOn(React, 'useContext').mockReturnValue({
      location: {},
      directoryPath: '/test',
    });

    useCalendarSource({
      fromKey: 'f',
      toKey: 't',
      getBackgroundEvents,
    }).navigate({
      jsEvent: {
        preventDefault: jest.fn(),
      },
      event: {
        id: '1',
      },
    });

    expect(navigate).toHaveBeenCalledWith('/test/1');
  });

  it('should update both keys', () => {
    const interiorPatch = jest.fn().mockResolvedValue();
    const patch = jest.fn().mockReturnValue(interiorPatch);

    jest.spyOn(React, 'useContext').mockReturnValue({
      patch,
    });

    useCalendarSource({
      fromKey: 'f',
      toKey: 't',
    }).update({
      event: {
        id: '1',
        durationEditable: true,
        start: '2022-01-01',
        end: '2022-02-01',
      },
    });

    expect(patch).toHaveBeenCalledWith('1');
    expect(interiorPatch).toHaveBeenCalledWith({
      f: castToUTC('2022-01-01'),
      t: castToUTC('2022-02-01'),
    });
  });

  it('should update single keys', () => {
    const interiorPatch = jest.fn().mockResolvedValue();
    const patch = jest.fn().mockReturnValue(interiorPatch);

    jest.spyOn(React, 'useContext').mockReturnValue({
      patch,
    });

    useCalendarSource({
      fromKey: 'f',
    }).update({
      event: {
        id: '1',
        durationEditable: true,
        start: '2022-01-01',
        end: '2022-02-01',
      },
    });

    expect(patch).toHaveBeenCalledWith('1');
    expect(interiorPatch).toHaveBeenCalledWith({
      f: castToUTC('2022-01-01'),
    });
  });

  it('should revert on error', (done) => {
    const revert = jest.fn();
    const interiorPatch = jest.fn().mockRejectedValue();
    const patch = jest.fn().mockReturnValue(interiorPatch);

    jest.spyOn(React, 'useContext').mockReturnValue({
      patch,
    });

    useCalendarSource({
      fromKey: 'f',
    })
      .update({
        event: {
          id: '1',
          durationEditable: true,
          start: '2022-01-01',
          end: '2022-02-01',
        },
        revert,
      })
      .then(() => {
        expect(revert).toHaveBeenCalled();
        done();
      });
  });
});
