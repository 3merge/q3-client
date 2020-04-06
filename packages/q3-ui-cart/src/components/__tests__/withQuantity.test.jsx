import React from 'react';
import withQuantity from '../withQuantity';

const Foo = () => <div />;

describe('withQuantity', () => {
  it('should disable component', () => {
    const El = withQuantity(Foo);
    const props = global
      .shallow(<El product="123" quantity={-1} />)
      .props();

    expect(props).toHaveProperty('disabled', true);
  });

  it('should not disable the component', () => {
    const El = withQuantity(Foo);
    const props = global
      .shallow(<El product="123" quantity={4} />)
      .props();

    expect(props).toHaveProperty('disabled', false);
  });
});
