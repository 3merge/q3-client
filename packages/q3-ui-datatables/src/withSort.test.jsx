import { getSortDirection } from './withSort';

describe('getSortDirection', () => {
  it('should return down if inactive', () => {
    expect(getSortDirection('bar', 'foo')).toMatchObject({
      active: false,
      direction: 'desc',
      value: 'foo',
    });
  });

  it('should return up when active', () => {
    expect(getSortDirection('-foo', 'foo')).toMatchObject({
      active: true,
      direction: 'asc',
      value: 'foo',
    });
  });

  it('should return down if active', () => {
    expect(getSortDirection('foo', 'foo')).toMatchObject({
      active: true,
      direction: 'desc',
      value: '-foo',
    });
  });
});
