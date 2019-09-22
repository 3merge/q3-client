import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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
  loading,
  error,
  renderFooter,
}) => {
  const { tiled, errorBar } = useStyles();
  return (
    <Paper
      elevation={0}
      component="section"
      className={tiled}
      square
    >
      {loading && (
        <Collapse in={loading}>
          <LinearProgress />
        </Collapse>
      )}
      {error && <Divider className={errorBar} />}

      <Box px={4} py={2} component="header">
        <Typography variant="h2">{title}</Typography>
      </Box>
      <Divider />
      <Box py={2}>
        <Container maxWidth="md">
          {loading ? (
            <Box>
              <Skeleton height={6} width="80%" />
              <Skeleton height={6} width="80%" />
              <Skeleton height={6} width="60%" />
              <Skeleton height={6} width="70%" />
              <Skeleton height={6} width="40%" />
            </Box>
          ) : (
            children
          )}
        </Container>
      </Box>
      {renderFooter && (
        <>
          <Divider />
          <Box px={4} py={2} component="footer">
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
  loading: PropTypes.bool,
  error: PropTypes.bool,
  renderFooter: PropTypes.func,
};

Tile.defaultProps = {
  loading: false,
  renderFooter: null,
  error: false,
};

export default Tile;
