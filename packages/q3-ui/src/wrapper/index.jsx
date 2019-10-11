import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  offset: {
    boxShadow: theme.shadows[1],
    position: 'relative',
    marginTop: '-15vh !important',
  },
  root: {
    backgroundColor: blueGrey[50],
    borderRadius: (props) => (props.fullWidth ? 0 : 5),
    margin: (props) => (props.fullWidth ? 0 : '0 auto'),
    maxWidth: (props) => (props.fullWidth ? '100%' : 1440),
    padding: '4rem 0',
  },
}));

const Wrapper = ({
  backgroundColor,
  children,
  negativeMargin,
  fullWidth,
}) => {
  const { offset, root } = useStyles({ fullWidth });
  return (
    <Box
      style={{ backgroundColor }}
      className={classnames(
        root,
        negativeMargin ? offset : null,
      )}
    >
      {children}
    </Box>
  );
};

Wrapper.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  negativeMargin: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Wrapper.defaultProps = {
  backgroundColor: null,
  negativeMargin: false,
  fullWidth: false,
};

export default Wrapper;
