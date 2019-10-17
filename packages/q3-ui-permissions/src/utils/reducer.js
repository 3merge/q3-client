import Axios from 'axios';
import Cookies from 'js-cookie';
import { useFormHandler } from 'q3-ui-forms';
import { NONCE, TOKEN } from './constants';

const INIT = 'AUTHENTICATING';
const { onStart, onComplete } = useFormHandler();

export default (state, action) => {
  const { type, data } = action;
  switch (type) {
    case INIT:
      return {
        init: true,
        ...data,
      };
    default:
      throw new Error('Unknown reducer');
  }
};

export const destroySession = () => {
  Cookies.remove(TOKEN);
  Cookies.remove(NONCE);
};

export const setSession = ({ token, nonce }) => {
  Cookies.set(TOKEN, token);
  Cookies.set(NONCE, nonce);
};

export const getSession = (dispatch) =>
  Axios.get('/profile')
    .then(({ data }) => {
      const { profile, permissions } = data;
      dispatch({
        type: INIT,
        data: {
          profile,
          permissions,
        },
      });
    })
    .catch(() =>
      dispatch({
        type: INIT,
        data: null,
      }),
    );

export const validateAccountEmail = (
  values = {},
  actions,
) => {
  onStart(actions);
  return Axios.get(`/authenticate?email=${values.email}`)
    .then(() => {
      onComplete(null, actions);
      return values.email;
    })
    .catch((err) => {
      onComplete(err, actions);
      return null;
    });
};

export const authenticate = (values, actions) => {
  onStart(actions);
  return Axios.post('/authenticate', values)
    .then(({ data }) => {
      const { token, nonce } = data;
      Cookies.set(TOKEN, token);
      Cookies.set(NONCE, nonce);
      window.location.replace('/');
      return null;
    })
    .catch((err) => {
      onComplete(err, actions);
      throw err.data;
    });
};

export const resetPassword = (values, actions) => {
  onStart(actions);

  return Axios.post('/password-reset', values)
    .then(({ data }) => {
      window.location.replace('/login?from=password-reset');
      return data;
    })
    .catch((err) => {
      onComplete(err, actions);
    });
};

export const verify = (values, actions) => {
  onStart(actions);
  return Axios.post('/password-reset', values)
    .then(() => {
      window.location.replace('/login?from=verify');
      onComplete(null, actions);
    })
    .catch((err) => {
      onComplete(err, actions);
    });
};

export const reverify = (values, actions) => {
  onStart(actions);
  return Axios.post('/reverify', values)
    .then(() => {
      window.location.replace('/verify?from=reverify');
      onComplete(null, actions);
    })
    .catch((err) => {
      onComplete(err, actions);
    });
};
