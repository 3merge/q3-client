import React from 'react';
import {
  blue,
  orange,
  red,
  green,
} from '@material-ui/core/colors';
import renderDuration from './renderDuration';

test.each([
  [blue[900], 100],
  [orange[900], 130],
  [green[900], 43],
  [red[900], 180],
])('renderDuration(%s)', (color, value) => {
  expect(
    global
      .mount(
        <div>
          {renderDuration({
            row: {
              average: 100,
            },
            value,
          })}
        </div>,
      )
      .find('span')
      .props(),
  ).toHaveProperty('style.color', color);
});
