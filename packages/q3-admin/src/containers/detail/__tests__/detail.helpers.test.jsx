import {
  filterByComparison,
  mapToTile,
  mapToPersistence,
} from '../helpers';

describe('Detail container', () => {
  describe('"filterByComparison"', () => {
    it('should filter by conditions not satisfied by state', () => {
      const a = [
        { props: { conditional: ['foo=bar'] } },
        { props: { conditional: ['foo=quuz'] } },
      ];
      const out = filterByComparison(a, { foo: 'bar' });
      expect(out).toHaveLength(1);
    });
  });

  describe('"mapToTile"', () => {
    it('should populate tile props', () => {
      const a = [{ props: { name: 'Test' } }];
      expect(mapToTile(a)[0]).toMatchObject({
        to: '/',
        label: 'test',
        component: expect.any(Function),
      });
    });
  });

  describe('"mapToPersistence"', () => {
    it('should flatten and assign id', () => {
      const a = [
        { props: { id: '1' } },
        [{ props: { id: '2' } }],
      ];
      const arr = mapToPersistence(a);
      expect(arr).toHaveLength(2);
      expect(arr[0].type).toHaveProperty(
        'name',
        'Persistence',
      );
    });
  });
});
