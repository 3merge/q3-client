import React from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Box,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

const Pattern = ({
  action,
  children,
  error,
  loading,
  size,
  title,
}) => {
  const { t } = useTranslation('description');
  const cls = useStyle();

  const getGridItemDimensions = React.useCallback(() => {
    const output = {
      xs: 12,
    };

    const addMd = (md) =>
      Object.assign(output, {
        md,
      });

    if (size === 'lg') addMd(8);
    else if (size === 'md') addMd(6);
    else if (size === 'sm') addMd(4);
    else if (size === 'xs') addMd(3);
    else addMd(12);
    return output;
  }, [size]);

  const LoadingComponent = React.useMemo(
    () => (
      <Box p={2} textAlign="center">
        <CircularProgress />
      </Box>
    ),
    [],
  );

  const ErrorComponent = React.useMemo(
    () => (
      <Box px={1.25}>
        <Typography>{t('couldNotLoadData')}</Typography>
      </Box>
    ),
    [],
  );

  const render = () => {
    if (loading) return LoadingComponent;
    if (error) return ErrorComponent;
    return children;
  };

  return (
    <Grid item {...getGridItemDimensions()}>
      <Paper className={cls.paper} variant="outlined">
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          px={1.25}
        >
          <Box py={0.75}>
            <Typography
              component="h4"
              className={cls.label}
              variant="body1"
            >
              {title}
            </Typography>
          </Box>
          <Box>{action}</Box>
        </Box>
        <Box className={cls.box}>{render()}</Box>
      </Paper>
    </Grid>
  );
};

Pattern.defaultProps = {
  action: null,
  children: null,
  error: false,
  loading: false,
  size: 'xl',
};

Pattern.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  title: PropTypes.string.isRequired,
};

export default Pattern;
