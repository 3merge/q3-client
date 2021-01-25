import React from 'react';
import { map } from 'lodash';
import Template from 'q3-admin/lib/components/Template';
import Grid from '@material-ui/core/Grid';
import Chart from 'q3-admin/lib/containers/Chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import ColorScheme from 'color-scheme';

const COLORS = new ColorScheme()
  .from_hex('329686')
  .scheme('tetrade')
  .distance(0.1)
  .add_complement(true)
  .variation('hard')
  .web_safe(true)
  .colors()
  .filter((item) => item !== 'ffffff')
  .map((item) => `#${item}`);

const BarC = (props) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart {...props?.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props?.data?.key} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey={props?.data?.value}
            fill={COLORS[3]}
            stroke={COLORS[3]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Are = (props) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          {...props?.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props?.data?.key} />
          <YAxis />
          <Tooltip />
          <Area
            dataKey={props?.data?.value}
            stroke={COLORS[0]}
            fill={COLORS[0]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const Comp = (props) => {
  return (
    <PieChart
      width={400}
      height={400}
      style={{ margin: '0 auto' }}
    >
      <Legend />
      <Pie
        data={props?.data?.data}
        dataKey={props?.data?.value}
        nameKey={props?.data?.key}
        cx="50%"
        cy="50%"
        label
      >
        {map(props?.data?.data, (entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default () => (
  <Template muted>
    <Grid container spacing={2}>
      <Chart
        initialQueryValue="?template=newCharacters"
        filterComponent={<div />}
        chartComponent={<BarC />}
        title="Hello"
      />
      <Chart
        initialQueryValue="?template=newCharacters"
        filterComponent={<div />}
        chartComponent={<Are />}
        title="Hello"
      />
      <Chart
        initialQueryValue="?template=newCharacters"
        filterComponent={<div />}
        chartComponent={<Comp />}
        title="Hello"
      />
    </Grid>
  </Template>
);
