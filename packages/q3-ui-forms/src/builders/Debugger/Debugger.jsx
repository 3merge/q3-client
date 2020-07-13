import React from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import { BuilderState } from '../../FormsContext';

const Debugger = ({ children, show }) => {
  const { values, errors } = React.useContext(BuilderState);

  return show ? (
    <JSONPretty data={{ values, errors }}>
      {children && children(values, errors)}
    </JSONPretty>
  ) : null;
};

Debugger.defaultProps = {
  children: null,
  show: false,
};

Debugger.propTypes = {
  children: PropTypes.func,
  show: PropTypes.bool,
};

export default Debugger;
