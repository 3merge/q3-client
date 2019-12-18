import React from 'react';
import { Router } from '@reach/router';
import Collection from '../collection';

let wrapper;
const Page = () => null;
const Ignore = () => null;

jest.unmock('formik');

beforeAll(() => {
  wrapper = global
    .shallow(
      <Collection
        resourceName="foo"
        resourceSingularName="foo"
        collectionName="overwrite"
        useResourceName
      >
        <Page index />
        <Ignore />
      </Collection>,
    )
    .find(Router)
    .children();
});

describe('Collection', () => {
  it('should include only Page components plus a default 404', () =>
    expect(wrapper).toHaveLength(2));

  it('should pass props to each Page', () =>
    expect(wrapper.first().props()).toMatchObject({
      resourceName: 'foo',
      resourceSingularName: 'foo',
      collectionName: 'foo',
    }));
});
