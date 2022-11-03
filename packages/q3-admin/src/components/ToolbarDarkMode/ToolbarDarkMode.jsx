import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import ButtonWithIcon from '../ButtonWithIcon';
import useProfileThemeForm from '../../hooks/useProfileThemeForm';

const ToolbarDarkMode = () => {
  const { change, themeNext, isLight } =
    useProfileThemeForm();
  const Icon = React.useMemo(
    () => (isLight ? Brightness2Icon : Brightness5Icon),
    [isLight],
  );

  return (
    <Hidden mdDown>
      <ButtonWithIcon
        icon={Icon}
        label={`${themeNext}Mode`}
        onClick={change}
      />
    </Hidden>
  );
};

export default ToolbarDarkMode;
