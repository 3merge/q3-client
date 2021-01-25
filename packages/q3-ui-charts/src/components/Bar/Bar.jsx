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
import withValues from '../withValues';

export default withColours(
  withValues(
    ({ children, data, name }) => (
      <Box height="450px" width="100%">
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
      </Box>
    ),
    Bar,
  ),
);
