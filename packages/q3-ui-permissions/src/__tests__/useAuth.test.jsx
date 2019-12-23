import React from 'react';
import composeHook from '../useAuth';

let hook;

beforeAll(async () => {
  jest
    .spyOn(React, 'useContext')
    .mockImplementation(() => ({
      state: {
        permissions: [
          {
            coll: 'foo',
            op: 'Create',
            fields: 'foo',
          },
          {
            coll: 'foo',
            op: 'Read',
          },
        ],
      },
    }));

  hook = composeHook();
});

describe('Boolean permission properties', () => {
  it('should be truthy', () => {
    expect(hook('foo').canSee).toBeTruthy();
  });
  it('should be falsy', () => {
    expect(hook('foo').canDelete).toBeFalsy();
  });
});

describe('Component properties', () => {
  it('should return null', () => {
    const { Hide } = hook('foo');
    const Foo = () => null;
    const wrapper = global.shallow(
      <Hide op="Update">
        <Foo />
      </Hide>,
    );
    expect(wrapper.find(Foo)).toHaveLength(0);
  });
});
