import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const FiltersClear = (props) => (
  <Button {...props} onClick={() => navigate('?')}>
    Clear
  </Button>
);

FiltersClear.propTypes = {
  numberOfFiltersApplied: PropTypes.number.isRequired,
};

export default FiltersClear;
