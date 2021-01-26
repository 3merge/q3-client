import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const DownloadMenuItem = ({ onClick, label }) => {
  const { t } = useTranslation('labels');

  return (
    <MenuItem onClick={onClick} style={{ margin: 0 }}>
      {t(label)}
    </MenuItem>
  );
};

DownloadMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DownloadMenuItem;
