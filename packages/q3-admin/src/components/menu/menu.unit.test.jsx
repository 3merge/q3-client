import React from 'react';
import Menu from 'q3-ui/lib/menu';
import MenuWrapper from '.';

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
      .shallow(<MenuWrapper pages={[getPage()]} />)
      .find(Menu)
      .props();

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveProperty('visible', true);
    expect(items[0]).toHaveProperty('to', '/foo');
  });
});
