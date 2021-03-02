import React from 'react';
import PropTypes from 'prop-types';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { red, grey } from '@material-ui/core/colors';
import Lock from '@material-ui/icons/Lock';
import TextBase from '../TextBase';
import withState from '../withState';

const renderAdornmentIcon = (
  type,
  isDisabled,
  hasError,
  icon,
) => {
  let El;

  if (isDisabled) El = Lock;
  if (type === 'email') El = AlternateEmailIcon;
  if (type === 'tel') El = PhoneIcon;
  if (type === 'postal') El = MarkunreadMailboxIcon;
  if (type === 'date') El = CalendarTodayIcon;
  if (icon) El = icon;

  if (hasError) El = ErrorOutlineIcon;

  return El ? (
    <InputAdornment position="end">
      <El
        style={{
          fontSize: '.911rem',
          color: hasError ? red[900] : grey[700],
        }}
      />
    </InputAdornment>
  ) : null;
};

export const Text = (deco) => {
  const { readOnly, disabled, type, icon, hideIcon } = deco;

  return (
    <TextBase
      {...deco}
      type={type}
      InputProps={{
        endAdornment: !hideIcon
          ? renderAdornmentIcon(
              type,
              disabled || readOnly,
              deco.error,
              icon,
            )
          : undefined,
      }}
    />
  );
};

Text.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
};

Text.defaultProps = {
  disabled: false,
  readOnly: false,
  type: 'text',
  icon: null,
};

export default withState(Text);
