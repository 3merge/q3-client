import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { AuthContext } from 'q3-ui-permissions';
// eslint-disable-next-line
import Location from 'q3-ui-test-utils/lib/location';
// eslint-disable-next-line
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import LocationInput from './LocationInput';
import { SegmentsProvider } from '../../src';
import MockApi from './MockApi';
import menu from './menu.js';

const Fixtures = ({
  children,
  developer,
  delay,
  initialPath,
  ...rest
}) => (
  <Location initialPath={initialPath}>
    <Box width={350}>
      <AuthContext.Provider
        value={React.useMemo(
          () => ({
            state: {
              init: true,
              profile: {
                developer,
              },
            },
          }),
          [developer],
        )}
      >
        <MockApi delay={delay}>
          <SegmentsProvider
            // eslint-disable-next-line
            fallback={() => <div id="fallback" />}
            visibilityOptions={[
              'Administrator',
              'Sales Rep',
              'Customer',
            ]}
            {...rest}
          >
            {children(menu)}
          </SegmentsProvider>
        </MockApi>
      </AuthContext.Provider>
    </Box>
    <Box mt={2}>
      <Typography>
        The following components are not part of{' '}
        <code>NavBar</code>. They simple aid in
        demonstrating segment values.
      </Typography>
      <LocationDebugger />
      <LocationInput />
    </Box>
  </Location>
);

Fixtures.defaultProps = {
  developer: true,
  delay: 50,
  initialPath: '/shows',
};

Fixtures.propTypes = {
  children: PropTypes.func.isRequired,
  developer: PropTypes.bool,
  delay: PropTypes.number,
  initialPath: PropTypes.string,
};

export default Fixtures;
