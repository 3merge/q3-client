import getOptions from './getOptions';

export default getOptions;

const wrapAutoComplete = (char) => (...args) => (e) => {
  const [url, ...rest] = args;
  return getOptions(
    `${url}${e ? `${char}search=${e}` : ''}`,
    ...rest,
  );
};

export const getSafelyForAutoComplete = wrapAutoComplete(
  '?',
);

export const getSafelyForAutoCompleteWithProjection = wrapAutoComplete(
  '&',
);
