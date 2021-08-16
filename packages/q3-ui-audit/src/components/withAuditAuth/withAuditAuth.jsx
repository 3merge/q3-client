import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Graphic from 'q3-ui-assets';

export default (Component) => (props) => {
  const auth = useAuth('audit');

  return auth.canSee ? (
    <Component {...props} />
  ) : (
    <Graphic icon="Signal" title="upgradeAccount" />
  );
};
