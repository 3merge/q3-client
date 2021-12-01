import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { forEach, size } from 'lodash';
import axios from 'axios';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { hasPassed } from '../utils';

const renderCellActions = ({
  row = {},
  injectedState = {},
}) => {
  const { disabled, t } = injectedState;
  const output = [];

  const handleClick = (op) => () =>
    axios
      .post('/queues', {
        queue: row.id,
        op,
      })
      .then(() => {
        row.refresh();
      });

  // eslint-disable-next-line
  const DecoratedIconButton = ({ title, ...props }) =>
    disabled ? (
      <IconButton color="primary" disabled {...props} />
    ) : (
      <Tooltip title={t(title)}>
        <IconButton
          color="primary"
          disabled={false}
          {...props}
        />
      </Tooltip>
    );

  if (size(row.imports))
    forEach(row.imports, (imp, idx) =>
      output.push(
        <DecoratedIconButton
          component="a"
          href={imp}
          key={idx}
          title="download"
        >
          <AttachFileIcon />
        </DecoratedIconButton>,
      ),
    );

  if (hasPassed(row))
    output.push(
      <DecoratedIconButton
        key="action"
        onClick={handleClick('Reschedule')}
        title="run"
      >
        <RedoIcon />
      </DecoratedIconButton>,
    );

  if (row.type !== 'Recurring')
    output.push(
      <DecoratedIconButton
        key="delete"
        onClick={handleClick('Delete')}
        title="delete"
      >
        <DeleteForeverIcon />
      </DecoratedIconButton>,
    );

  return output;
};

export default renderCellActions;
