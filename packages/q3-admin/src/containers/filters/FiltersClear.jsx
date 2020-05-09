import React from 'react';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from 'prop-types';

const FiltersAdd = ({
  onClick,
  hasActiveFilter,
  numberOfFiltersApplied,
}) => {
  const { t } = useTranslation('labels');
  const color = !hasActiveFilter ? 'secondary' : undefined;

  return (
    <Badge
      color="secondary"
      badgeContent={
        !hasActiveFilter ? numberOfFiltersApplied : 0
      }
    >
      <ButtonGroup
        variant="contained"
        aria-label={t('all')}
        color={color}
        style={{
          marginRight: '0.25rem',
          marginBottom: '0.25rem',
        }}
      >
        <Button onClick={() => navigate('?')}>
          {t('showAll')}
        </Button>
        <Button
          aria-label={t('add')}
          aria-haspopup="menu"
          color={color}
          onClick={onClick}
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
    </Badge>
  );
};

FiltersAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasActiveFilter: PropTypes.bool.isRequired,
  numberOfFiltersApplied: PropTypes.number.isRequired,
};

export default FiltersAdd;
