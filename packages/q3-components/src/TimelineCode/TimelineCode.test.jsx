import React from 'react';
import { red, blue } from '@material-ui/core/colors';
import TimelineCode from './TimelineCode';

const getColor = (label) =>
  global
    .shallow(<TimelineCode value="foobar" label={label} />)
    .find('span')
    .prop('style').color;

describe('TimelineCode', () => {
  it('should colour red', () => {
    expect(getColor('unset')).toBe(red[900]);
  });

  it('should colour blue', () => {
    expect(getColor('john')).toBe(blue[900]);
  });
});
