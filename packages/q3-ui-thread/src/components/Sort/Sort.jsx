import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Sort = ({ changeSortDirection, sortDirection }) => {
  const { t } = useTranslation('labels');

  const state =
    sortDirection === 'asc'
      ? {
          icon: <ArrowDownwardIcon />,
          counterState: 'desc',
        }
      : {
          icon: <ArrowUpwardIcon />,
          counterState: 'asc',
        };

  return (
    <Button
      endIcon={state.icon}
      color="inherit"
      onClick={() =>
        changeSortDirection(state.counterState)
      }
    >
      {t('sortByDate')}
    </Button>
  );
};

Sort.propTypes = {
  changeSortDirection: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
};

export default Sort;
