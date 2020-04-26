import React from 'react';
import PropTypes from 'prop-types';
import Email from './email';
import { handleSubmitWrapper } from './utils';

const PasswordReset = ({ children, ...rest }) => (
  <Email {...rest}>{children}</Email>
);

PasswordReset.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

PasswordReset.defaultProps = {
  children: null,
  onSubmit: handleSubmitWrapper('/password-reset', {
    onSuccessStatus: 'passwordResetSuccess',
    onErrorStatus: 'passwordResetFail',
    navigateTo: '/login',
  }),
};

export default PasswordReset;
