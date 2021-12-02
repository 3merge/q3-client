/* eslint-disable prefer-destructuring */
import React from 'react';
import {
  blue,
  orange,
  red,
  green,
} from '@material-ui/core/colors';
import { toSeconds } from '../utils';

const renderDuration = ({ row: { average }, value }) => {
  let color;

  if (!Number.isNaN(average)) {
    const diff = ((value - average) / average) * 100;

    if (diff > 50) color = red[900];
    else if (diff > 15) color = orange[900];
    else if (diff < -50) color = green[900];
    else color = blue[900];
  }

  return (
    <span
      style={{
        color,
        fontWeight: color ? 'bold' : undefined,
      }}
    >
      {toSeconds(value)}
    </span>
  );
};

export default renderDuration;
