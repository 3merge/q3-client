import React from 'react';
import { PieChart, Cell, Legend, Pie } from 'recharts';
import withColours from '../withColours';

export default withColours(
  ({ colours, data, name, value }) => (
    <PieChart
      width={400}
      height={400}
      style={{ margin: '0 auto' }}
    >
      <Legend />
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
  ),
);
