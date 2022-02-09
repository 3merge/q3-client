import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Tooltip,
  IconButton,
  Grid,
} from '@material-ui/core';
import Graphic from 'q3-ui-assets';
import { useAuth } from 'q3-ui-permissions';
import { orderBy } from 'lodash';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useTranslation } from 'q3-ui-locale';
import Accordion from '../Accordion';
import Search from '../Search';
import useCells from '../useCells';
import useQueues from '../useQueues';
import useStyles from './styles';

const QueueLogs = () => {
  const renderers = useCells();
  const q = useQueues();
  const { t } = useTranslation('labels');
  const cls = useStyles();
  const { canSee } = useAuth('queues');

  const sharedDataGridProps = {
    className: cls.root,
    autoHeight: true,
    loading: q.fetching,
    disableSelectionOnClick: true,
    disableColumnMenu: true,

    getCellClassName(params) {
      if (params.field === 'name') return cls.name;
      if (params.field === 'actions') return cls.actions;
      return '';
    },
  };

  const handleRefresh = () => q.poll();

  const withGlobalColumns = (xs = []) =>
    [
      {
        field: 'name',
        headerName: t('name'),
        flex: 1,
        minWidth: 250,
      },
      {
        field: 'type',
        headerName: t('type'),
        widith: 95,
      },
    ]
      .concat(xs)
      .concat([
        {
          field: 'actions',
          headerName: ' ',
          width: 165,
          renderCell: renderers.renderCellActions,
        },
        {
          field: 'status',
          headerName: t('status'),
          width: 150,
          renderCell: renderers.renderCellStatus,
        },
      ]);

  return !canSee || q.fetchingError ? (
    <Graphic icon="Code" title="queueLogsFailed" />
  ) : (
    <>
      <Grid
        spacing={1}
        alignItems="center"
        container
        justifyContent="space-between"
      >
        <Grid item xs>
          <Search handleInput={q.setFilter} />
        </Grid>
        <Grid item>
          <Tooltip title={t('refresh')}>
            <IconButton
              color="primary"
              onClick={handleRefresh}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Accordion
        data={q.upcoming}
        showEmpty={false}
        title="upcoming"
      >
        <DataGrid
          {...sharedDataGridProps}
          rows={orderBy(
            q.upcoming,
            ['expectedCompletionDate'],
            ['asc'],
          )}
          columns={withGlobalColumns([
            {
              field: 'priority',
              headerName: t('priority'),
              renderCell: renderers.renderCellPriority,
              widith: 95,
            },
            {
              field: 'expectedCompletionDate',
              headerName: t('expectedCompletionDate'),
              renderCell: renderers.renderDate,
              width: 215,
            },
          ])}
        />
      </Accordion>
      <Accordion data={q.past} showEmpty title="past">
        <DataGrid
          {...sharedDataGridProps}
          rows={q.past}
          columns={withGlobalColumns([
            {
              field: 'duration',
              headerName: t('Time'),
              renderCell: renderers.renderDuration,
              width: 95,
            },
            {
              field: 'completionDate',
              headerName: t('completionDate'),
              renderCell: renderers.renderDate,
              width: 215,
            },
          ])}
        />
      </Accordion>
    </>
  );
};

QueueLogs.displayName = 'queues';
QueueLogs.defaultProps = {};
QueueLogs.propTypes = {};

export default QueueLogs;
