import React from 'react';
import PropTypes from 'prop-types';

const DisplayItem = () => React.createElement('span');

DisplayItem.propTypes = {
  include: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

DisplayItem.defaultProps = {
  include: '',
};

export default DisplayItem;
