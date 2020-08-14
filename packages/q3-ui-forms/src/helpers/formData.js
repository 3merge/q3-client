import { object } from 'q3-ui-helpers';
import { invoke, last } from 'lodash';
import flat from 'flat';

export default (fn) => (values, attachments) => {
  const formData = new FormData();

  const castToString = (data) =>
    Object.entries(data).reduce((acc, [name, value]) => {
      let v = value;

      if (Array.isArray(v))
        v = value.length ? value.map(JSON.stringify) : '';

      if (typeof v === 'object') v = JSON.stringify(value);

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
      if (!item.$locals) return [name, item];

      const ext = last(item.name.split('.'));
      const newFileName = `${item.$locals.saveAs}.${ext}`;

      return [
        `${item.$locals.relativePath}/${newFileName}`,
        item,
        newFileName,
      ];
    });

  fn(formData);
};
