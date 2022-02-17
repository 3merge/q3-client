import React from 'react';
import PropTypes from 'prop-types';
import { State } from './Context';

const ActionBar = ({ data }) => {
  const { hasChecked, setChecked } =
    React.useContext(State);

  const len = hasChecked();

  React.useEffect(() => {
    if (len) setChecked([]);
  }, [data.length]);

  return null;
};

ActionBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

ActionBar.defaultProps = {
  data: [],
};

export default ActionBar;
