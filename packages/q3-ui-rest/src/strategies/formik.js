import { setWith } from 'lodash';

const extractMsg = (v) =>
  typeof v === 'object' ? v.msg : v;

const mapErrors = (errors) =>
  Object.entries(errors).reduce(
    (acc, [key, value]) =>
      setWith(acc, key, extractMsg(value)),
    {},
  );

export default () => ({
  onStart(actions = {}) {
    if ('setSubmitting' in actions) {
      actions.setSubmitting(true);
    }
  },

  onComplete(err, actions) {
    if (typeof actions === 'object') {
      actions.setSubmitting(false);

      if (!err || !err.errors) {
        actions.resetForm();
      } else {
        const { errors = [] } = err;
        actions.setErrors(mapErrors(errors));
        Object.assign(actions, {
          isTouched: true,
        });
      }
    }
  },
});
