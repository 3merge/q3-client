import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { connect } from 'formik';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { useToggle } from 'useful-state';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import RepeaterState from './state';
import useStyle from './useStyle';

//= ===============================================================================
// Partials
//= ===============================================================================

const AutoSaveField = connect(({ formik, ...rest }) => (
  <Field autoFocus {...rest} />
));

const EditableTypographyTextField = ({
  value,
  className,
  onChange,
  onClick,
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
    <AutoSaveField {...fieldProps} />
    <IconButton type="submit" size="small">
      <Check />
    </IconButton>
    <IconButton onClick={onClose}>
      <Close />
    </IconButton>
  </Form>
);

EditableTypographyTextField.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

//= ===============================================================================
// Component
//= ===============================================================================

const EditableTypography = ({
  data,
  children,
  editable,
  save,
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
    typeof editable === 'object' &&
    Object.keys(editable).length > 0;

  const canSee = invoke(
    repeater,
    'auth.canSeeSub',
    prefixedName,
  );

  const canEdit = invoke(
    repeater,
    'auth.canEditSub',
    prefixedName,
  );

  /**
   * Calling save will actually re-render the parent component.
   * So, close is somewhat unnecessary as the state will reset anyway.
   */
  const onSave = (...params) =>
    save(...params).then(() => {
      close();
    });

  /**
   * We have to force refresh the value state.
   */
  React.useEffect(() => {
    // setValue(children);
  }, [children]);

  if (!canSee) return '--';

  return !state || !isEditable || !canEdit ? (
    <Typography
      {...(isEditable && {
        className: editableContent,
        onClick: open,
        onKeyPress: open,
        tabIndex: 0,
        style: {
          cursor: 'pointer',
        },
      })}
      {...(!canEdit && {
        onClick: null,
        onFocus: null,
        style: {
          cursor: 'not-allowed',
        },
      })}
      {...rest}
    >
      {children || '--'}
      {isEditable && <Edit className={editableIcon} />}
    </Typography>
  ) : (
    <EditableTypographyTextField
      fieldProps={editable}
      initialValues={data}
      className={block}
      onSave={onSave}
      onClose={close}
    />
  );
};

EditableTypography.propTypes = {
  data: PropTypes.shape({}).isRequired,
  children: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default EditableTypography;
