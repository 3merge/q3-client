import React from 'react';
import { Grid } from '@material-ui/core';
import { array } from 'q3-ui-helpers';

const haveLength = (...args) => args.every(array.hasLength);

const withReducer = (Component, [state, dispatch]) => {
  const Inner = ({ options, label, data }) => {
    const handleChange = (e) =>
      dispatch({ type: label, index: e.target.value });

    return (
      haveLength(options) && (
        <Grid item>
          <Component
            options={options}
            label={label}
            handleChange={handleChange}
            value={state[label]}
          />
        </Grid>
      )
    );
  };

  return Inner;
};

export default withReducer;
