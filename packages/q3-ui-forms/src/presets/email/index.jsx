import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from '../../builders';

const Email = ({ children, ...rest }) => (
  <Form initialValues={{ email: '' }} {...rest}>
    <Field
      name="email"
      type="email"
      required
      xl={12}
      lg={12}
    />
    {children}
  </Form>
);

Email.propTypes = {
  children: PropTypes.node,
};

Email.defaultProps = {
  children: null,
};

export default Email;
