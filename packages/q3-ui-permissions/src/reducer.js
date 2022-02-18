import Axios from 'axios';
import Cookies from 'js-cookie';
import {
  NONCE,
  TOKEN,
  INIT,
  RESET,
  UPDATE,
} from './utils/constants';

const removeLocalStorageExceptQ3 = () => {
  // eslint-disable-next-line consistent-return
  Object.keys(localStorage).forEach((key) => {
    if (!key.includes('q3'))
      return localStorage.removeItem(key);
  });
};

export const destroySession = (location = '/') => {
  Cookies.remove(TOKEN);
  Cookies.remove(NONCE);
  removeLocalStorageExceptQ3();

  window.location.replace(location);
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
    .catch(() => {
      // otherwise it keeps trying
      Cookies.remove(TOKEN);
      Cookies.remove(NONCE);

      dispatch({
        type: INIT,
        data: null,
      });
    });

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
