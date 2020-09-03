import React from 'react';
import { navigate } from '@reach/router';
import { destroySession } from 'q3-ui-permissions';
import Gatekeeper from '.';

let spy;

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

jest.mock('q3-ui-permissions', () => ({
  destroySession: jest.fn(),
}));

beforeEach(() => {
  spy = jest.spyOn(React, 'useContext');
  navigate.mockReset();
});

describe('Gatekeeper', () => {
  it('should navigate to public path', () => {
    spy.mockReturnValue({
      state: { init: true },
    });

    global.shallow(
      <Gatekeeper redirectPathOnPublic="/login" />,
    );

    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('should fail authentication check', () => {
    spy.mockReturnValue({
      state: { init: true, profile: { role: 'Test' } },
    });

    const customPath = 'custom-fail';
    const redirectCheck = jest
      .fn()
      .mockReturnValue(customPath);

    global.shallow(
      <Gatekeeper
        redirectPathOnPublic="/failed-auth"
        redirectCheck={redirectCheck}
      />,
    );

    expect(navigate).not.toHaveBeenCalled();
    expect(destroySession).toHaveBeenCalledWith(customPath);
  });

  it('should redirect loggen in users to public pages', () => {
    spy.mockReturnValue({
      state: { init: true, profile: { id: 1 } },
    });

    global.shallow(
      <Gatekeeper
        redirectPathOnPublic="/login"
        redirectPathOnSession="/app"
      />,
    );

    expect(navigate).toHaveBeenCalledWith('/app');
    expect(navigate).not.toHaveBeenCalledWith('/login');
  });

  it('should just render the child', () => {
    spy.mockReturnValue({
      state: { init: true },
    });

    global.shallow(
      <Gatekeeper>
        <div />
      </Gatekeeper>,
    );

    expect(navigate).not.toHaveBeenCalled();
  });
});
