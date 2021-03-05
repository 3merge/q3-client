import React from 'react';
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigationLinkWrapper, {
  getRelativePath,
} from './NavigationLinkWrapper';
import NavigationLink from '../NavigationLink';

const items = [
  { label: 'foo', to: 'foo', visible: true },
  { label: 'bar', to: 'bar', visible: false },
];

const renderNavigationLinkWrapper = (childrenItems) => {
  const source = createMemorySource('/foo');
  const history = createHistory(source);

  return global.mount(
    <LocationProvider history={history}>
      <NavigationLinkWrapper
        childrenItems={childrenItems}
        label="label"
      />
      ,
    </LocationProvider>,
  );
};

describe('NavigationLinkWrapper', () => {
  describe('"getRelativePath"', () => {
    it('should append asterisks', () => {
      expect(getRelativePath({ to: 'foo' })).toBe('foo/*');
    });

    it.each([[{}], [null]])(
      'should return as root path',
      (xs) => {
        expect(getRelativePath(xs)).toBe('/');
      },
    );
  });

  it('should define includesPartiallyCurrent as truthy if some items match location', () => {
    const {
      includesPartiallyCurrent,
    } = renderNavigationLinkWrapper(items)
      .find(NavigationLink)
      .props();
    expect(includesPartiallyCurrent).toBeTruthy();
  });

  it('should display icon if there are childrenItems', () => {
    const el = renderNavigationLinkWrapper(items).find(
      ExpandMoreIcon,
    );

    expect(el.exists()).toBeTruthy();
  });

  it('should not display icon without childrenItems', () => {
    const el = renderNavigationLinkWrapper([]).find(
      ExpandMoreIcon,
    );

    expect(el.exists()).toBeFalsy();
  });
});
