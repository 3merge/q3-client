import React from 'react';
import useRest from 'q3-ui-rest';
import Loading from '../../../components/loading';
import ErrorView from '../../../components/error';
import Page from '..';

jest.mock('../../state');
jest.mock('q3-ui-rest', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    get: jest.fn(),
  }),
}));

const Child = () => null;

const getShallow = () =>
  global.mount(
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

describe('Page', () => {
  it('should call REST services on init', () => {
    getShallow();
    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/foo/12',
        key: 'bar',
        pluralized: 'bars',
        runOnInit: true,
      }),
    );
  });

  it('should render loading skeleton', () => {
    useRest.mockReturnValue({ fetching: true });
    expect(getShallow().find(Loading)).toHaveLength(1);
  });

  it('should render error', () => {
    useRest.mockReturnValue({ fetchingError: true });
    expect(getShallow().find(ErrorView)).toHaveLength(1);
  });
});
