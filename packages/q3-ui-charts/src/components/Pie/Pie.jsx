import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Cell,
  Legend,
  Pie,
  Tooltip,
} from 'recharts';
import CustomTooltip from '../Tooltip';
import withColours from '../withColours';
import withHeader from '../withHeader';

export default withHeader(
  withColours(({ colours, data, name, value }) => (
    <ResponsiveContainer>
      <PieChart>
        <Legend />
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={data}
          dataKey={value}
          nameKey={name}
          cx="50%"
          cy="50%"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colours[index % colours.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )),
);
