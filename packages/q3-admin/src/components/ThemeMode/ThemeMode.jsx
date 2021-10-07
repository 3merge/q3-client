import React from 'react';
import { ModeContext } from 'q3-ui/lib/Mode';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import IconButton from '@material-ui/core/IconButton';

const ThemeMode = () => {
  const { isLight, toggle } = React.useContext(ModeContext);

  return (
    <IconButton
      color="inherit"
      onClick={toggle}
      label="color mode"
    >
      {isLight ? (
        <Brightness4Icon />
      ) : (
        <BrightnessHighIcon />
      )}
    </IconButton>
  );
};

export default ThemeMode;
