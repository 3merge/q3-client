import debounce from 'debounce-promise';

export default null;

export const options = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
].map((value) => ({
  label: value,
  value,
}));

export const countries = [
  {
    value: 'CA',
    label: 'Canada',
    continent: 'North America',
  },
  {
    value: 'GB',
    label: 'England',
    continent: 'UK',
  },
  {
    value: 'US',
    label: 'United States',
    continent: 'North America',
  },
];

export const autocomplete = debounce((e) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        countries.filter((item) => {
          return e.split(' ').some((v) => {
            return (
              item.label.includes(v) ||
              item.continent.includes(v)
            );
          });
        }),
      );
    }, 200),
  );
}, 500);
