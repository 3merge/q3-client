import { timezone } from 'q3-ui-locale';
import encode from './encode';

const d = new Date().toISOString();

jest.spyOn(timezone, 'toUtc').mockReturnValue('2021-01-01');

test.each([
  [
    {
      foo: 1,
    },
    'foo=1',
  ],
  [
    {
      foo: 'bar',
      quuz: 'exists(true)',
      thunk: d,
    },
    `foo=string(bar)&quuz=exists(true)&thunk=${d.replace(
      /:/g,
      '%3A',
    )}`,
  ],
  [
    {
      'createdAt>': '2020-04-01',
      'createdAt<': '2020-04-6',
      'tags!': ['a', 'b', 'c'],
    },
    'createdAt%3E=2021-01-01&createdAt%3C=2020-04-6&tags!=in(a%2Cb%2Cc)',
  ],
  [
    {
      'status*': true,
      '!payment*': true,
      'verified*': '',
    },
    'status&!payment',
  ],
  [
    {
      status: true,
      payment: false,
    },
    'status=true&payment=false',
  ],
  [
    {
      status: undefined,
      repeatBuyer: null,
      payment: '',
    },
    '',
  ],
  [
    {
      complexArray: [
        'First Person (Shooter)',
        'First Person (Adventure)',
        'Puzzles, Mystery, and more',
      ],
    },
    'complexArray=in(First%20Person%20(Shooter)%2CFirst%20Person%20(Adventure)%2C%22Puzzles%2C%20Mystery%2C%20and%20more%22)',
  ],
])(
  '.encode(%o) should return %s',
  (args, expectedQueryString) =>
    expect(encode(args)).toEqual(expectedQueryString),
);
