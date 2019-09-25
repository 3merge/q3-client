import axios from 'axios';
import { get } from 'lodash';

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(get(error, 'response')),
);
