import React from 'react';
import { useLocation } from '@reach/router';
import withAuthenticate from '../withAuthenticate';
import { authenticate } from '../utils';
import useSiteMetaData from '../useSiteMetaData';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('../useSiteMetaData');
jest.mock('../utils', () => ({
  authenticate: jest.fn(),
}));

const runAuthenticate = () => {
  const Component = () => <div />;
  const Instance = withAuthenticate(Component);

  global
    .shallow(<Instance />)
    .props()
    .authenticate();
};

describe('withAuthenticate', () => {
  it('should redirect to default directory', () => {
    useSiteMetaData.mockReturnValue({
      appDirectory: '/app',
    });

    runAuthenticate();
    expect(authenticate).toHaveBeenCalledWith(
      undefined,
      '/app',
    );
  });

  it('should redirect to gatekeeper', () => {
    useLocation.mockReturnValue({
      state: {
        gatekeeper: '/app/users',
      },
    });

    runAuthenticate();
    expect(authenticate).toHaveBeenCalledWith(
      undefined,
      '/app/users',
    );
  });
});
