import axios from 'axios';
import { last } from 'lodash';

const getLastAddedUrl = (xs) => last(xs?.uploads)?.url;

export default (rootPath) => (f) => {
  const formData = new FormData();
  const data = f?.src?.file;

  if (!data) return Promise.reject(new Error('no file'));

  formData.append(`media/${f.name}`, data);

  return axios
    .post(`${rootPath}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(getLastAddedUrl);
};
