import React from 'react';
import PropTypes from 'prop-types';
import FormBox from './FormBox';
import FormBoxContent from './FormBoxContent';

const FormBoxNotice = ({ children, ...rest }) => (
  <FormBox
    renderTop={<FormBoxContent {...rest} />}
    renderBottom={children}
  />
);

FormBoxNotice.defaultProps = {
  children: null,
};

FormBoxNotice.propTypes = {
  children: PropTypes.node,
};

export default FormBoxNotice;
