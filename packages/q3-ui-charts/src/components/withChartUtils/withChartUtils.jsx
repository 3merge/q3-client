import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { get, first, size, map, omit } from 'lodash';
import CustomTooltip from '../Tooltip';
import { applyFormatter } from '../TooltipList/TooltipList';

export const getDataLength = (data) => {
  try {
    return size(Object.keys(first(data || {})));
  } catch (e) {
    return 0;
  }
};

const shouldShowLegend = (xs) => {
  try {
    return getDataLength(xs.data) > 2;
  } catch {
    return false;
  }
};

const getMaxWidth = (xs, xAxisKey, formatter) =>
  (Math.max(
    ...map(xs, (item) =>
      Object.values(omit(item, [xAxisKey])).map(
        (v) => applyFormatter(formatter, String(v)).length,
      ),
    ).flat(),
  ) +
    1) *
  8.25;

export default (Component) => {
  const ChartUtils = (props) => {
    const {
      enableGrid,
      enableTooltip,
      enableXAxis,
      enableYAxis,
      enableYAxisMobile,
      children,
      name,
      // eslint-disable-next-line
      xAxisProps = {},
      // eslint-disable-next-line
      yAxisProps = {},
      ...rest
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(
      theme.breakpoints.down('sm'),
    );

    const formatter = get(yAxisProps, 'tickFormatter');
    const w = getMaxWidth(rest?.data, name, formatter);

    return (
      <Component name={name} {...rest}>
        {enableGrid && (
          <CartesianGrid strokeDasharray="3 3" />
        )}
        {enableXAxis && (
          <XAxis
            stroke={theme.palette.primary.dark}
            dataKey={name}
            axisLine={false}
            tickLine={false}
            {...xAxisProps}
          />
        )}
        {enableYAxis && (!matches || enableYAxisMobile) && (
          <YAxis
            interval="preserveStartEnd"
            stroke={theme.palette.primary.dark}
            axisLine={false}
            allowDecimals={false}
            width={w}
            {...yAxisProps}
          />
        )}
        {enableTooltip && (
          <Tooltip
            content={<CustomTooltip />}
            formatter={formatter}
          />
        )}
        {shouldShowLegend(rest) && (
          <Legend
            verticalAlign="bottom"
            height={22}
            wrapperStyle={{
              bottom: -11,
            }}
          />
        )}
        {children}
      </Component>
    );
  };

  ChartUtils.defaultProps = {
    enableGrid: true,
    enableTooltip: true,
    enableXAxis: true,
    enableYAxis: true,
    enableYAxisMobile: false,
  };

  ChartUtils.propTypes = {
    enableGrid: PropTypes.bool,
    enableTooltip: PropTypes.bool,
    enableXAxis: PropTypes.bool,
    enableYAxis: PropTypes.bool,
    enableYAxisMobile: PropTypes.bool,
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  };

  return ChartUtils;
};
