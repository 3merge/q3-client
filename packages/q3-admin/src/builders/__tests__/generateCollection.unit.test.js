import { getCollectionInformation } from '../generateCollection';

describe('"getCollectionInformation"', () => {
  it('should use resourceName for collectionName', () => {
    expect(
      getCollectionInformation({
        resourceName: 'foos',
        resourceNameSingular: 'foo',
      }),
    ).toHaveProperty('collectionName', 'foos');
  });

  it('should use ignore resourceName if given a collectionName', () => {
    expect(
      getCollectionInformation({
        resourceName: 'foos',
        resourceNameSingular: 'foo',
        collectionName: 'bar',
      }),
    ).toHaveProperty('collectionName', 'bar');
  });
});
