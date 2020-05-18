import { getOp, unwind } from './FilterChip';

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
});
