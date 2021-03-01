import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';

const NavigationList = ({ children }) => {
  return (
    <List style={{ padding: 0, height: '80%' }}>
      {children}
    </List>
  );
};

NavigationList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationList;
