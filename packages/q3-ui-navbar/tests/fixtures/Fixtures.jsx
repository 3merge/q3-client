import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { AuthContext } from 'q3-ui-permissions';
// eslint-disable-next-line
import Location from 'q3-ui-test-utils/lib/location';
import LocationInput from './LocationInput';
import { SegmentsProvider } from '../../src';
import MockApi from './MockApi';
import menu from './menu.js';

const Fixtures = ({
  children,
  developer,
  delay,
  ...rest
}) => (
  <Location initialPath="/shows">
    <Box width={350}>
      <Box mb={1}>
        <LocationInput />
      </Box>
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
  </Location>
);

Fixtures.defaultProps = {
  developer: true,
  delay: 50,
};

Fixtures.propTypes = {
  children: PropTypes.func.isRequired,
  developer: PropTypes.bool,
  delay: PropTypes.number,
};

export default Fixtures;
