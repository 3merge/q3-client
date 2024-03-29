import { object } from 'q3-ui-helpers';
import { invoke, last } from 'lodash';
import flat from 'flat';

export default (fn) => (values, attachments) => {
  const formData = new FormData();

  const castToString = (data) =>
    Object.entries(data).reduce((acc, [name, value]) => {
      const v =
        typeof value === 'object'
          ? JSON.stringify(value)
          : value;

      Object.assign(acc, {
        [name]: v,
      });

      return acc;
    }, {});

  const iterateEntries = (data, methodName, customizer) =>
    Object.entries(data).forEach(([name, value]) => {
      invoke(
        formData,
        methodName,
        ...(customizer
          ? customizer(name, value)
          : [name, value]),
      );
    });

  if (object.hasKeys(values))
    iterateEntries(
      castToString(
        flat(values, {
          safe: false,
        }),
      ),
      'set',
    );

  if (object.hasKeys(attachments))
    iterateEntries(attachments, 'append', (name, item) =>
      item.$locals && item.$locals.saveAs
        ? [
            item.name,
            item,
            // keep the extension
            `${item.$locals.saveAs}.${last(
              item.name.split('.'),
            )}`,
          ]
        : [item.name, item, item.name],
    );

  return fn(formData);
};
