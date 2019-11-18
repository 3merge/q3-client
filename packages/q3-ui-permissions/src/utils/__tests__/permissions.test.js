import React from 'react';
import composeHook from '../permissions';

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

  it('should add readOnly and disabled props', () => {
    const { Disable } = hook('foo');
    const Foo = () => null;
    const wrapper = global.shallow(
      <Disable component={Foo} op="Update" name="hola" />,
    );
    const props = wrapper.find(Foo).props();
    expect(props).toHaveProperty('readOnly', true);
    expect(props).toHaveProperty('disabled', true);
  });

  it('should add readOnly on field unmatch', () => {
    const { Disable } = hook('foo');
    const Foo = () => null;
    const wrapper = global.shallow(
      <Disable component={Foo} op="Create" name="bar" />,
    );
    const props = wrapper.find(Foo).props();
    expect(props).toHaveProperty('readOnly', true);
  });

  it('should remove readOnly and disabled props', () => {
    const { Disable } = hook('foo');
    const Foo = () => null;
    const wrapper = global.shallow(
      <Disable component={Foo} op="Create" name="foo" />,
    );
    expect(wrapper.find(Foo).props()).not.toHaveProperty(
      'readOnly',
    );
  });
});
