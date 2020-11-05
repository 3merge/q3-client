import React from 'react';
import { navigate } from '@reach/router';
import {
  AuthContext,
  destroySession,
} from 'q3-ui-permissions';
import { object } from 'q3-ui-helpers';

// eslint-disable-next-line no-sequences
const redirect = (path) => (navigate(path), true);

const useGatekeeper = (props) => {
  const Auth = React.useContext(AuthContext);

  if (!Auth.state.init) return true;

  if (props.redirectPathOnPublic && !Auth.state.profile) {
    return redirect(props.redirectPathOnPublic);
  }

  if (Auth.state.profile && props.redirectPathOnSession) {
    return redirect(props.redirectPathOnSession);
  }

  const redirectStr = object.invokeSafely(
    props.redirectCheck,
    Auth.state.profile,
  );

  if (typeof redirectStr === 'string') {
    destroySession(redirectStr);
    return true;
  }

  return false;
};

export default useGatekeeper;
