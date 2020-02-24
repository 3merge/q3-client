import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { get } from 'lodash';

export const RevealOnValidation = ({
  validation,
  children,
}) => {
  const validationLengthMeasured = get(
    validation,
    '_nodes.length',
    null,
  );

  return (
    <Fade in={validationLengthMeasured}>
      <div>{children(validationLengthMeasured)}</div>
    </Fade>
  );
};

RevealOnValidation.propTypes = {
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

export default RevealOnValidation;
