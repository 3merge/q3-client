import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import { array } from 'q3-ui-helpers';
import Download from '../Download';
import useStyle from './useStyle';

export default (Component) => {
  const Header = ({ children, data, title, ...rest }) => {
    const cleaned = array.hasLength(data) ? data : [];
    const cls = useStyle();

    return (
      <Box
        bgcolor="background.paper"
        className={cls.root}
        component="figure"
        p={2}
        m={0}
      >
        <Box mb={1}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography component="h2" variant="h4">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Box alignItems="center" display="flex">
                {children}
                <Download title={title} data={cleaned} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box height="390px" width="100%">
          <Component data={cleaned} {...rest} />
        </Box>
      </Box>
    );
  };

  Header.defaultProps = {
    data: [],
    children: null,
    title: 'Report',
  };

  Header.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
    ]),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string,
  };

  return Header;
};
