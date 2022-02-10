import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { forEach, size } from 'lodash';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { isRecurring, hasPassed } from '../utils';

const renderCellActions = ({
  row = {},
  injectedState = {},
}) => {
  const { canDelete, canEdit, t } = injectedState;
  const output = [];

  const handleClickRun = () =>
    row
      .patch(row.id)({
        status: 'Queued',
      })
      .catch(() => {
        // noop
      });

  const handleClickRemove = () =>
    row
      .remove(row.id)()
      .catch(() => {
        // noop
      });

  const DecoratedIconButton = ({
    // eslint-disable-next-line
    disabled,
    // eslint-disable-next-line
    title,
    ...props
  }) =>
    disabled ? (
      <IconButton color="inherit" disabled {...props} />
    ) : (
      <Tooltip title={t(title)}>
        <IconButton color="inherit" {...props} />
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

  if (!isRecurring(row)) {
    if (hasPassed(row))
      output.push(
        <DecoratedIconButton
          disabled={!canEdit}
          key="action"
          onClick={handleClickRun}
          title="run"
        >
          <RedoIcon />
        </DecoratedIconButton>,
      );

    if (row.status !== 'Done')
      output.push(
        <DecoratedIconButton
          disabled={!canDelete}
          key="delete"
          onClick={handleClickRemove}
          title="delete"
        >
          <DeleteForeverIcon />
        </DecoratedIconButton>,
      );
  }

  return output;
};

export default renderCellActions;
