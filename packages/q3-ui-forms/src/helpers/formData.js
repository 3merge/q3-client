import { object } from 'q3-ui-helpers';
import { invoke, last } from 'lodash';

export default (fn) => (values, attachments) => {
  const formData = new FormData();

  const iterateEntries = (data, methodName, customizer) =>
    object.hasKeys(data)
      ? Object.entries(data).forEach(([name, value]) => {
          invoke(
            formData,
            methodName,
            ...(customizer
              ? customizer(name, value)
              : [name, value]),
          );
        })
      : null;

  iterateEntries(values, 'set');

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
