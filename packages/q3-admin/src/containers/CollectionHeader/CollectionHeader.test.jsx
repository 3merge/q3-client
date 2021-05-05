import React from 'react';
import Back from '../back';
import Search from '../../components/Search';
import CollectionHeader from './CollectionHeader';

const render = (props) =>
  global.shallow(
    <CollectionHeader collectionName="foo" {...props} />,
  );

const expectElementToExist = (props, El) =>
  expect(render(props).find(El).exists()).toBeTruthy();

const expectElementNotToExist = (props, El) =>
  expect(render(props).find(El).exists()).toBeFalsy();

describe('CollectionHeader', () => {
  it('should not render Back', () =>
    expectElementNotToExist({}, Back));

  it('should render Back', () =>
    expectElementToExist({ id: '1' }, Back));

  it('should render Search', () =>
    expectElementToExist({}, Search));

  it('should not render Back', () =>
    expectElementNotToExist(
      { disableSearch: true },
      Search,
    ));
});
