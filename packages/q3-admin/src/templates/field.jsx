import React from 'react';
import PropTypes from 'prop-types';

const Field = () => React.createElement('span');

Field.propTypes = {
  include: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

Field.defaultProps = {
  include: '',
};

export default Field;
