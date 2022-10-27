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

export const PatternError = () => {
  const { t } = useTranslation('descriptions');

  return (
    <Box px={1.25} pb={1.25}>
      <Typography>{t('couldNotLoadData')}</Typography>
    </Box>
  );
};

export const PatternLoading = () => (
  <Box p={2} textAlign="center">
    <CircularProgress />
  </Box>
);

const Pattern = ({
  action,
  children,
  error,
  height,
  loading,
  size,
  title,
  report,
}) => {
  const { t } = useTranslation();
  const cls = useStyle({
    height,
  });

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

  const render = () => {
    if (loading) return <PatternLoading />;
    if (error) return <PatternError />;
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
              {t(`titles:${title || report}`)}
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
  height: undefined,
  loading: false,
  report: undefined,
  size: 'xl',
  title: undefined,
};

Pattern.propTypes = {
  /**
   * Display custom action button beside the component title
   */
  action: PropTypes.node,
  /**
   * The content to display after loading
   */
  children: PropTypes.node,
  /**
   * The maximum height of the component,defaulting to 350px
   */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * Display an error message
   */
  error: PropTypes.bool,
  /*
   * Show loading indicator
   */
  loading: PropTypes.bool,
  /**
   * Control the max-width of the component
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /**
   * Heading value
   */
  title: PropTypes.string,
  /**
   * Sometimes defined when title is not
   */
  report: PropTypes.string,
};

export default Pattern;
