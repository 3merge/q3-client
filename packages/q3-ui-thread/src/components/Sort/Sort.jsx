import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'q3-ui-locale';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Sort = ({ changeSortDirection, sortDirection }) => {
  const { t } = useTranslation('labels');

  const state =
    sortDirection === 'asc'
      ? {
          label: 'oldestToNewest',
          icon: <ArrowDownwardIcon />,
          counterState: 'desc',
        }
      : {
          label: 'newestToOldest',
          icon: <ArrowUpwardIcon />,
          counterState: 'asc',
        };

  return (
    <Tooltip title={t(state.label)}>
      <Button
        endIcon={state.icon}
        color="inherit"
        onClick={() =>
          changeSortDirection(state.counterState)
        }
      >
        {t('sortBy')}
      </Button>
    </Tooltip>
  );
};

export default Sort;
