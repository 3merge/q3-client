import React from 'react';
import useRest from 'q3-ui-rest';
import Repeater from 'q3-ui-repeater';
import SubDetail from './subDetail';

jest.mock('q3-ui-rest', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValueOnce({
      fetching: false,
      post: jest.fn(),
      patch: jest.fn(),
      remove: jest.fn(),
      foo: [],
    })
    .mockReturnValue({
      fetching: true,
    }),
}));

jest.spyOn(React, 'useContext').mockReturnValue({
  resourceName: 'resource',
  collectionName: 'collection',
  id: 1,
});

describe('SubDetail', () => {
  it('should inject state props into children', () => {
    const Mock = () => null;
    const props = global
      .shallow(
        <SubDetail root="foo">
          <Mock />
        </SubDetail>,
      )
      .find(Repeater)
      .props();

    expect(props).toMatchObject({
      post: expect.any(Function),
      edit: expect.any(Function),
      create: expect.any(Function),
      remove: expect.any(Function),
      data: [],
    });
  });

  it('should assemble useRest arguments', () => {
    global.shallow(
      <SubDetail
        root="foo"
        decorators={{ get: jest.fn() }}
      />,
    );
    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/collection/1/foo',
        key: 'foo',
        pluralized: 'foo',
        runOnInit: true,
        decorators: {
          get: expect.any(Function),
        },
      }),
    );
  });
});
