import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import { useTranslation } from 'q3-ui-locale';
import { object } from 'q3-ui-helpers';

const ColumnAdd = ({ onColumnAdd }) => {
  const { t } = useTranslation('labels');

  const handleClick = () => {
    // eslint-disable-next-line
    const field = prompt(t('descriptions:enterFieldName'));

    return object.noop(
      Promise.resolve(field ? onColumnAdd(field) : null),
    );
  };

  return (
    <Tooltip title={t('insertColumn')}>
      <IconButton color="inherit" onClick={handleClick}>
        <SettingsEthernetIcon />
      </IconButton>
    </Tooltip>
  );
};

ColumnAdd.propTypes = {
  onColumnAdd: PropTypes.func.isRequired,
};

export default ColumnAdd;
