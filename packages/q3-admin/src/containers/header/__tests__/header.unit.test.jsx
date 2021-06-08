import React from 'react';
import HeaderUI from 'q3-ui/lib/header';
import Header from '..';
import Title from '../title';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (v) => v,
  }),
}));

jest.mock('q3-ui/lib/header', () => ({
  __esModule: true,
  default: () => null,
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    collectionName: 'component-parent',
    resourceName: 'parents',
    resourceNameSingular: 'parent',
    id: '1',
    data: { name: 'Jon', age: 21 },
  });
});

describe('Header', () => {
  it('should use resourceName as default title', () => {
    expect(
      global
        .shallow(<Header />)
        .find(HeaderUI)
        .props(),
    ).toHaveProperty(
      'name',
      <Title title="parent" subtitle={null} />,
    );
  });

  it('should embed child in renderRight prop', () => {
    const Foo = () => null;
    expect(
      global
        .shallow(
          <Header>
            <Foo />
          </Header>,
        )
        .find(HeaderUI)
        .props(),
    ).toHaveProperty('renderRight', expect.any(Function));
  });

  it('should embed child in renderPreIdentifier prop', () => {
    expect(
      global
        .shallow(<Header />)
        .find(HeaderUI)
        .props(),
    ).toHaveProperty(
      'renderPreIdentifier',
      expect.any(Function),
    );
  });

  it('should load dynamic title', () => {
    expect(
      global
        .shallow(
          <Header titleProp="name" parenthesesProp="age" />,
        )
        .find(HeaderUI)
        .props(),
    ).toHaveProperty(
      'name',
      <Title title="Jon (21)" subtitle={null} />,
    );
  });
});
