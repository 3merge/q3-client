import React from 'react';
import { useGatekeeper } from 'q3-hooked';
import { Box } from '@material-ui/core';
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
      redirectCheck={() => {}}
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
    checkReturnValue(Box);
  });

  it('should return children', () => {
    checkReturnValue('div', undefined);
  });
});
