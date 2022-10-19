import React from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Box,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import useStyle from './styles';

const Pattern = ({
  action,
  children,
  error,
  loading,
  size,
  title,
}) => {
  const cls = useStyle();

  const getGridItemDimensions = React.useCallback(() => {
    const output = {
      xs: 12,
    };

    const addMd = (md) =>
      Object.assign(output, {
        md,
      });

    if (size === 'md') addMd(6);
    else if (size === 'sm') addMd(4);
    else addMd(12);
    return output;
  }, [size]);

  return (
    <Grid item {...getGridItemDimensions()}>
      <Paper className={cls.paper} variant="outlined">
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          px={1.25}
        >
          <Box>
            <Typography
              component="h4"
              className={cls.label}
              variant="overline"
            >
              {title}
            </Typography>
          </Box>
          <Box>{action}</Box>
        </Box>
        <Box className={cls.box}>
          {loading && <CircularProgress />}
          {error && <Typography>Error</Typography>}
          {!loading && !error ? children : null}
        </Box>
      </Paper>
    </Grid>
  );
};

Pattern.defaultProps = {
  action: null,
  children: null,
  size: 'lg',
};

Pattern.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  title: PropTypes.string.isRequired,
};

export default Pattern;
