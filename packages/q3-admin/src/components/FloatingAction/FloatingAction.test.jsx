import React from 'react';
import {
  exists,
  doesNotExist,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import { Fab } from '@material-ui/core';
import { useLocation } from '@reach/router';
import FloatingAction from './FloatingAction';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

describe('FloatingAction', () => {
  it('should render empty', () => {
    useLocation.mockReturnValue({});
    doesNotExist(
      global.shallow(<FloatingAction />).find(Fab),
    );
  });

  it('should render empty on failed page check', () => {
    useLocation.mockReturnValue({
      pathname: 'shows',
    });

    doesNotExist(
      global
        .shallow(
          <FloatingAction
            checkPage={(x) => x !== 'shows'}
          />,
        )
        .find(Fab),
    );
  });

  it('should render ', () => {
    useLocation.mockReturnValue({
      pathname: 'shows',
    });

    exists(
      global
        .shallow(
          <FloatingAction
            onClick={() => null}
            label="test"
            checkPage={(x) => x === 'shows'}
          />,
        )
        .find(Fab),
    );
  });
});
