import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const Notify = ({ show, title, label }) => (
  <Box position="sticky" top={0} zIndex="10">
    <Slide in={Boolean(show)}>
      <div>
        <Alert severity="warning">
          {label && <strong>{label}: </strong>}
          {title}
        </Alert>
      </div>
    </Slide>
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
