import React from 'react';
import { storiesOf } from '@storybook/react';
import Divider from '.';

storiesOf('Components/Divider', module)
  .add('Wave', () => (
    <Divider fill="orange" variant="wave" invert />
  ))
  .add('Wave2', () => (
    <Divider fill="blue" variant="wave2" invert />
  ))
  .add('Wave3', () => (
    <Divider fill="red" variant="wave3" />
  ))
  .add('Wave4', () => (
    <Divider fill="blue" variant="wave4" invert />
  ))
  .add('Curve', () => (
    <Divider fill="yellow" variant="curve" />
  ))
  .add('Lines', () => (
    <Divider fill="green" variant="lines" />
  ))
  .add('Mountains', () => (
    <Divider fill="purple" variant="mountains" />
  ))
  .add('Angle', () => (
    <Divider fill="blue" variant="angle" />
  ))
  .add('Brush', () => (
    <Divider fill="yellow" variant="brush" />
  ))
  .add('Triangle', () => (
    <Divider fill="red" variant="triangle" />
  ))
  .add('Swoop', () => (
    <Divider fill="orange" variant="swoop" />
  ))
  .add('Fade', () => (
    <Divider fill="blue" variant="fade" />
  ));
