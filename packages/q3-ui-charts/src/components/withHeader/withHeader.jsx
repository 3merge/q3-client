import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { array } from 'q3-ui-helpers';
import ListSubheader from '@material-ui/core/ListSubheader';
import Download from '../Download';
import useStyle from './useStyle';
import { getDataLength } from '../withChartUtils/withChartUtils';

// eslint-disable-next-line
const HeaderTitle = ({ children }) => (
  <ListSubheader
    disableGutters
    disableSticky
    color="primary"
    component="figcaption"
    style={{
      fontWeight: 'bold',
      lineHeight: 'initial',
      margin: 0,
      textTransform: 'none',
    }}
  >
    {children}
  </ListSubheader>
);

export default (Component) => {
  const Header = ({
    children,
    data,
    enableDownload,
    style,
    title,
    ...rest
  }) => {
    const cleaned = array.hasLength(data) ? data : [];
    const cls = useStyle({
      legendSize: getDataLength(data),
    });

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
          mt={0.5}
          height="390px"
          width="100%"
          style={style}
        >
          <Component data={cleaned} {...rest} />
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
  };

  return Header;
};
