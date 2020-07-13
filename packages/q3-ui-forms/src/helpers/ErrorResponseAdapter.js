import { setWith } from 'lodash';
import { browser, object } from 'q3-ui-helpers';
import flat from 'flat';

const getFieldMessage = (v) => {
  let response = 'Server validation failed';

  if (!object.hasKeys(v)) {
    response = v;
  } else if (browser.isDefined(v.msg)) {
    response = v.msg;
  } else if (browser.isDefined(v.message)) {
    response = v.message;
  } else if (object.hasKeys(v.properties)) {
    response = v.properties.message;
  }

  return response;
};

const mapErrors = (errors) =>
  Object.entries(errors).reduce(
    (acc, [key, value]) =>
      setWith(acc, key, getFieldMessage(value)),
    {},
  );

export default (errorInstance) => {
  let payload = errorInstance;
  let errors = {};

  if (!payload) return [];
  if ('response' in payload) payload = payload.response;
  if ('data' in payload) payload = payload.data;
  if ('errors' in payload && object.hasKeys(payload.errors))
    errors = mapErrors(payload.errors);

  return [flat(errors), payload.message];
};
