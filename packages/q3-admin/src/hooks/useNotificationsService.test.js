import React from 'react';
import useNotificationsService from './useNotificationsService';

let state;

const mockStateWithInitialData = (initialData) => {
  const setState = jest.fn();
  state.mockReturnValue([
    initialData,
    (fn) => {
      setState(fn(initialData));
    },
  ]);

  return setState;
};

jest.unmock('axios');
jest.mock('./useNotificationsEvent', () => () => {
  // next();
});

beforeAll(() => {
  state = jest.spyOn(React, 'useState');
});

describe('useNotificationsService', () => {
  it('should mark single ID', () => {
    const setState = mockStateWithInitialData([
      { id: '1' },
      { id: '2' },
    ]);

    useNotificationsService().markAsSeen('1');
    expect(setState).toHaveBeenCalledWith([
      {
        id: '1',
        hasSeen: true,
        hasDownloaded: true,
      },
      {
        id: '2',
      },
    ]);
  });

  it('should mark array of IDs', () => {
    const setState = mockStateWithInitialData([
      { id: '1' },
      { id: '2' },
    ]);

    useNotificationsService().markAsSeen(['1', '2']);
    expect(setState).toHaveBeenCalledWith([
      {
        id: '1',
        hasSeen: true,
        hasDownloaded: true,
      },
      {
        id: '2',
        hasSeen: true,
        hasDownloaded: true,
      },
    ]);
  });

  it('should return seen data', () => {
    mockStateWithInitialData([
      {
        id: '1',
        hasSeen: true,
        hasDownloaded: true,
      },
      {
        id: '2',
      },
      {
        id: '3',
        hasSeen: true,
        hasDownloaded: true,
        dismissedOn: new Date(),
      },
    ]);

    expect(useNotificationsService().getSeen()).toEqual([
      '1',
    ]);
  });
});
