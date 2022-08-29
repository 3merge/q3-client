import React from 'react';
import PropTypes from 'prop-types';
import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import withChartUtils from '../withChartUtils';
import withColours from '../withColours';
import withHeader from '../withHeader';
import withValues from '../withValues';

const CustomLineChartWrapper =
  withChartUtils(ComposedChart);

export const CustomLineChart = ({ children, ...rest }) => {
  const nodes = React.Children.toArray(children);
  const theme = useTheme();

  return (
    <ResponsiveContainer>
      <CustomLineChartWrapper {...rest}>
        {children}
        {nodes.length === 1 && (
          <>
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
                  stopColor={theme.palette.secondary.light}
                  stopOpacity={0.88}
                />
                <stop
                  offset="99%"
                  stopColor={theme.palette.background.paper}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              {...nodes[0]?.props}
              fill="url(#colorUv)"
              fillOpacity={1}
              stroke={false}
              strokeWidth={12}
            />
          </>
        )}
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
