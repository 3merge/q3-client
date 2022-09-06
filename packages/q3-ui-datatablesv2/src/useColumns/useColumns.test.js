import useColumns from './useColumns';

const stub = {
  firstName: 'Jane',
  lastName: 'Doe',
  age: 20,
};

test.each([
  [
    {
      visible: true,
      field: 'firstName,lastName',
      format: 'object',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
    },
  ],
  [
    {
      visible: true,
      field: 'lastName,age',
      format: 'array',
    },
    ['Doe', 20],
  ],
  [
    {
      visible: true,
      field: 'firstName',
    },
    'Jane',
  ],
  [
    {
      visible: true,
      field: 'firstName',
      format: 'somethingelse',
    },
    '',
  ],
])('useColumns (%o)', (column, expected) => {
  expect(useColumns([column])[0].getValue(stub)).toEqual(
    expected,
  );
});
