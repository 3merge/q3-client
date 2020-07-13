import axios from 'axios';
import { navigate } from '@reach/router';
import { setSession } from 'q3-ui-permissions';

export const OP = '?op=success';

export const authenticate = (
  credentials,
  redirectPath = '/',
) =>
  axios
    .post('/authenticate', credentials)
    .then(({ data }) => {
      setSession(data);
      window.location.replace(redirectPath);
      return data;
    });

export const hasOp = (search) =>
  search && search.includes(OP);

export const toOp = (pathname) => () =>
  navigate(`${pathname}${OP}`);
