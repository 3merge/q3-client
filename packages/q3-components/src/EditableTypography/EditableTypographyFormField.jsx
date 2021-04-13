import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'q3-ui-forms/lib/builders';
import { removeFormatters } from './EditableTypographyTrigger';

export const isCheckbox = (type) => type === 'checkbox';

const EditableTypographyFormField = ({
  name,
  type,
  ...rest
}) => {
  const check = isCheckbox(type);

  return (
    <Field
      {...removeFormatters(rest)}
      autoFocus
      name={name}
      type={type}
      aria-labelledby={`#${name}`}
      suppressLabel={!check}
      label={check ? 'enabled' : ''}
      xl={12}
      lg={12}
    />
  );
};

EditableTypographyFormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

EditableTypographyFormField.defaultProps = {
  type: 'text',
};

export default EditableTypographyFormField;
