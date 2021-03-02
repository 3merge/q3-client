import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextBase from '../TextBase';
import withState from '../withState';

const useStyles = makeStyles(() => ({
  icon: {
    cursor: 'pointer',
    fontSize: '.97rem',
  },
}));

export const PASSWORD = 'password';
export const TEXT = 'text';

export const Password = (deco) => {
  const [type, setType] = React.useState(PASSWORD);
  const cls = useStyles();

  const handleType = () =>
    setType((cur) => (cur === PASSWORD ? TEXT : PASSWORD));

  const ref = React.useRef();

  const renderButton = (Icon) => (
    <InputAdornment
      position="end"
      style={{ marginRight: -8 }}
    >
      <IconButton onClick={handleType} type="button">
        <Icon className={cls.icon} />
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextBase
      {...deco}
      inputRef={ref}
      ref={ref}
      type={type}
      InputProps={{
        endAdornment:
          type === PASSWORD
            ? renderButton(Visibility)
            : renderButton(VisibilityOff),
      }}
    />
  );
};

export default withState(Password);
