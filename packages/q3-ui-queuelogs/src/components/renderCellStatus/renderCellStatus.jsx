import React from 'react';
import { Chip } from '@material-ui/core';
import {
  green,
  orange,
  red,
  blue,
  grey,
} from '@material-ui/core/colors';

const renderCellStatus = ({ value }) => {
  const colorMap = {
    Failed: red,
    Done: blue,
    'In Progess': green,
    Stalled: orange,
    Scheduled: grey,
  };

  const getFromColorMap = (hue) => {
    try {
      return colorMap[value][hue];
    } catch (e) {
      return undefined;
    }
  };

  return (
    <Chip
      label={value}
      style={{
        backgroundColor: getFromColorMap(100),
        color: getFromColorMap(900),
        fontWeight: 'bold',
        borderRadius: 4,
        width: 115,
      }}
    />
  );
};

export default renderCellStatus;
