import React from 'react';
import { useLocation } from '@reach/router';
import { Link } from '@material-ui/core';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import SystemPage from './SystemPage';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

describe('SystemPage', () => {
  it('should not render back button', () => {
    useLocation.mockReturnValue({
      pathname: '/account',
    });

    doesNotExist(
      global
        .shallow(
          <SystemPage path="account">
            <div />
          </SystemPage>,
        )
        .find(Link),
    );
  });

  it('should render back button', () => {
    useLocation.mockReturnValue({
      pathname: '/account/sub',
    });

    exists(
      global
        .shallow(
          <SystemPage path="account">
            <div />
          </SystemPage>,
        )
        .find(Link),
    );
  });
});
