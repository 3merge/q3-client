import React from 'react';
import { Box } from '@material-ui/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

export default withHeader(
  withColours(
    withValues(
      ({ children, data, name }) => (
        <ResponsiveContainer>
          <AreaChart data={data}>
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={name} />
            <YAxis />
            <Tooltip />
            {children}
          </AreaChart>
        </ResponsiveContainer>
      ),
      Area,
    ),
  ),
);
