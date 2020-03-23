import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import { useToggle, useValue } from 'useful-state';
import RepeaterState from './state';
import useStyle from './useStyle';

//= ===============================================================================
// Partials
//= ===============================================================================

const EditableTypographyTextField = ({
  value,
  className,
  onChange,
  onClick,
  onClose,
}) => (
  <TextField
    autoFocus
    value={value}
    className={className}
    onChange={onChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={onClick}>
            <Check />
          </IconButton>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
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

  const { value, onChange, setValue } = useValue(
    String(children || ''),
  );

  /**
   * Calling save will actually re-render the parent component.
   * So, close is somewhat unnecessary as the state will reset anyway.
   */
  const onClick = () =>
    save({
      ...data,
      [name]: value,
    }).then(() => {
      close();
    });

  /**
   * We have to force refresh the value state.
   */
  React.useEffect(() => {
    setValue(children);
  }, [children]);

  if (!canSee) return '--';

  return !state || !editable || !canEdit ? (
    <Typography
      {...rest}
      {...(editable && {
        className: editableContent,
        onClick: open,
        onKeyPress: open,
        tabIndex: 0,
      })}
      {...(!canEdit && {
        onClick: null,
        onFocus: null,
        style: {
          cursor: 'not-allowed',
        },
      })}
    >
      {children || '--'}
      {editable && <Edit className={editableIcon} />}
    </Typography>
  ) : (
    <EditableTypographyTextField
      value={value}
      className={block}
      onChange={onChange}
      onClick={onClick}
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
