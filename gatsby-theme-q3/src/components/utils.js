import axios from 'axios';
import { setSession } from 'q3-ui-permissions';

export const authenticate = (credentials) =>
  axios
    .post('/authenticate', credentials)
    .then(({ data }) => {
      setSession(data);
      window.location.replace('/');
      return data;
    });
