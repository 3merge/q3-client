import React from 'react';
import classnames from 'class-names';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { string } from 'q3-ui-helpers';
import useStyle from './useStyle';
import { TYPOGRAPHY_CLASS } from './constants';

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

const EditableTypographyTrigger = ({
  children,
  isEditable,
  type,
  open,
  isOpen,
  innerStyle,
  ...rest
}) => {
  const { t } = useTranslation('labels');
  const { field, fieldIcon } = useStyle({
    isOpen,
    isEditable,
  });

  return (
    <Typography
      {...rest}
      {...makeEdittingProps(isEditable, {
        onClick: open,
        onKeyPress: open,
        tabIndex: 0,
      })}
      className={classnames(
        TYPOGRAPHY_CLASS,
        field,
        rest.className,
      )}
    >
      <span style={innerStyle}>
        {formatText(children, type, t) || '--'}
      </span>
      {isEditable ? <Edit className={fieldIcon} /> : null}
    </Typography>
  );
};

EditableTypographyTrigger.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  open: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  renderer: PropTypes.func,
  type: PropTypes.string,
};

EditableTypographyTrigger.defaultProps = {
  children: '',
  renderer: null,
  type: 'text',
};

export default EditableTypographyTrigger;
