import React from 'react';
import Fade from '@material-ui/core/Fade';
import Reveal from '.';

const checkFadeProps = (_nodes = {}, inValue) =>
  expect(
    global
      .shallow(
        <Reveal validation={{ _nodes }}>
          {jest.fn()}
        </Reveal>,
      )
      .find(Fade)
      .props(),
  ).toHaveProperty('in', inValue);

describe('Reveal', () => {
  it('should fade in', () => {
    checkFadeProps({}, false);
  });

  it('should fade out', () => {
    checkFadeProps({ length: 2 }, true);
  });
});
