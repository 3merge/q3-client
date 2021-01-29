import React from 'react';
import PropTypes from 'prop-types';
import EditableTypographyFormField from './EditableTypographyFormField';
import InlineEditor from '../InlineEditor';
import EditableTypographyTrigger from './EditableTypographyTrigger';

const EditableTypography = ({
  children,
  onSubmit,
  isEditable,
  renderer,
  initialValues,
  fieldProps,
  ...rest
}) => {
  if (isEditable && typeof renderer === 'function')
    return renderer(initialValues, onSubmit);

  return (
    <InlineEditor
      {...rest}
      title={fieldProps.label || fieldProps.name}
      initialValues={initialValues}
      onSubmit={onSubmit}
      buttonComponent={(open, isOpen) => (
        <EditableTypographyTrigger
          isOpen={isOpen}
          open={open}
          isEditable={isEditable}
          {...fieldProps}
          {...rest}
        >
          {children}
        </EditableTypographyTrigger>
      )}
    >
      <EditableTypographyFormField {...fieldProps} />
    </InlineEditor>
  );
};

EditableTypography.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onSubmit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  renderer: PropTypes.func,
  initialValues: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({
    text: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

EditableTypography.defaultProps = {
  children: '',
  renderer: null,
};

export default EditableTypography;
