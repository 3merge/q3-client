import React from 'react';
import { makeStyles } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextBase from '../TextBase';
import withState from '../withState';

const useStyles = makeStyles(() => ({
  icon: {
    cursor: 'pointer',
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

  return (
    <TextBase
      {...deco}
      inputRef={ref}
      ref={ref}
      type={type}
      InputProps={{
        endAdornment:
          type === PASSWORD ? (
            <Visibility
              onClick={handleType}
              className={cls.icon}
            />
          ) : (
            <VisibilityOff
              onClick={handleType}
              className={cls.icon}
            />
          ),
      }}
    />
  );
};

export default withState(Password);
