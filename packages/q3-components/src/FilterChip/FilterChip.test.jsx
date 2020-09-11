import { formatter, getOp, unwind } from './utils';

describe('FilterChip', () => {
  it('should replace', () => {
    expect(unwind('foo,bar,quuz', 'bar')).toMatch(
      'foo,quuz',
    );
  });

  it('should return IN', () => {
    expect(getOp('foo=one,two')).toMatch('IN');
  });

  it('should return NOT IN', () => {
    expect(getOp('foo!=one,two')).toMatch('NOT IN');
  });

  it('should return IS', () => {
    expect(getOp('foo=one')).toMatch('IS');
  });

  it('should return IS NOT', () => {
    expect(getOp('foo!=one')).toMatch('IS NOT');
  });

  describe('formatter', () => {
    it('should return sanitized key', () => {
      expect(formatter('foo><~bar')).toHaveProperty(
        'key',
        'foo.bar',
      );
    });

    it('should return sanitized key', () => {
      expect(
        // local offset
        formatter('2020-01-01T00:00:00.000Z'),
      ).toHaveProperty('value', '2019-12-31');
    });
  });
});
