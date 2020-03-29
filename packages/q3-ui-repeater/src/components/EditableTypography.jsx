import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { useToggle } from 'useful-state';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import IconButton from 'q3-ui/lib/iconButton';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import { object } from 'q3-ui-helpers';
import RepeaterState from './state';
import useStyle from './useStyle';

const { hasKeys } = object;

//= ===============================================================================
// Partials
//= ===============================================================================

const EditableTypographyTextField = ({
  onClose,
  fieldProps,
  onSave,
  initialValues,
}) => (
  <Form
    enableSubmit={false}
    initialValues={initialValues}
    onSubmit={onSave}
  >
    <Field autoFocus {...fieldProps} />
    <IconButton
      icon={Check}
      label="save"
      buttonProps={{ type: 'submit', size: 'small' }}
    />
    <IconButton
      icon={Close}
      label="close"
      buttonProps={{ onClick: onClose, size: 'small' }}
    />
  </Form>
);

EditableTypographyTextField.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

//= ===============================================================================
// Component
//= ===============================================================================

const EditableTypography = ({
  data,
  children,
  editable,
  name,
  ...rest
}) => {
  const {
    block,
    editableContent,
    editableIcon,
  } = useStyle();

  const { state, open, close } = useToggle();
  const repeater = React.useContext(RepeaterState);
  const prefixedName = `${repeater.name}.${name}`;

  const isEditable =
    typeof repeater.edit === 'function' &&
    invoke(repeater, 'auth.canEditSub', prefixedName) &&
    hasKeys(editable);

  const onSave = (...params) =>
    repeater
      .edit(data.id)(...params)
      .then(() => {
        close();
      });

  if (
    !invoke(repeater, 'auth.canSeeSub', prefixedName) ||
    !children
  )
    return '--';

  if (isEditable && typeof editable.renderer === 'function')
    return editable.renderer(data, onSave);

  if (state)
    return (
      <EditableTypographyTextField
        fieldProps={editable}
        initialValues={data}
        className={block}
        onSave={onSave}
        onClose={close}
      />
    );

  return (
    <Typography
      {...{
        ...(isEditable
          ? {
              className: editableContent,
              onClick: open,
              onKeyPress: open,
              tabIndex: 0,
              style: {
                cursor: 'pointer',
              },
            }
          : {
              style: {
                cursor: 'not-allowed',
              },
            }),
        ...rest,
      }}
    >
      {children}
      {isEditable && <Edit className={editableIcon} />}
    </Typography>
  );
};

EditableTypography.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  editable: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    renderer: PropTypes.func,
  }),
  name: PropTypes.string.isRequired,
};

EditableTypography.defaultProps = {
  children: '',
  editable: null,
};

export default EditableTypography;
