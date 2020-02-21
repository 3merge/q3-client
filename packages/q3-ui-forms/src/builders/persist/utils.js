const NAME = 'formik-persistence-';

const replaceName = (replacement) => (value) =>
  value.replace(NAME, replacement);

export const setPersistenceName = (id) => `${NAME}${id}`;

export const isPersistence = (value) =>
  value.startsWith(NAME);

export const idify = replaceName('#');
export const removePersistenceName = replaceName('');
