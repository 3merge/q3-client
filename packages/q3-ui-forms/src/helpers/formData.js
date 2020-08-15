import { object } from 'q3-ui-helpers';
import { invoke } from 'lodash';
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
          safe: true,
        }),
      ),
      'set',
    );

  if (object.hasKeys(attachments))
    iterateEntries(attachments, 'append', (name, item) => {
      return item.$locals && item.$locals.folder
        ? [
            `${item.$locals.folder}/${item.name}`,
            item,
            item.name,
          ]
        : [item.name, item, item.name];
    });

  fn(formData);
};
