import React from 'react';
import classnames from 'class-names';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import { string } from 'q3-ui-helpers';
import useStyle from './useStyle';
import { TYPOGRAPHY_CLASS } from './constants';

const defaultPlaceholder = '--';

export const makeEdittingProps = (isEditable, args) =>
  isEditable ? args : {};

export const removeFormatters = (args) =>
  omit(args, [
    'toDate',
    'toPrice',
    'trans',
    'toTruthy',
    'collectionName',
  ]);

export const formatText = (value, args, t) => {
  let formatted = value;

  if (args.type === 'number')
    formatted = string.toNumber(value, defaultPlaceholder);

  if (args.type === 'checkbox' || args.toTruthy)
    formatted = string.toTruthy(value, t);

  if (args.toDate || args.type === 'date')
    formatted = string.toDate(value, defaultPlaceholder);

  if (args.toPrice) formatted = string.toPrice(value);
  if (args.trans) formatted = t(value);
  if (!formatted) formatted = defaultPlaceholder;

  return formatted;
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

  const text =
    formatText(
      children,
      {
        ...rest,
        type,
      },
      t,
    ) || '--';
  const classes = classnames(
    TYPOGRAPHY_CLASS,
    field,
    rest.className,
  );

  return isEditable ? (
    <Button
      {...removeFormatters(rest)}
      className={classes}
      onClick={open}
    >
      {text}
      {isEditable ? <Edit className={fieldIcon} /> : null}
    </Button>
  ) : (
    <Typography
      {...removeFormatters(rest)}
      className={classes}
    >
      <span style={innerStyle}>{text}</span>
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
