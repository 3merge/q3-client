import React from 'react';
import Provider from 'q3-ui';
import PropTypes from 'prop-types';
import FormProviders from 'q3-ui-forms';

const Wrapper = ({ children, ...rest }) => (
  <Provider {...rest}>
    <FormProviders preventDuplicate>
      {children}
    </FormProviders>
  </Provider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
};

export default Wrapper;
