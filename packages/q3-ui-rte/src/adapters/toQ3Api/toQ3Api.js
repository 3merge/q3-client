import axios from 'axios';
import { last } from 'lodash';

const getUrl = (xs) => last(xs?.data?.uploads)?.url;

const makeFormData = (f) => {
  const data = f?.src?.file;
  if (!data) return null;

  const formData = new FormData();
  formData.append(`media/${f.name}`, data);
  return formData;
};

export default (rootPath) => (f) => {
  const data = makeFormData(f);

  return data
    ? axios
        .post(`${rootPath}/uploads`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(getUrl)
    : Promise.reject(new Error('no file'));
};
