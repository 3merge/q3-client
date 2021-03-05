describe('NavigationListItem', () => {
  describe('"filterByVisibility"', () => {
    it.todo(
      'should return truthy if there are nested menu items',
    );
    it.todo('should return truthy if the item is visible');

    it.todo(
      'should return falsy if the item is neither visible nor has menu items',
    );
  });

  describe('"shouldReturnNavigationLink"', () => {
    it.todo(
      'should add shouldReturnNestedItems as truthy if there is a to attribute',
    );
    it.todo(
      'should add shouldReturnNestedItems as truthy if there are nested menu items',
    );

    it.todo('should add nodeId by to value');
    it.todo('should add nodeId by label value');
  });
});
