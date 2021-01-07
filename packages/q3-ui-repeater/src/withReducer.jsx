import React from 'react';
import PropTypes from 'prop-types';
import { haveLength } from './helper';

const withReducer = (Component, [state, dispatch]) => {
  const Inner = ({ options, label, data }) => {
    const handleChange = (e) =>
      dispatch({ type: label, payload: e.target.value });

    return (
      haveLength(options, data) && (
        <Component
          options={options}
          label={label}
          handleChange={handleChange}
          value={state[label]}
        />
      )
    );
  };

  Inner.defaultProps = {
    options: [],
  };

  Inner.propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        fn: PropTypes.func,
      }),
    ),
    label: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return Inner;
};

export default withReducer;
