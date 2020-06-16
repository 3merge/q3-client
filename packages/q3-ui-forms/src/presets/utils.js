import axios from 'axios';
import { browser, object } from 'q3-ui-helpers';

export default null;

export const handleSubmitWrapper = (
  requestUrl,
  {
    onSuccessStatus,
    onErrorStatus,
    onDone,
    navigateTo,
    timeout,
  },
) => (values) =>
  axios
    .post(requestUrl, values)
    .then(({ data }) => {
      if (object.isFn(onDone)) {
        onDone(data);
      } else {
        if (timeout !== 0)
          Object.assign(data, {
            message: onSuccessStatus,
          });

        browser.redirectIn(navigateTo, timeout);
      }

      return data;
    })
    .catch((err) => {
      const error = new Error(err);
      error.message = onErrorStatus;
      return Promise.reject(error);
    });
