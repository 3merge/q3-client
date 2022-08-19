import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Hidden } from '@material-ui/core';
import useStyle from './styles';

const DesktopPaper = ({ children, height, width }) => {
  const cls = useStyle();

  return (
    <Hidden mdDown>
      <Box
        className={cls.nav}
        component="nav"
        style={{
          height,
          maxWidth: width,
        }}
      >
        <Paper className={cls.paper} color="primary">
          {children}
        </Paper>
      </Box>
    </Hidden>
  );
};

DesktopPaper.defaultProps = {
  children: null,
};

DesktopPaper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default DesktopPaper;
