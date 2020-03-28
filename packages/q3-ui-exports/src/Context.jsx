import React from 'react';
import PropTypes from 'prop-types';
import { useChecked } from 'useful-state';

export const State = React.createContext();

const ContextWrapper = ({ children }) => (
  <State.Provider value={useChecked()}>
    {children}
  </State.Provider>
);

ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextWrapper;
