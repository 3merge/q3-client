import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton as MuiIconButton } from '@material-ui/core';
import {
  Delete as Trash,
  DeleteSweep,
  DeleteForever,
} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import { useTrash } from 'q3-hooked';

export const IconButton = () => {
  const { t } = useTranslation('labels');
  const { can, loading, error, onClick } = useTrash();

  const getIcon = () => {
    if (error)
      return <DeleteForever style={{ color: red[900] }} />;
    if (loading) return <DeleteSweep />;
    return <Trash />;
  };

  return (
    <MuiIconButton
      disabled={!can || loading}
      aria-label={t('addToTrash')}
      onClick={onClick}
    >
      {getIcon()}
    </MuiIconButton>
  );
};

export default IconButton;
