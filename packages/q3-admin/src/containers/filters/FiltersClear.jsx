import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const FiltersClear = (props) => (
  <Button
    {...props}
    onClick={() => navigate('?active')}
    style={{
      marginLeft: '.25rem',
      textDecoration: 'underline',
    }}
  >
    Clear
  </Button>
);

FiltersClear.propTypes = {
  numberOfFiltersApplied: PropTypes.number.isRequired,
};

export default FiltersClear;
