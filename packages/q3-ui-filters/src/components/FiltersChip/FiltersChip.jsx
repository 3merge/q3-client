import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import DropDown from '../DropDown';

const FiltersChip = ({ fields }) =>
  map(fields, (field) => (
    <DropDown name={field.name}>{field.component}</DropDown>
  ));

FiltersChip.defaultProps = {
  fields: [],
};

FiltersChip.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      component: PropTypes.node,
    }),
  ),
};

export default FiltersChip;
