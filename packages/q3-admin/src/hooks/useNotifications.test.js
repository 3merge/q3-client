import React from 'react';
import { first } from 'lodash';
import useNotifications from './useNotifications';
import useNotificationsService from './useNotificationsService';

jest.mock('./useNotificationsService', () => {
  const markAsSeen = jest.fn();
  const post = jest.fn().mockReturnValue({
    then: jest
      .fn()
      .mockImplementation((callback) => callback()),
  });

  const fn = jest.fn().mockReturnValue({
    data: [{ id: 1 }],
    error: false,
    markAsSeen,
    post,
  });

  fn.post = post;
  fn.markAsSeen = markAsSeen;

  return fn;
});

const refContext = {
  current: undefined,
};

beforeAll(() => {
  jest.spyOn(React, 'useRef').mockReturnValue(refContext);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

beforeEach(() => {
  useNotificationsService.post.mockClear();
  useNotificationsService.markAsSeen.mockClear();
});

describe('useNotifications', () => {
  it('should run on change', () => {
    refContext.current = true;

    useNotifications();
    expect(useNotificationsService.post).toHaveBeenCalled();
    expect(refContext.current).toBeFalsy();
  });

  it('should not run on change', () => {
    refContext.current = false;

    useNotifications();
    expect(
      useNotificationsService.post,
    ).not.toHaveBeenCalled();
  });

  it('should call markAsSeen with ID', () => {
    refContext.current = false;

    const data = first(useNotifications().data);
    data.acknowledge();

    expect(
      useNotificationsService.markAsSeen,
    ).toHaveBeenCalledWith(data.id);
  });

  it('should call markAsSeen with ID', () => {
    const id = '123';
    useNotifications().acknowledge(null, id);

    expect(
      useNotificationsService.markAsSeen,
    ).toHaveBeenCalledWith(id);

    expect(refContext.current).toBeTruthy();
  });
});
