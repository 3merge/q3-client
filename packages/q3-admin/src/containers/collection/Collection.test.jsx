import { getDirectoryPath } from './Collection';

describe('getDirectoryPath', () => {
  it('should return collection name', () => {
    expect(getDirectoryPath()).toEqual('/');
  });

  it('should return route', () => {
    expect(getDirectoryPath('test', '1')).toEqual('test');
  });
});
