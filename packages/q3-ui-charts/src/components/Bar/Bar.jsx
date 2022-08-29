import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import withChartUtils from '../withChartUtils';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

const CustomBarChartWrapper = withChartUtils(BarChart);

export const CustomBarChart = ({ children, ...rest }) => (
  <ResponsiveContainer>
    <CustomBarChartWrapper {...rest}>
      {children}
    </CustomBarChartWrapper>
  </ResponsiveContainer>
);

CustomBarChart.defaultProps = {
  children: null,
};

CustomBarChart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]),
};

export default withHeader(
  withColours(withValues(CustomBarChart, Bar)),
);
