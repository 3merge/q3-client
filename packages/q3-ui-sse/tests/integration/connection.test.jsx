import React from 'react';
import { useContextMock } from 'q3-ui-test-utils/lib/reactUtils';
import { act } from 'react-dom/test-utils';
import {
  useServerSideEvents,
  useServerSideEventsConnection,
  useChangeEventListener,
} from '../../src';
import { EventSourceBuilder } from '../fixtures';
import { CHANGE } from '../../src/constants';

useContextMock().changeReturnValue({
  state: {
    init: true,
    profile: {
      id: 1,
    },
  },
});

describe('SSE connection utils', () => {
  it('should register source listeners', () => {
    const { Source, listeners } = EventSourceBuilder();
    const Component = () => {
      useServerSideEvents(Source);
      return null;
    };

    global.mount(<Component />);

    expect(listeners).toMatchObject({
      onerror: expect.any(Function),
      onmessage: expect.any(Function),
      onopen: expect.any(Function),
    });
  });

  it('should dispatch events', (done) => {
    const { Source, listeners } = EventSourceBuilder();
    const evt = 'test';
    const fn = jest.fn().mockResolvedValue(null);

    const Component = () => {
      useChangeEventListener(evt, fn, 0);
      useServerSideEvents(Source);
      return null;
    };

    global.mount(<Component />);
    listeners.onmessage({
      data: JSON.stringify({
        collection: evt,
      }),
    });

    setTimeout(() => {
      expect(fn).toHaveBeenCalledWith(
        // current query is nothing
        '',
        expect.objectContaining({
          action: CHANGE,
          collection: evt,
        }),
      );

      done();
    }, 10);
  });

  it('should monitor connection state', () => {
    let state = {};
    const { Source, listeners } = EventSourceBuilder();

    const Component = () => {
      useServerSideEvents(Source);
      state = useServerSideEventsConnection();
      return null;
    };

    global.mount(<Component />);

    act(() => {
      listeners.onopen({});
    });

    expect(state).toMatchObject({
      connected: true,
      error: false,
    });

    act(() => {
      listeners.onerror({});
    });

    expect(state).toMatchObject({
      connected: true,
      error: true,
    });
  });
});
