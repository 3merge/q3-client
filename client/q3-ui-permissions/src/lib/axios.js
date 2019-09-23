import Axios from 'axios';
import AuthenticationHeaders from '../utils/header';

Axios.interceptors.request.use((config) => {
  const cls = new AuthenticationHeaders(config);
  cls.headers = cls.tokens;
  return cls.config;
});

export const setDomain = (url) => {
  Axios.defaults.baseURL = url;
}