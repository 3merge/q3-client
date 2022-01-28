import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// eslint-disable-next-line
import Graphic from 'q3-ui-assets';
import { exists } from 'q3-ui-test-utils/lib/enzymeUtils';
import withPageLoading from './withPageLoading';

const Component = () => <div />;
const DecoratedComponent = withPageLoading(Component);

describe('withPageLoading', () => {
  it('should render loading', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      fetching: true,
    });

    exists(
      global
        .shallow(<DecoratedComponent />)
        .find(CircularProgress),
    );
  });

  it('should render error', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      fetching: false,
      fetchingError: true,
    });

    exists(
      global.shallow(<DecoratedComponent />).find(Graphic),
    );
  });

  it('should render component', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      fetching: false,
      fetchingError: false,
    });

    exists(
      global
        .shallow(<DecoratedComponent />)
        .find(Component),
    );
  });
});
