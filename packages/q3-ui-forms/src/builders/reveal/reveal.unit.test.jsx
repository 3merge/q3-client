import React from 'react';
import Fade from '@material-ui/core/Fade';
import Reveal from '.';

describe('Reveal', () => {
  it('should fade in', () => {
    const f = global
      .shallow(
        <Reveal validation={{ _nodes: {} }}>
          {jest.fn()}
        </Reveal>,
      )
      .find(Fade)
      .props();

    expect(f).toHaveProperty('in', false);
  });

  it('should fade out', () => {
    const f = global
      .shallow(
        <Reveal validation={{ _nodes: { length: 2 } }}>
          {jest.fn()}
        </Reveal>,
      )
      .find(Fade)
      .props();

    expect(f).toHaveProperty('in', true);
  });
});
