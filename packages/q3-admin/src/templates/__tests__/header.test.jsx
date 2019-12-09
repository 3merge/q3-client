import React from 'react';
import HeaderUI from 'q3-ui/lib/header';
import Header from '../header';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (v) => v,
  }),
}));

jest.mock('q3-ui/lib/header', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('formik', () => ({
  Formik: jest.fn(),
  Form: jest.fn(),
  connect: (v) => v,
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    collectionName: 'component-parent',
    resourceName: 'parents',
    resourceNameSingular: 'parent',
    id: '1',
    parent: {
      name: 'Jon',
    },
  });
});

describe('Header', () => {
  it('should use resourceName as default title', () => {
    expect(
      global
        .shallow(<Header />)
        .find(HeaderUI)
        .props(),
    ).toHaveProperty('name', 'titles:parents');
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

  it('should load dynamic, nested title', () => {
    expect(
      global
        .shallow(<Header titleProp="name" />)
        .find(HeaderUI)
        .props(),
    ).toHaveProperty('name', 'Jon');
  });
});
