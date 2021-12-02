import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { get } from 'lodash';

const renderCellPriority = (args) => (
  <Rating
    defaultValue={Number(
      String(get(args, 'row.priority', 0))[0],
    )}
    max={3}
    name="priority"
    precision={1}
    readOnly
  />
);

export default renderCellPriority;
