import React from 'react';
import { destroySession } from 'q3-ui-permissions';

const Logout = () => {
  React.useEffect(() => {
    destroySession();
  }, []);

  return null;
};

export default Logout;
