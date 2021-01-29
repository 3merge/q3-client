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
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

const CustomBarChart = ({ children, data, name }) => (
  <ResponsiveContainer>
    <BarChart data={data}>
      <Legend />
      <CartesianGrid />
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      {children}
    </BarChart>
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
  name: PropTypes.string.isRequired,
};

export default withHeader(
  withColours(withValues(CustomBarChart, Bar)),
);
