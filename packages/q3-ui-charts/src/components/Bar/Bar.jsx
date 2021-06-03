import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CustomTooltip from '../Tooltip';
import withChartUtils from '../withChartUtils';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

const CustomBarChartWrapper = withChartUtils(BarChart);

const CustomBarChart = ({ children, ...rest }) => (
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withHeader(
  withColours(withValues(CustomBarChart, Bar)),
);
