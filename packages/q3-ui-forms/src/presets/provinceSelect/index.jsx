import React from 'react';
import PropTypes from 'prop-types';
import { Field } from '../../builders';
import { asOptions } from '../../helpers';
import { PROVINCES } from '../northAmericaRegionalSelect';

const ProvinceSelect = ({ name, required }) => (
  <Field
    name={name}
    type="select"
    options={asOptions(PROVINCES)}
    required={required}
  />
);

ProvinceSelect.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
};

ProvinceSelect.defaultProps = {
  name: 'region',
  required: true,
};

export default ProvinceSelect;
