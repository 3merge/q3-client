import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
// eslint-disable-next-line
import Graphic from 'q3-ui-assets';
import { Store } from '../../containers/state';

const withPageLoading = (Component) => {
  const PageLoading = (props) => {
    const { fetching, fetchingError } =
      React.useContext(Store);

    if (fetching)
      return (
        <Box
          p={6}
          display="flex"
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      );

    if (fetchingError)
      return (
        <Box m={4}>
          <Graphic title="error" icon="Error" />
        </Box>
      );

    return <Component {...props} />;
  };

  PageLoading.propTypes = {
    fetching: PropTypes.bool,
    fetchingError: PropTypes.bool,
  };

  PageLoading.defaultProps = {
    fetchingError: false,
    fetching: true,
  };

  return PageLoading;
};

export default withPageLoading;
