import {
  filterbyColl,
  findByOp,
  isDefined,
  satisfiesOwnership,
  hasField,
} from '../helpers';

describe('Authentication helpers', () => {
  describe('filterbyColl', () => {
    it('should filter by coll property string', () =>
      expect(
        filterbyColl(
          [
            { id: 1, coll: 'foo' },
            { id: 1, coll: 'bar' },
            { id: 1, coll: 'bar' },
            { id: 2, coll: 'foo' },
          ],
          'foo',
        ),
      ).toHaveLength(2));
  });

  describe('findByOp', () => {
    it('should return first op', () =>
      expect(
        findByOp(
          [
            { id: 1, op: 'Create' },
            { id: 2, op: 'Read' },
          ],
          'Read',
        ),
      ).toMatchObject({
        id: 2,
        op: 'Read',
      }));

    it('should return undefined', () =>
      expect(
        findByOp(
          [
            { id: 1, op: 'Create' },
            { id: 2, op: 'Update' },
          ],
          'Read',
        ),
      ).toBeUndefined());

    it('should return null', () =>
      expect(findByOp([], 'Read')).toBeNull());
  });

  describe('isDefined', () => {
    it('should return truthy', () =>
      expect(isDefined('Hey!')).toBeTruthy());

    it('should return falsy', () =>
      expect(isDefined()).toBeFalsy());
  });

  describe('satisfiesOwnership', () => {
    it('should return truthy on matching IDs', () =>
      expect(
        satisfiesOwnership(
          { op: 'Read', ownership: 'Own' },
          '2123',
          '2123',
        ),
      ).toBeTruthy());

    it('should return truthy on ownership Any', () =>
      expect(
        satisfiesOwnership(
          { op: 'Read', ownership: 'Any' },
          '2354366',
          '2123',
        ),
      ).toBeTruthy());

    it('should return truthy on POST ops', () =>
      expect(
        satisfiesOwnership(
          { op: 'Create', ownership: 'Own' },
          '2342345',
          '2546123',
        ),
      ).toBeTruthy());

    it('should return falsy otherwise', () =>
      expect(
        satisfiesOwnership(
          { op: 'Delete', ownership: 'Own' },
          '2342345',
          '2546123',
        ),
      ).toBeFalsy());
  });

  describe('hasField', () => {
    it('should return truthy on micromatch', () =>
      expect(
        hasField({ fields: 'foo' }, 'foo'),
      ).toBeTruthy());

    it('should return truthy on wildcard', () =>
      expect(
        hasField({ fields: '*' }, 'foo'),
      ).toBeTruthy());

    it('should return falsy without micromatch', () =>
      expect(
        hasField({ fields: 'foo' }, 'bar'),
      ).toBeFalsy());

    it('should return falsy with negatve micromatch', () =>
      expect(
        hasField({ fields: '!foo' }, 'foo'),
      ).toBeFalsy());

    it('should return truthy on non-matching negatve micromatch', () =>
      expect(
        hasField({ fields: '!foo' }, 'bar'),
      ).toBeTruthy());

    it('should return truthy on multi-matching', () =>
      expect(
        hasField({ fields: ['*', '!foo', '!bar'] }, 'quuz'),
      ).toBeTruthy());

    it('should return falsy on multi-matching', () =>
      expect(
        hasField(
          { fields: ['{foo,quuz,bar}', '!bar'] },
          'bar',
        ),
      ).toBeFalsy());

    it('should run conditional rules', () =>
      expect(
        hasField(
          {
            fields: [
              'bar',
              {
                glob: 'bar',
                negate: true,
                test: ['foo=1'],
              },
            ],
          },
          'bar',
          {
            foo: 1,
          },
        ),
      ).toBeFalsy());
  });
});
