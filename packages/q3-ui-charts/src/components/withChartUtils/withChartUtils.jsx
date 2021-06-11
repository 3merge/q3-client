import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { uniqBy, first, size, map, omit } from 'lodash';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CustomTooltip from '../Tooltip';

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      component="ul"
      m={0}
      p={0}
    >
      {uniqBy(payload, 'dataKey').map((entry, index) => (
        <Box
          alignItems="center"
          component="li"
          display="flex"
          key={`item-${index}`}
          color={entry.color}
          ml={1}
        >
          <FiberManualRecordIcon />
          {entry.value}
        </Box>
      ))}
    </Box>
  );
};

const shouldShowLegend = (xs) => {
  try {
    return size(Object.keys(first(xs.data))) > 2;
  } catch {
    return false;
  }
};

const getMaxWidth = (xs, xAxisKey) =>
  (Math.max(
    ...map(xs, (item) =>
      Object.values(omit(item, [xAxisKey])).map(
        (v) => String(v).length,
      ),
    ).flat(),
  ) +
    1) *
  8;

export default (Component) => {
  const ChartUtils = (props) => {
    const {
      enableGrid,
      enableTooltip,
      enableXAxis,
      enableYAxis,
      children,
      name,
      ...rest
    } = props;

    const theme = useTheme();
    const matches = useMediaQuery(
      theme.breakpoints.down('sm'),
    );

    const w = getMaxWidth(rest?.data, name);

    return (
      <Component name={name} {...rest}>
        {shouldShowLegend(rest) && (
          <Legend content={renderLegend} />
        )}
        {enableGrid && (
          <CartesianGrid strokeDasharray="3 3" />
        )}
        {enableXAxis && (
          <XAxis
            stroke={theme.palette.primary.dark}
            dataKey={name}
            axisLine={false}
            tickLine={false}
          />
        )}
        {enableYAxis && !matches && (
          <YAxis
            interval="preserveStartEnd"
            stroke={theme.palette.primary.dark}
            axisLine={false}
            width={w}
          />
        )}
        {enableTooltip && (
          <Tooltip content={<CustomTooltip />} />
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
  };

  ChartUtils.propTypes = {
    enableGrid: PropTypes.bool,
    enableTooltip: PropTypes.bool,
    enableXAxis: PropTypes.bool,
    enableYAxis: PropTypes.bool,
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  };

  return ChartUtils;
};
