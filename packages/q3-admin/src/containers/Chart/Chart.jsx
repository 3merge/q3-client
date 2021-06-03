import React from 'react';
import PropTypes from 'prop-types';
import Charts from 'q3-ui-charts';
import { Box } from '@material-ui/core';
import useRest from 'q3-ui-rest';
import withDateRange from '../../helpers/withDateRange';

const Chart = ({ children, template, search, ...rest }) => {
  const { data } = useRest({
    url: '/reports',
    key: 'data',
    runOnInit: true,
    location: {
      search: `?${search}&template=${template}`,
    },
  });

  return (
    <Box mb={2}>
      <Charts {...rest} {...data}>
        {children}
      </Charts>
    </Box>
  );
};

Chart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),

  search: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
};

Chart.defaultProps = {
  children: null,
};

export default withDateRange(Chart);
