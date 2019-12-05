import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  tiled: {
    position: 'relative',
    marginBottom: theme.spacing(4),
    maxWidth: '100%',
  },
  errorBar: {
    backgroundColor: red[900],
    height: 4,
  },
  contentBlock: {
    maxWidth: '75%',
  },
}));

const Tile = ({
  children,
  title,
  subtitle,
  loading,
  error,
  renderFooter,
  dividers,
  disableSkeleton,
}) => {
  const { tiled, errorBar } = useStyles();
  const hasSubtitle = Boolean(subtitle);

  return (
    <Paper
      elevation={0}
      component="section"
      className={tiled}
      square
    >
      {loading && dividers && (
        <Collapse in={loading}>
          <LinearProgress />
        </Collapse>
      )}
      {error && <Divider className={errorBar} />}

      <Box p={2} component="header">
        <Typography variant="h3" gutterBottom={hasSubtitle}>
          {title}
        </Typography>
        {hasSubtitle && (
          <Typography variant="body1">
            {subtitle}
          </Typography>
        )}
      </Box>
      {dividers && <Divider />}
      <Box py={dividers ? 2 : 0} px={2}>
        {loading && !disableSkeleton ? (
          <>
            <Skeleton height={6} width="80%" />
            <Skeleton height={6} width="80%" />
            <Skeleton height={6} width="60%" />
            <Skeleton height={6} width="70%" />
            <Skeleton height={6} width="40%" />
          </>
        ) : (
          children
        )}
      </Box>
      {renderFooter && (
        <>
          {dividers && <Divider />}
          <Box p={2} component="footer">
            {renderFooter()}
          </Box>
        </>
      )}
    </Paper>
  );
};

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  renderFooter: PropTypes.func,
  dividers: PropTypes.bool,
};

Tile.defaultProps = {
  loading: false,
  renderFooter: null,
  subtitle: null,
  error: false,
  dividers: true,
};

export default Tile;
