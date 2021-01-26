import React from 'react';
import PropTypes from 'prop-types';
import * as Charts from 'q3-ui-charts';
import { Fade } from '@material-ui/core';
import useRest from 'q3-ui-rest';
import withDateRange from '../../helpers/withDateRange';

const Chart = ({
  component,
  children,
  template,
  search,
  ...rest
}) => {
  const ChartComponent = Charts[component];
  const { data, fetching, fetchingError } = useRest({
    url: '/reports',
    key: 'data',
    runOnInit: true,
    location: {
      search: `?${search}&template=${template}`,
    },
  });

  if (!ChartComponent || fetchingError) return null;
  if (fetching) return <Charts.Loading {...rest} />;

  return (
    <Fade in>
      <ChartComponent {...rest} {...data}>
        {children}
      </ChartComponent>
    </Fade>
  );
};

Chart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
  component: PropTypes.oneOf(['AreaLine', 'Bar', 'Pie'])
    .isRequired,
  search: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
};

Chart.defaultProps = {
  children: null,
};

export default withDateRange(Chart);
