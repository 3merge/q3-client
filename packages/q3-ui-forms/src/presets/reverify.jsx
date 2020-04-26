import React from 'react';
import PropTypes from 'prop-types';
import Email from './email';
import { handleSubmitWrapper } from './utils';

const Reverify = ({ children, ...rest }) => (
  <Email {...rest}>{children}</Email>
);

Reverify.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

Reverify.defaultProps = {
  children: null,
  onSubmit: handleSubmitWrapper('/reverify', {
    onSuccessStatus: 'reverificationSuccess',
    onErrorStatus: 'reverificationFailed',
    navigateTo: '/verify',
  }),
};

export default Reverify;
