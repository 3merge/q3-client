import React from 'react';
import { Location } from '@reach/router';
import Menu, { ActivePageDetector } from '.';
import MenuSwitcher from './switcher';

const getPage = (args) => ({
  index: true,
  collectionName: 'foo',
  resourceName: 'foo',
  ...args,
});

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    canSee: true,
  }),
}));

jest.mock('@reach/router', () => ({
  Location: ({ children }) =>
    children({
      location: {
        pathname: '/foo',
      },
    }),
}));

describe('Menu', () => {
  it('should return empty component without pages', () => {
    const el = global.shallow(
      <Menu title="withoutPages" pages={[]} />,
    );
    expect(el).toMatchObject({});
  });

  it('should append visibility attribute to all links', () => {
    const { items } = global
      .shallow(
        <Menu title="withPages" pages={[getPage()]} />,
      )
      .find(ActivePageDetector)
      .props();

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveProperty('visible', true);
    expect(items[0]).toHaveProperty('to', '/foo');
  });

  it('should set an activePage', () => {
    const { activePage } = global
      .shallow(
        <ActivePageDetector
          title="withPages"
          items={[getPage({ to: '/foo' })]}
        />,
      )
      .find(Location)
      .dive()
      .find(MenuSwitcher)
      .props();

    expect(activePage).toHaveProperty(
      'collectionName',
      'foo',
    );
  });
});
