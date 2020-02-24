import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { get } from 'lodash';

export const Reveal = ({ validation, children }) => {
  const validationLengthMeasured =
    get(validation, '_nodes.length', 0) > 0;

  return (
    <Fade in={validationLengthMeasured}>
      <div>{children(validationLengthMeasured)}</div>
    </Fade>
  );
};

Reveal.propTypes = {
  /**
   * Child fn.
   */
  children: PropTypes.func.isRequired,

  /**
   * YUP validation schema.
   */
  validation: PropTypes.shape({
    _nodes: PropTypes.object,
  }).isRequired,
};

export default Reveal;
