import QueryString from './QueryStringMatcher';

const root =
  'paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&page=3&credit.hasBeenApproved=exists%28false%29&status=Open&sort=-seq';

describe('QueryString', () => {
  it('should normalize all parameters', () => {
    const q = new QueryString(
      '?foo&sort=seq',
      '/bar&page=2',
    );

    expect(q.current).toEqual(['foo']);
    expect(q.next).toEqual(['bar']);
  });

  it('should count how many matches occur', () => {
    const q = new QueryString(
      root,
      'paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&status=Open',
    );

    expect(q.countIn(q.next)).toBe(2);
  });

  it('should return the "most" active', () => {
    const q = new QueryString(
      root,
      'paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail',
      [
        'paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&status=Open&credit.hasBeenApproved=exists%28false%29',
      ],
    );

    expect(q.isActive()).toBeFalsy();
  });

  it('should return completely active', () => {
    const q = new QueryString(
      'paymentOption=Banking&shippingOption=Pickup&fee=10',
      'paymentOption=Banking&shippingOption=Pickup&fee=0',
      ['paymentOption=Banking&shippingOption=Pickup&fee=1'],
    );

    expect(q.isActive()).toBeFalsy();
  });

  it('should match default', () => {
    const q = new QueryString(
      'paymentOption=Something',
      'active=true',
      ['paymentOption=Banking'],
    );

    expect(q.isActive()).toBeTruthy();
  });

  it('should match in excess', () => {
    const q = new QueryString(
      'paymentOption=Something',
      'paymentOption=Something',
      ['paymentOption=Something&search=Foo'],
    );

    expect(q.isActive()).toBeTruthy();
  });
});

// SAMPLE SEGMENTS FROM OTHER APPS

const quotes = 'status=Quote';
const review = 'status=Under%20Review';
const open = 'status=Open';
const confirmed =
  'status=in(Open%2CBeing%20Prepared%2CPaid%2CPartially%20Completed%2CBackordered%2CReady%20for%20Pickup%2CPartially%20Completed%20without%20Balance%2CCompleted%2CDeclined)';
const credit =
  'paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&credit.hasBeenApproved=exists(false)&status=Open%2CPartially%20Completed';
const exportable = 'isExportable=true&exportedOn=null';
const warehouse =
  'status=Open%2CBeing%20Prepared%2CPaid%2CPartially%20Completed%2CBackordered%2CReady%20for%20Pickup%2CPartially%20Completed%20without%20Balance&credit.hasBeenApproved=exists(true)&exportedOn=has(true)';

test.each([
  [quotes, quotes],
  [review, review],
  [open, open],
  [confirmed, confirmed],
  [credit, credit],
  [exportable, exportable],
  [warehouse, warehouse],
  [quotes, quotes],
  ['status=Quote&search=foo', quotes],
  [
    'status=Quote&search=foo',
    'status=Quote&search=foo',
    [
      'status=Quote&search=foo',
      'status=Quote&search=foo&partial=true',
    ],
  ],
  ['status=Under%20Review&total=10', review],
  [
    'status=in(Open%2CBeing%20Prepared%2CPaid%2CPartially%20Completed%2CBackordered%2CReady%20for%20Pickup%2CPartially%20Completed%20without%20Balance%2CCompleted%2CDeclined)&isExportable=true',
    confirmed,
  ],
])('.isActive(%s, %s)', (a, b, c = []) => {
  const q = new QueryString(a, b, [
    quotes,
    review,
    open,
    confirmed,
    credit,
    exportable,
    warehouse,
    ...c,
  ]);

  expect(q.isActive()).toBeTruthy();
});

test.each([
  [quotes, review],
  [
    'status=Quote&search=foo',
    'status=Quote',
    [
      'status=Quote&search=foo',
      'status=Quote&search=foo&partial=true',
    ],
  ],
])('.isActive(%s, %s)', (a, b, c = []) => {
  const q = new QueryString(a, b, [
    quotes,
    review,
    open,
    confirmed,
    credit,
    exportable,
    warehouse,
    ...c,
  ]);

  expect(q.isActive()).toBeFalsy();
});
