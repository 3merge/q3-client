import { findIndexByStartsWith } from '.';

describe('"findIndexByStartsWith"', () => {
  it('should return 0', () =>
    expect(
      findIndexByStartsWith({ Key: 'Value' }, 'No Match'),
    ).toBe(0));

  it('should return index + 1', () =>
    expect(
      findIndexByStartsWith(
        {
          Key: 'Value',
          AnotherKey: 'NoMatch',
          LastKey: 'role=public',
        },
        '?role=Public',
      ),
    ).toBe(3));

  it('should ignore encoded spaces', () =>
    expect(
      findIndexByStartsWith(
        {
          Key: 'Value',
          AnotherKey: 'NoMatch',
          LastKey: 'role=Public Person',
        },
        '?role=Public%20Person',
      ),
    ).toBe(3));
});
