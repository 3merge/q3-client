import React from 'react';
import useRest from 'q3-ui-rest';
import { CircularProgress } from '@material-ui/core';
import withUsers from './withUsers';

jest.mock('q3-ui-rest', () => jest.fn());

const Component = withUsers(() => null);

describe('withUsers', () => {
  it('should return loading', () => {
    useRest.mockReturnValue({
      fetching: true,
    });

    expect(
      global
        .shallow(<Component id="123" />)
        .find(CircularProgress)
        .exists(),
    ).toBeTruthy();
  });

  it('should return empty', () => {
    useRest.mockReturnValue({
      fetching: false,
      fetchingError: true,
    });

    expect(
      global.shallow(<Component id="123" />).prop('users'),
    ).toHaveLength(0);
  });

  it('should return data', () => {
    useRest.mockReturnValue({
      fetching: false,
      users: [
        {
          value: 1,
          name: 'Jane',
        },
      ],
    });

    expect(
      global.shallow(<Component id="123" />).prop('users'),
    ).toEqual([
      {
        value: 1,
        label: 'Jane',
      },
    ]);
  });
});
