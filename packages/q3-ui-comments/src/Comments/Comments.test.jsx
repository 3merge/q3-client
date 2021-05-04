import React from 'react';
import useRest from 'q3-ui-rest';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Comments from './Comments';
import Timeline from '../Timeline';

jest.mock('q3-ui-rest');

const renderComments = () =>
  global.mount(<Comments collectionName="foo" id="1" />);

describe('Comments', () => {
  it('should form URL out of props', () => {
    useRest.mockReturnValue({});
    renderComments();

    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/foo/1/comments',
      }),
    );
  });

  test.each([
    [{ fetching: false, comments: [] }, Timeline],
    [{ fetching: true }, CircularProgress],
    [{ fetching: false, fetchingError: true }, Alert],
  ])('rest rendering state', (mock, El) => {
    useRest.mockReturnValue(mock);
    expect(renderComments().find(El).exists()).toBeTruthy();
  });
});
