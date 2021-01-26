import React from 'react';
import PropTypes from 'prop-types';
import * as Charts from 'q3-ui-charts';
import useRest from 'q3-ui-rest';
import withDateRange from '../../helpers/withDateRange';

const Chart = ({
  component,
  children,
  template,
  search,
  ...rest
}) => {
  const { data, fetching, fetchingError } = useRest({
    url: '/reports',
    key: 'data',
    runOnInit: true,
    location: {
      search: `?${search}&template=${template}`,
    },
  });

  const ChartComponent =
    Charts[fetching ? 'Loading' : component];

  console.log(data);

  return ChartComponent && !fetchingError ? (
    <ChartComponent {...rest} {...data}>
      {children}
    </ChartComponent>
  ) : null;
};

Chart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
  component: PropTypes.oneOf([
    'AreaLine',
    'Bar',
    'Pie',
    'Line',
  ]).isRequired,
  search: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
};

Chart.defaultProps = {
  children: null,
};

export default withDateRange(Chart);
