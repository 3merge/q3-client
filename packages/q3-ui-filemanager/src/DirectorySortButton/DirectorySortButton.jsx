import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

const DirectorySortButton = ({ children }) => {
  const { anchorEl, close, isOpen, open } = useOpen();
  const { t } = useTranslation('labels');

  return (
    <Box display="inline-block" mx={0.5}>
      <Hidden implementation="css" smDown>
        <Button
          color="inherit"
          id="q3-filemanager-sort-button"
          startIcon={<SortByAlphaIcon />}
          onClick={open}
        >
          {t('sort')}
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          aria-label="sort"
          color="inherit"
          onClick={open}
        >
          <SortByAlphaIcon />
        </IconButton>
      </Hidden>
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

export default DirectorySortButton;
