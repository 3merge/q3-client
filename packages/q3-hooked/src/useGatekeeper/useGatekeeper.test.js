import React from 'react';
import * as R from '@reach/router';
import * as q3 from 'q3-ui-permissions';
import useGatekeeper_ from '.';

jest.mock('@reach/router');
jest.mock('q3-ui-permissions');

let Auth;
const redirectPathOnPublic = '/public';
const redirectPathOnSession = '/session';
const redirectCheck = jest.fn();

const stubContext = (
  args = { init: false, profile: true },
) => Auth.mockReturnValue({ state: { ...args } });

const useGatekeeper = () =>
  useGatekeeper_({
    redirectPathOnPublic,
    redirectPathOnSession,
  });

beforeEach(() => {
  Auth = jest.spyOn(React, 'useContext');
  R.navigate.mockClear();
  redirectCheck.mockClear();
});

describe('useGatekeeper', () => {
  it('should return true for loading auth', () => {
    stubContext({ init: true });
    expect(useGatekeeper()).toBeTruthy();
  });

  it.each([
    [{ init: false, profile: false }, redirectPathOnPublic],
    [undefined, redirectPathOnSession],
  ])(
    'should redirect for not being authenticated',
    (context, path) => {
      stubContext(context);
      useGatekeeper();

      expect(R.navigate).toHaveBeenCalledWith(path);
    },
  );

  it('should return null for being authenticated', () => {
    stubContext();
    const res = useGatekeeper(
      redirectCheck.mockReturnValue(null),
    );
    expect(redirectCheck).not.toHaveBeenCalled();
    expect(res).toBeNull();
  });

  it('should call destroySession', () => {
    stubContext();
    redirectCheck.mockReturnValue('foo');
    useGatekeeper_({
      redirectPathOnPublic,
      redirectPathOnSession: null,
      redirectCheck,
    });

    expect(q3.destroySession).toHaveBeenCalledWith('foo');
  });
});
