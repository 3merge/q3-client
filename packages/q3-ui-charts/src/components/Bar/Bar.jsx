import React from 'react';
import { Box } from '@material-ui/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

export default withHeader(
  withColours(
    withValues(
      ({ children, data, name }) => (
        <ResponsiveContainer>
          <BarChart data={data}>
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={name} />
            <YAxis />
            <Tooltip />
            {children}
          </BarChart>
        </ResponsiveContainer>
      ),
      Bar,
    ),
  ),
);
