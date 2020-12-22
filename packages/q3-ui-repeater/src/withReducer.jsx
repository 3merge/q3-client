import React from 'react';
import PropTypes from 'prop-types';
import { array } from 'q3-ui-helpers';

const haveLength = (...args) => args.every(array.hasLength);

const withReducer = (Component, [state, dispatch]) => {
  const Inner = ({ options, label, data }) => {
    const handleChange = (e) =>
      dispatch({ type: label, index: e.target.value });

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
