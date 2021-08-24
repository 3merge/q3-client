import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { isUndefined } from 'lodash';
import { array } from 'q3-ui-helpers';
import ListSubheader from '@material-ui/core/ListSubheader';
import Download from '../Download';
import useStyle from './useStyle';
import { getDataLength } from '../withChartUtils/withChartUtils';

// eslint-disable-next-line
const HeaderTitle = ({ children }) => {
  const cls = useStyle();

  return (
    <ListSubheader
      disableGutters
      disableSticky
      component="figcaption"
      className={cls.title}
    >
      {children}
    </ListSubheader>
  );
};

export default (Component) => {
  const Header = ({
    children,
    data,
    enableDownload,
    style,
    title,
    xAxisTitle,
    yAxisTitle,
    disableGutters,
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
        p={0.75}
        m={0}
      >
        {enableDownload ? (
          <Download title={title} data={cleaned}>
            <HeaderTitle>{title}</HeaderTitle>
          </Download>
        ) : (
          <HeaderTitle>{title}</HeaderTitle>
        )}
        <Box
          position="relative"
          ml={getMarginValue(yAxisTitle)}
          mb={getMarginValue(xAxisTitle)}
          pb={disableGutters ? 0 : 1}
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
    data: [],
    children: null,
    enableDownload: true,
    title: 'Report',
    style: {},
    xAxisTitle: undefined,
    yAxisTitle: undefined,
    disableGutters: true,
  };

  Header.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
    ]),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    enableDownload: PropTypes.bool,
    title: PropTypes.string,
    style: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    xAxisTitle: PropTypes.string,
    yAxisTitle: PropTypes.string,
    disableGutters: PropTypes.bool,
  };

  return Header;
};
