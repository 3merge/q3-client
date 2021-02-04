import { useLocation } from '@reach/router';
import useQueryParams from './useQueryParams';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

beforeAll(() => {
  localStorage.getItem.mockReturnValue('America/Toronto');
});

test.each([
  [
    {
      foo: 1,
    },
    '?foo=1',
  ],
  [
    {
      'createdAt>': '2020-04-01',
      'createdAt<': '2020-04-6',
      'tags!': ['a', 'b', 'c'],
    },
    '?createdAt%3E=2020-04-01T04:00:00.000Z&createdAt%3C=2020-04-6&tags!=in(a%2Cb%2Cc)',
  ],
  [
    {
      'status*': true,
      '!payment*': true,
      'verified*': '',
    },
    '?status&!payment',
  ],
  [
    {
      'status': true,
      'payment': false,
    },
    '?status=true&payment=false',
  ],
  [
    {
      'status': undefined,
      'repeatBuyer': null,
      'payment': '',
    },
    '?',
  ],
])('.encode(%i, %i)', (args, expectedQueryString) =>
  expect(useQueryParams().encode(args)).toEqual(
    expectedQueryString,
  ),
);
