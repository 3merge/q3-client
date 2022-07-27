import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'q3-ui-locale';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Sort = ({ changeSortDirection, sortDirection }) => {
  const { t } = useTranslation('labels');
  const label = t('date');

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

  const handleClick = () =>
    changeSortDirection(state.counterState);

  return (
    <>
      <Hidden smDown>
        <Button
          endIcon={state.icon}
          color="inherit"
          onClick={handleClick}
        >
          {label}
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          aria-label={label}
          color="inherit"
          onClick={handleClick}
        >
          {state.icon}
        </IconButton>
      </Hidden>
    </>
  );
};

Sort.propTypes = {
  changeSortDirection: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
};

export default Sort;
