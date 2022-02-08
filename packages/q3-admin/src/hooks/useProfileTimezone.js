import React from 'react';
import { useTimezoneInterceptor } from 'q3-ui-rest';
import { AuthContext } from 'q3-ui-permissions';

const useProfileTimezone = () =>
  useTimezoneInterceptor(
    React.useContext(AuthContext)?.state?.profile?.timezone,
  );

export default useProfileTimezone;
