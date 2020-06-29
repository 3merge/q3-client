import React from 'react';
import PropTypes from 'prop-types';
import { get, debounce } from 'lodash';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneIcon from '@material-ui/icons/Phone';
import Fade from '@material-ui/core/Fade';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { red, grey } from '@material-ui/core/colors';
import Lock from '@material-ui/icons/Lock';
import { browser } from 'q3-ui-helpers';
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
    <Fade in>
      <InputAdornment position="end">
        <El
          style={{
            fontSize: '100%',
            color: hasError ? red[900] : grey[700],
          }}
        />
      </InputAdornment>
    </Fade>
  ) : null;
};

export const Text = (deco) => {
  const { readOnly, disabled, type, icon, hideIcon } = deco;

  const ref = React.useRef();
  const [showAdornment, setShowAdornment] = React.useState(
    false,
  );

  const debounceStateFn = debounce((nextState) => {
    setShowAdornment(nextState);
  }, 75);

  React.useEffect(() => {
    if (!browser.isBrowserReady() || !ref.current)
      return undefined;

    const resizeObserver = new ResizeObserver((entries) => {
      const w = get(entries, '0.target.clientWidth', 500);
      if (w < 359) {
        debounceStateFn(false);
      } else {
        debounceStateFn(true);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.unobserve(ref.current);
    };
  }, []);

  return (
    <TextBase
      {...deco}
      inputRef={ref}
      type={type}
      InputProps={{
        endAdornment:
          !hideIcon && showAdornment
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
  icon: PropTypes.node,
};

Text.defaultProps = {
  disabled: false,
  readOnly: false,
  type: 'text',
  icon: null,
};

export default withState(Text);
