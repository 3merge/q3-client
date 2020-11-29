import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';

const OPS = {
  '=': 'equals',
  '<': 'greaterThan',
  '>': 'lessThan',
};

const FiltersBuilder = ({ fields }) => {
  const sizing = {
    lg: 4,
    xl: 4,
    md: 4,
    sm: 12,
  };

  return (
    <Builders.Form submitLabel="apply">
      <Builders.Repeater group="rule">
        <Builders.Field
          name="field"
          type="select"
          options={fields}
          {...sizing}
        />
        <Builders.Field
          options={Object.entries(OPS).map(
            ([key, value]) => ({
              value,
              label: key,
            }),
          )}
          name="condition"
          type="select"
          {...sizing}
        />
        <Builders.Field
          conditional={['condition=equals']}
          name="criteria"
          type="text"
          {...sizing}
        />
      </Builders.Repeater>
    </Builders.Form>
  );
};

FiltersBuilder.defaultProps = {
  fields: [],
};

FiltersBuilder.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string),
};

export default FiltersBuilder;
