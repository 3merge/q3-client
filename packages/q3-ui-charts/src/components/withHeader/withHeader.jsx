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
        px={2}
        pb={1}
        pt={2}
        m={0}
      >
        <Box mb={2}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
          >
            <Grid item md xs={12}>
              <Typography
                component="h2"
                variant="h4"
                className={cls.title}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>{children}</Grid>
            <Grid item xs className={cls.right}>
              <Download title={title} data={cleaned} />
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
