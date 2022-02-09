import React from 'react';
import Provider from 'q3-ui';
import PropTypes from 'prop-types';
import FormProviders from 'q3-ui-forms';
import useRunTime from './useRunTime';

const Wrapper = ({ children }) => (
  <Provider {...useRunTime()}>
    <FormProviders preventDuplicate>
      {children}
    </FormProviders>
  </Provider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
