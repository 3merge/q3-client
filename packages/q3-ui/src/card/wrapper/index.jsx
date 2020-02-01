import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { getLinkAttributes } from '../../utils';
import useStyles from '../useStyle';

const Wrapper = ({ children, to, ...rest }) => {
  const { root } = useStyles();
  return (
    <Grid item {...rest}>
      <Card
        {...getLinkAttributes(to)}
        elevation={1}
        className={root}
        to={to}
      >
        {children}
      </Card>
    </Grid>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default Wrapper;
