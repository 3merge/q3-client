import React from 'react';
import Breadcrumbs, {
  BreadcrumbLink,
  BreadcrumbText,
} from './Breadcrumbs';

let spy;

jest.mock('./styles', () => jest.fn().mockReturnValue({}));

beforeEach(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('Breadcrumbs', () => {
  it('should render resource name and collection link', () => {
    spy.mockReturnValue({
      directoryPath: '/test-collection/',
      id: 1,
      resourceName: 'tests',
    });

    const el = global.shallow(<Breadcrumbs />);

    expect(
      el.find(BreadcrumbLink).last().props(),
    ).toHaveProperty('to', '/test-collection/');

    expect(el.find(BreadcrumbText).props()).toHaveProperty(
      'text',
      'testsDetail',
    );
  });

  it('should render collection name', () => {
    spy.mockReturnValue({
      collectionName: 'test-collection',
    });

    const el = global.shallow(<Breadcrumbs />);

    expect(el.find(BreadcrumbLink).exists()).toBeFalsy();
    expect(el.find(BreadcrumbText).props()).toHaveProperty(
      'text',
      'test-collection',
    );
  });
});
