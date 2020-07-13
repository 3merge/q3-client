import Axios from 'axios';
import Cookies from 'js-cookie';
import {
  NONCE,
  TOKEN,
  INIT,
  RESET,
  UPDATE,
} from './utils/constants';

export const destroySession = () => {
  Cookies.remove(TOKEN);
  Cookies.remove(NONCE);
  localStorage.clear();
  window.location.replace('/');
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

export default (state, action) => {
  const { type, data } = action;
  switch (type) {
    case INIT:
      return { init: true, ...data };
    case RESET:
      return { init: false };
    case UPDATE:
      return { init: true, ...data };
    default:
      throw new Error('Unknown reducer');
  }
};
