import React from 'react';
import { navigate } from '@reach/router';
import {
  AuthContext,
  destroySession,
} from 'q3-ui-permissions';
import { object } from 'q3-ui-helpers';

const useGatekeeper = (props) => {
  const Auth = React.useContext(AuthContext);

  if (!Auth.state.init) return true;

  if (props.redirectPathOnPublic && !Auth.state.profile) {
    navigate(props.redirectPathOnPublic);
  }

  if (Auth.state.profile && props.redirectPathOnSession) {
    navigate(props.redirectPathOnSession);
  }

  const redirectStr = object.invokeSafely(
    props.redirectCheck,
    Auth.state.profile,
  );

  if (typeof redirectStr === 'string') {
    destroySession(redirectStr);
  }

  return false;
};

export default useGatekeeper;
