import React from 'react';
import { Typography } from '@material-ui/core';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import Navbar from './Navbar';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({}),
  useMatch: jest.fn(),
}));

describe('Navbar', () => {
  it('should not render undefined subheaders', () => {
    doesNotExist(
      global
        .shallow(
          <Navbar
            items={{
              undefined: [
                {
                  collectionName: 'test',
                  label: 'first menu item',
                  to: '/',
                },
              ],
            }}
          />,
        )
        .find(Typography),
    );
  });

  it('should render subheader', () => {
    exists(
      global
        .shallow(
          <Navbar
            items={{
              tests: [
                {
                  collectionName: 'test',
                  label: 'first menu item',
                  to: '/',
                },
              ],
            }}
          />,
        )
        .find(Typography),
    );
  });
});
