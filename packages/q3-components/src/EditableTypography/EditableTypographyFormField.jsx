import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'q3-ui-forms/lib/builders';

export const isCheckbox = (type) => type === 'checkbox';

const EditableTypographyFormField = ({
  name,
  type,
  ...rest
}) => {
  const check = isCheckbox(type);

  return (
    <Field
      {...rest}
      autoFocus
      variant="standard"
      name={name}
      type={type}
      aria-labelledby={`#${name}`}
      suppressLabel={!check}
      label={check ? 'enabled' : ''}
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
