import React from 'react';
import { ModeContext } from 'q3-ui/lib/Mode';
import { AuthContext } from 'q3-ui-permissions';

export const DARK = 'dark';
export const LIGHT = 'light';

const useProfileTheme = () => {
  const { setType } = React.useContext(ModeContext);
  const type =
    React.useContext(AuthContext)?.state?.profile?.theme ||
    LIGHT;

  React.useEffect(() => {
    setType(type);
  }, [type]);
};

export default useProfileTheme;
