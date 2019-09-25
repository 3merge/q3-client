import Axios from 'axios';

export const getAutoComplete = (resource, labelProp) => (
  term,
) =>
  Axios.get(`${resource}?search=${term}`)
    .then(({ data }) =>
      data[resource].map((item) => ({
        ...item,
        value: item.id,
        label: item[labelProp],
      })),
    )
    .catch(() => []);

export const getFlat = (resource, labelProp, query) => () =>
  Axios.get(`${resource}${query}`)
    .then(({ data }) =>
      data[resource].map((item) => item[labelProp]),
    )
    .catch(() => []);
