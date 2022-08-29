import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  Line,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import withChartUtils from '../withChartUtils';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

const CustomLineChartWrapper =
  withChartUtils(ComposedChart);

const CustomLineChart = ({ children, ...rest }) => {
  const t = useTheme();

  return (
    <ResponsiveContainer>
      <CustomLineChartWrapper {...rest}>
        <defs>
          <linearGradient
            id="colorUv"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={t.palette.secondary.light}
              stopOpacity={0.1}
            />
            <stop
              offset="99%"
              stopColor={t.palette.background.paper}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        {children}
        {React.Children.map(children, (item) => (
          <Area
            {...item.props}
            stroke={false}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        ))}
      </CustomLineChartWrapper>
    </ResponsiveContainer>
  );
};

CustomLineChart.defaultProps = {
  children: null,
};

CustomLineChart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]),
  // eslint-disable-next-line
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withHeader(
  withColours(withValues(CustomLineChart, Line)),
);
