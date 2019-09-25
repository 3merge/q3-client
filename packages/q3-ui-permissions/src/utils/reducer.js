import Axios from 'axios';
import Cookies from 'js-cookie';
import { NONCE, TOKEN } from './constants';

const INIT = 'AUTHENTICATING';

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
  window.location.replace('/login');
};

export const authenticate = (values, actions) =>
  Axios.post('/authenticate', values)
    .then(({ data }) => {
      const { token, nonce } = data;
      Cookies.set(TOKEN, token);
      Cookies.set(NONCE, nonce);
      window.location.replace('/');
      return null;
    })
    .catch((err) => {
      return err;
    });

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
