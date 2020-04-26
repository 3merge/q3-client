import axios from 'axios';
import { browser, object } from 'q3-ui-helpers';
import configFormHandler from '../providers/formik';

export default null;

const { onStart, onComplete } = configFormHandler('formik');

export const handleSubmitWrapper = (
  requestUrl,
  { onSuccessStatus, onErrorStatus, onDone, navigateTo },
) => (values, actions) => {
  onStart(actions);

  return axios
    .post(requestUrl, values)
    .then(({ data }) => {
      onComplete(null, actions);
      if (object.isFn(onDone)) {
        onDone(data);
      } else {
        actions.setStatus(`Success:${onSuccessStatus}`);
        browser.redirectIn(navigateTo);
      }

      return data;
    })
    .catch((err) => {
      onComplete(err, actions);
      actions.setStatus(`Error:${onErrorStatus}`);
      return null;
    });
};
