import React from 'react';
import PropTypes from 'prop-types';
import { useChecked } from 'useful-state';
import State from './State';

export { State };

const ContextWrapper = ({ children, deps }) => {
  const v = useChecked();

  React.useEffect(() => {
    v.clear();
  }, deps);

  return (
    <State.Provider value={v}>{children}</State.Provider>
  );
};

ContextWrapper.defaultProps = {
  deps: [],
};

ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  deps: PropTypes.arrayOf(PropTypes.any),
};

export default ContextWrapper;
