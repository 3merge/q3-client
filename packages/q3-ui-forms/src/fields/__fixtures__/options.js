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
    value: 'US',
    label: 'United States',
    continent: 'North America',
  },
  {
    value: 'UK',
    label: 'United Kingdom',
    continent: 'North America',
  },
];

export const autocomplete = (e) =>
  new Promise((resolve) =>
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
