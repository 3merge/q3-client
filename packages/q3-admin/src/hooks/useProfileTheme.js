import React from 'react';
import { ModeContext } from 'q3-ui/lib/Mode';
import { AuthContext } from 'q3-ui-permissions';

const useProfileTheme = () => {
  const type =
    React.useContext(AuthContext)?.state?.profile?.theme ||
    'light';

  const { setType } = React.useContext(ModeContext);

  React.useEffect(() => {
    setType(type);
  }, [type]);
};

export default useProfileTheme;
