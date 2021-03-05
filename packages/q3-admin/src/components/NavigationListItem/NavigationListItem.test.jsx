import {
  filterByVisibility,
  shouldReturnNavigationLink,
} from './NavigationListItem';

describe('NavigationListItem', () => {
  describe('"filterByVisibility"', () => {
    it('should return truthy if there are nested menu items', () => {
      const xs = [
        { label: 'foo', nestedMenuItems: [1, 2, 3] },
      ];
      const res = filterByVisibility(xs);
      expect(res).toHaveLength(1);
      expect(res[0]).toHaveProperty('label', 'foo');
    });

    it('should return truthy if the item is visible', () => {
      const xs = [{ label: 'foo', visible: true }];
      const res = filterByVisibility(xs);
      expect(res).toHaveLength(1);
    });

    it('should return an empty array if the item is neither visible nor has menu items', () => {
      const xs = [
        { label: 'foo', visible: false },
        { label: 'bar', nestedMenuItems: [] },
      ];
      const res = filterByVisibility(xs);
      expect(res).toEqual([]);
    });
  });

  describe('"shouldReturnNavigationLink"', () => {
    it('should add shouldReturnNestedItems as truthy if there is a to attribute', () => {
      const items = [{ visible: true, to: '/foo' }];
      const res = shouldReturnNavigationLink(items);
      expect(res).toHaveLength(1);
    });

    it('should add shouldReturnNestedItems as truthy if there are nested menu items', () => {
      const items = [
        { nestedMenuItems: [1, 2, 3], to: '/foo' },
      ];
      const res = shouldReturnNavigationLink(items);
      expect(res).toHaveLength(1);
    });

    it('should add nodeId by to value', () => {
      const items = [
        { nestedMenuItems: [1, 2, 3], to: '/foo' },
      ];
      const res = shouldReturnNavigationLink(items);
      expect(res[0]).toHaveProperty('nodeId', '/foo');
    });

    it('should add nodeId by label value', () => {
      const items = [
        {
          label: 'bar',
          nestedMenuItems: [{ nestedMenuItems: [1, 2, 3] }],
        },
      ];
      const res = shouldReturnNavigationLink(items);
      expect(res[0]).toHaveProperty('nodeId', 'bar');
    });
  });
});
