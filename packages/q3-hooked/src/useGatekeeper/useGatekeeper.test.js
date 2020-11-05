import React from 'react';
import { navigate } from '@reach/router';
import { destroySession } from 'q3-ui-permissions';
import useGatekeeper from '.';

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

jest.mock('q3-ui-permissions', () => ({
  destroySession: jest.fn(),
}));

let Auth = jest.spyOn(React, 'useContext');

const redirectPathOnPublic = '/public';
const redirectPathOnSession = '/session';
const redirectCheck = jest.fn();

const stubContext = (
  args = { init: true, profile: true },
) => Auth.mockReturnValue({ state: { ...args } });

const runGatekeeper = () =>
  useGatekeeper({
    redirectPathOnPublic,
    redirectPathOnSession,
  });

beforeEach(() => {
  Auth = jest.spyOn(React, 'useContext');
  navigate.mockClear();
  redirectCheck.mockClear();
});

describe('useGatekeeper', () => {
  it('should return true for loading auth', () => {
    stubContext({ init: false });
    expect(runGatekeeper()).toBeTruthy();
  });

  it.each([
    [{ init: true, profile: false }, redirectPathOnPublic],
    [undefined, redirectPathOnSession],
  ])(
    'should redirect for not being authenticated',
    (context, path) => {
      stubContext(context);
      runGatekeeper();

      expect(navigate).toHaveBeenCalledWith(path);
    },
  );

  it('should return null for being authenticated', () => {
    stubContext();
    const res = runGatekeeper(
      redirectCheck.mockReturnValue(null),
    );
    expect(redirectCheck).not.toHaveBeenCalled();
    expect(res).toBeFalsy();
  });

  it('should call destroySession', () => {
    stubContext();
    redirectCheck.mockReturnValue('foo');
    useGatekeeper({
      redirectPathOnPublic,
      redirectPathOnSession: null,
      redirectCheck,
    });

    expect(destroySession).toHaveBeenCalledWith('foo');
  });
});
