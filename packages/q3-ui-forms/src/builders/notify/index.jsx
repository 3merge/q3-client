import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const Notify = ({ show, title }) => (
  <Collapse in={Boolean(show)}>
    <Box mb={1}>
      <Alert severity="warning">{title}</Alert>
    </Box>
  </Collapse>
);

Notify.propTypes = {
  /**
   * Toggles the visibility of this item without un-mounting it.
   */
  show: PropTypes.bool,

  /**
   * The text for this component.
   */
  title: PropTypes.string.isRequired,
};

Notify.defaultProps = {
  show: true,
};

export default Notify;
