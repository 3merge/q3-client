import decode from './decode';

test.each([
  ['', {}],
  ['foo=1', { foo: 1 }],
  [
    'status=true&payment=false',
    {
      status: true,
      payment: false,
    },
  ],
  [
    'complexArray=in(First%20Person%20(Shooter)%2CFirst%20Person%20(Adventure)%2C%22Puzzles%2C%20Mystery%2C%20and%20more%22)',
    {
      complexArray: [
        'First Person (Shooter)',
        'First Person (Adventure)',
        '"Puzzles, Mystery, and more"',
      ],
    },
  ],
])(
  '.decode(%s) should return %o',
  (queryString, expectObject) =>
    expect(decode(queryString)).toEqual(expectObject),
);
