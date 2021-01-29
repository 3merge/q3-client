import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import CustomTooltip from '../Tooltip';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

const CustomLineChart = ({ children, data, name }) => (
  <ResponsiveContainer>
    <AreaChart data={data}>
      <Legend />
      <CartesianGrid />
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      {children}
    </AreaChart>
  </ResponsiveContainer>
);

CustomLineChart.defaultProps = {
  children: null,
};

CustomLineChart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
};

export default withHeader(
  withColours(withValues(CustomLineChart, Area)),
);
