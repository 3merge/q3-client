import React from 'react';
import { useGatekeeper } from 'q3-hooked';
import CircularProgress from '@material-ui/core/CircularProgress';
import Gatekeeper from '.';

jest.mock('q3-hooked', () => ({
  useGatekeeper: jest.fn(),
}));

beforeEach(() => {
  useGatekeeper.mockClear();
});

const renderGatekeeper = () =>
  global.mount(
    <Gatekeeper
      redirectPathOnPublic="/login"
      redirectPathOnSession="/app"
      redirectCheck={() => undefined}
    >
      <div />
    </Gatekeeper>,
  );

const checkReturnValue = (component, isLoading = true) => {
  useGatekeeper.mockReturnValue(isLoading);
  expect(renderGatekeeper().exists(component)).toBeTruthy();
};

describe('Gatekeeper', () => {
  it('should return loading component', () => {
    checkReturnValue(CircularProgress);
  });

  it('should return children', () => {
    checkReturnValue('div', false);
  });
});
