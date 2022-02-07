import React from 'react';
import { ModeContext } from 'q3-ui/lib/Mode';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import ButtonWithIcon from '../ButtonWithIcon';

const ThemeMode = () => {
  const { isLight, toggle } = React.useContext(ModeContext);

  return (
    <ButtonWithIcon
      color="inherit"
      onClick={toggle}
      label="color mode"
      icon={isLight ? Brightness4Icon : BrightnessHighIcon}
    />
  );
};

export default ThemeMode;
