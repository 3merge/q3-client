import useHelperFormats from '../useHelperFormats';

// eslint-disable-next-line
import 'q3-ui-test-utils/lib/localeUtils';

test.each([
  [{ num: 2300 }, 'num', 'price', '$2,300.00'],
  [
    { friends: ['Rick', 'Morty'] },
    'friends',
    'comma',
    'Rick, Morty',
  ],
  [{ friends: null }, 'friends', 'comma', ''],
  [
    { firstName: 'John', lastName: 'Doe' },
    undefined,
    'fullname',
    'John Doe',
  ],
  [
    {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
    'user',
    'fullname',
    'John Doe',
  ],
  [
    {
      foo: 1,
    },
    'doesntmatter',
    (_, { foo }) => foo,
    1,
  ],
])(
  '.useHelperFormats()',
  (data, fieldName, formatter, expectedValue) => {
    expect(
      useHelperFormats(data)(fieldName, formatter),
    ).toBe(expectedValue);
  },
);
