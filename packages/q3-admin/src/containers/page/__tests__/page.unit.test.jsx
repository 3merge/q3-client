import React from 'react';
import useRest from 'q3-ui-rest';
import Page from '..';
import Context from '../../state';

let mount;
const Child = () => null;

jest.mock('q3-ui-rest', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    get: jest.fn(),
  }),
}));

jest.mock('../../state', () => ({
  Provider: jest
    .fn()
    .mockImplementation(({ children }) => children),
}));

beforeAll(() => {
  mount = global.shallow(
    <Page
      location={{
        href: '/',
      }}
      collectionName="foo"
      resourceName="bars"
      resourceNameSingular="bar"
      id="12"
    >
      <Child />
    </Page>,
  );
});

describe('Page', () => {
  it('should call REST services on init', () => {
    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/foo/12',
        key: 'bar',
        pluralized: 'bars',
        runOnInit: true,
      }),
    );
  });

  it('should copy REST data into context provider', () => {
    expect(
      mount.find(Context.Provider).props().value,
    ).toMatchObject({
      get: expect.any(Function),
      collectionName: 'foo',
      resourceName: 'bars',
      resourceNameSingular: 'bar',
    });
  });
});
