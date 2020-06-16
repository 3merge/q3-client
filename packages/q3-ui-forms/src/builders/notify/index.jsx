import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const Notify = ({ show, title, label }) => (
  <Box position="sticky" top={0} zIndex="10">
    <Collapse in={Boolean(show)}>
      <div>
        <Alert severity="warning">
          {label && <strong>{label}: </strong>}
          {title}
        </Alert>
      </div>
    </Collapse>
  </Box>
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
