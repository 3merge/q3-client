import axios from 'axios';
import { last } from 'lodash';
import compress from 'browser-image-compression';

const getUrl = (xs) => last(xs?.data?.uploads)?.url;

const makeFormData = async (f) => {
  let data = f?.src?.file;
  if (!data) throw new Error('no file');

  const formData = new FormData();
  try {
    data = await compress(data, {
      maxSizeMB: 4.5,
      useWebWorker: true,
      maxWidthOrHeight: 1920,
    });
  } catch (e) {
    // noop
  }

  formData.append(`media/${f.name}`, data);
  return formData;
};

export default (rootPath) => (f) =>
  makeFormData(f)
    .then((data) =>
      axios.post(`${rootPath}/uploads`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    )
    .then(getUrl)
    .catch((e) => {
      throw e;
    });
