import React from 'react';
import classnames from 'class-names';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { useToggle } from 'useful-state';
import { string } from 'q3-ui-helpers';
import useStyle from './useStyle';
import EditableTypographyFormField from './EditableTypographyFormField';

const defaultPlaceholder = '--';

export const makeEdittingProps = (isEditable, args) =>
  isEditable ? args : {};

export const formatText = (value, type, trans) => {
  switch (type) {
    case 'number':
      return string.toNumber(value, defaultPlaceholder);
    case 'checkbox':
      return string.toTruthy(value, trans);
    case 'date':
      return string.toDate(value, defaultPlaceholder);
    default:
      return value;
  }
};

const EditableTypography = ({
  children,
  onSubmit,
  isEditable,
  renderer,
  initialValues,
  fieldProps,
  data,
  ...rest
}) => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const { state, open, close } = useToggle();
  const { field, fieldIcon } = useStyle({
    isOpen: state,
    isEditable,
  });

  if (isEditable && typeof renderer === 'function')
    return renderer(initialValues, data, onSubmit);

  return (
    <span ref={ref}>
      <Typography
        {...rest}
        {...makeEdittingProps(isEditable, {
          onClick: open,
          onKeyPress: open,
          tabIndex: 0,
        })}
        role="switch"
        aria-checked={Boolean(open)}
        className={classnames(field, rest.className)}
      >
        {formatText(children, get(fieldProps, 'type'), t)}
        {isEditable && <Edit className={fieldIcon} />}
      </Typography>
      <Popover
        open={state}
        onClose={close}
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        elevation={15}
      >
        <EditableTypographyFormField
          fieldProps={fieldProps}
          initialValues={initialValues}
          onSave={onSubmit}
          onClose={close}
        />
      </Popover>
    </span>
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
  name: PropTypes.string.isRequired,

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
