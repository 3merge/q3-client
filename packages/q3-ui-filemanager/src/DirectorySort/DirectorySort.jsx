import React from 'react';
import { orderBy } from 'lodash';
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import CheckIcon from '@material-ui/icons/Check';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { browser } from 'q3-ui-helpers';
import useDirectoryFolders from '../useDirectoryFolders';

const DirectorySortButton = ({ children }) => {
  const { anchorEl, close, isOpen, open } = useOpen();
  const { t } = useTranslation('labels');

  return (
    <Box display="inline-block" mx={0.5}>
      <Hidden smDown>
        <Button
          color="inherit"
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

const DirectorySort = ({ children }) => {
  const { files = [], siblings = [] } =
    useDirectoryFolders();

  const { t } = useTranslation();

  const getKey = (k) => `q3-filemanager-sort-${k}`;
  const getFromLocalStorage = (k, defaultValue) =>
    browser.proxyLocalStorageApi('getItem', getKey(k)) ||
    defaultValue;

  const [state, setState] = React.useState({
    property: getFromLocalStorage('property', 'name'),
    sort: getFromLocalStorage('sort', 'asc'),
  });

  const sort = (xs) =>
    orderBy(
      xs,
      [
        (item) =>
          String(item[state.property]).toLowerCase(),
      ],
      [state.sort],
    );

  const makeMenuItem = (value, stateKey) => (
    <MenuItem
      dense
      onClick={() => {
        setState((prevState) => ({
          ...prevState,
          [stateKey]: value,
        }));

        browser.proxyLocalStorageApi(
          'setItem',
          getKey(stateKey),
          value,
        );
      }}
    >
      {state[stateKey] === value && <CheckIcon />}
      {t(value)}
    </MenuItem>
  );

  return children(
    {
      files: sort(files),
      siblings: sort(siblings),
    },
    () => (
      <DirectorySortButton>
        {({ anchorEl, isOpen, close }) => (
          <Menu
            id="file-sorting"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={close}
            elevation={5}
          >
            {['lastUpdated', 'name', 'size'].map((item) =>
              makeMenuItem(item, 'property'),
            )}
            <Divider component="li" />
            {['asc', 'desc'].map((item) =>
              makeMenuItem(item, 'sort'),
            )}
          </Menu>
        )}
      </DirectorySortButton>
    ),
  );
};

export default DirectorySort;
