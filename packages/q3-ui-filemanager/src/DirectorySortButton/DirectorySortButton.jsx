import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@material-ui/core';
import { useOpen } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

const DirectorySortButton = ({ children }) => {
  const { anchorEl, close, isOpen, open } = useOpen();
  const { t } = useTranslation('labels');

  return (
    <Box display="inline-block">
      <IconButton
        id="q3-filemanager-sort-button"
        aria-label={t('sort')}
        color="inherit"
        onClick={open}
      >
        <SortByAlphaIcon />
      </IconButton>
      {children({
        anchorEl,
        close,
        isOpen,
      })}
    </Box>
  );
};

DirectorySortButton.propTypes = {
  children: PropTypes.func.isRequired,
};

export default React.memo(DirectorySortButton);
