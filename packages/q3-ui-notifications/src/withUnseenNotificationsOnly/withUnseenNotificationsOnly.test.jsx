import React from 'react';
import { act } from 'react-dom/test-utils';
import { browser } from 'q3-ui-helpers';
import { FormControlLabel } from '@material-ui/core';
import withUnseenNotifications from './withUnseenNotificationsOnly';

jest.unmock('useful-state');

const Component = () => <div />;
const Wrapped = withUnseenNotifications(Component);

const getDataLength = () =>
  global
    .mount(<Wrapped data={[{ hasSeen: true }]} />)
    .find(Component)
    .prop('data').length;

let spy;

beforeAll(() => {
  spy = jest.spyOn(browser, 'proxyLocalStorageApi');
});

beforeEach(() => {
  spy.mockReset();
});

describe('withUnseenNotifications', () => {
  it('should show seen notifications', () => {
    spy.mockReturnValue('false');
    expect(getDataLength()).toBe(1);
  });

  it('should hide seen notifications', () => {
    spy.mockReturnValue('true');
    expect(getDataLength()).toBe(0);
  });

  it('should toggle local storage', () => {
    spy.mockReturnValue('true');

    act(() => {
      global
        .mount(<Wrapped data={[]} />)
        .find(FormControlLabel)
        .props()
        .control.props.onChange();
    });

    expect(spy).toHaveBeenCalledWith(
      'setItem',
      expect.any(String),
      false,
    );
  });
});
