import encode from './encode';

test.each([
  [
    {
      foo: 1,
    },
    'foo=1',
  ],
  [
    {
      'createdAt>': '2020-04-01',
      'createdAt<': '2020-04-6',
      'tags!': ['a', 'b', 'c'],
    },
    'createdAt%3E=2020-04-01T04:00:00.000Z&createdAt%3C=2020-04-6&tags!=in(a%2Cb%2Cc)',
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
