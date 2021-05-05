import React from 'react';
import { Collection, getDirectoryPath } from './Collection';
import CollectionHeader from '../CollectionHeader';

const doesHeaderExist = (props) =>
  global
    .shallow(<Collection {...props} collectionName="foo" />)
    .find(CollectionHeader)
    .exists();

describe('Collection', () => {
  it('should render header', () => {
    expect(doesHeaderExist()).toBeTruthy();
  });

  it('should render header', () => {
    expect(
      doesHeaderExist({ disableHeader: true }),
    ).toBeFalsy();
  });
});

describe('getDirectoryPath', () => {
  it('should return collection name', () => {
    expect(getDirectoryPath()).toEqual('/');
  });

  it('should return route', () => {
    expect(getDirectoryPath('test', '1')).toEqual('test');
  });
});
