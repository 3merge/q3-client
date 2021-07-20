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

  it('should match queries', () => {
    const q = new QueryString(
      root,
      '/?paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&credit.hasBeenApproved=exists%28false%29&status=Open',
    );

    expect(q.compare()).toBeTruthy();
  });

  it('should not match partial queries', () => {
    const q = new QueryString(
      root,
      '/?paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&status=Quote',
    );

    expect(q.compare()).toBeFalsy();
  });

  it('should count how many matches occur', () => {
    const q = new QueryString(
      root,
      'paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&status=Open',
    );

    expect(q.count(q.next)).toBe(2);
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

  it('should match default', () => {
    const q = new QueryString(
      'paymentOption=Something',
      'active=true',
      ['paymentOption=Banking'],
    );

    expect(q.isActive()).toBeTruthy();
  });
});
