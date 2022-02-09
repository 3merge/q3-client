import React from 'react';
import { ModeContext } from 'q3-ui/lib/Mode';
import { AuthContext } from 'q3-ui-permissions';

const useProfileTheme = () => {
  const { setType } = React.useContext(ModeContext);
  const type =
    React.useContext(AuthContext)?.state?.profile?.theme ||
    'light';

  React.useEffect(() => {
    setType(type);
  }, [type]);
};

export default useProfileTheme;
