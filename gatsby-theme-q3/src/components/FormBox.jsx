import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const FormBox = ({ renderBottom, renderTop }) => (
  <Box
    component="section"
    width="100%"
    maxWidth="650px"
    p={0.5}
  >
    {renderTop}
    <Box mt={1}>{renderBottom}</Box>
  </Box>
);

FormBox.propTypes = {
  renderBottom: PropTypes.node.isRequired,
  renderTop: PropTypes.node.isRequired,
};

export default FormBox;
