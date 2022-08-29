import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { isUndefined } from 'lodash';
import { array } from 'q3-ui-helpers';
import Download from '../Download';
import useStyle from './useStyle';
import { getDataLength } from '../withChartUtils/withChartUtils';

// eslint-disable-next-line
const HeaderTitle = ({ children }) => {
  const cls = useStyle();

  return (
    <Typography
      component="figcaption"
      className={cls.title}
    >
      {children}
    </Typography>
  );
};

export default (Component) => {
  const Header = ({
    customControls,
    data,
    enableDownload,
    style,
    title,
    xAxisTitle,
    yAxisTitle,
    ...rest
  }) => {
    const cleaned = array.hasLength(data) ? data : [];
    const cls = useStyle({
      legendSize: getDataLength(data),
    });

    const getMarginValue = (xs) =>
      isUndefined(xs) ? 0 : 2;

    return (
      <Box
        bgcolor="background.paper"
        className={cls.root}
        component="figure"
        p={1}
        m={0}
      >
        <Box alignItems="center" display="flex">
          <HeaderTitle>{title}</HeaderTitle>
          {enableDownload && <Download data={data} />}
        </Box>
        {customControls}
        <Box
          className="q3-charts-axis-container"
          position="relative"
          ml={getMarginValue(yAxisTitle)}
          mb={getMarginValue(xAxisTitle)}
          pb={1}
        >
          <Box
            mt={0.5}
            height="390px"
            width="100%"
            style={style}
          >
            <Component data={cleaned} {...rest} />
          </Box>
          {yAxisTitle && (
            <Box
              data-role="axis"
              component={Typography}
              variant="caption"
              position="absolute"
              top="50%"
              right="100%"
              className={cls.yTitle}
            >
              {yAxisTitle}
            </Box>
          )}
          {xAxisTitle && (
            <Box
              data-role="axis"
              component={Typography}
              variant="caption"
              position="absolute"
              top="100%"
              left="50%"
              className={cls.xTitle}
            >
              {xAxisTitle}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  Header.defaultProps = {
    customControls: null,
    data: [],
    enableDownload: true,
    title: 'Report',
    style: {},
    xAxisTitle: undefined,
    yAxisTitle: undefined,
  };

  Header.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    enableDownload: PropTypes.bool,
    title: PropTypes.string,
    style: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    xAxisTitle: PropTypes.string,
    yAxisTitle: PropTypes.string,
  };

  return Header;
};
