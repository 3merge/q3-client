import React from 'react';
import { orderBy } from 'lodash';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import CheckIcon from '@material-ui/icons/Check';
import { browser } from 'q3-ui-helpers';
import useDirectoryFolders from '../useDirectoryFolders';
import DirectorySortButton from '../DirectorySortButton';
import {
  castPropertyToLowerCase,
  getKey,
  getFromLocalStorage,
} from '../utils';

// had been located here for testing
// then moved to utils
export {
  castPropertyToLowerCase,
  getKey,
  getFromLocalStorage,
};

const DirectorySort = ({ children }) => {
  const { files = [], siblings = [] } =
    useDirectoryFolders();

  const { t } = useTranslation();
  const [state, setState] = React.useState({
    property: getFromLocalStorage('property', 'name'),
    sort: getFromLocalStorage('sort', 'asc'),
  });

  const sort = (xs) =>
    orderBy(
      xs,
      [
        state.property !== 'size'
          ? castPropertyToLowerCase(state.property)
          : (item) => Number(item.size),
      ],
      [state.sort],
    );

  const makeMenuItem = (value, stateKey) => (
    <MenuItem
      dense
      key={`${value}-${stateKey}`}
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
            anchorEl={anchorEl}
            id="file-sorting"
            open={isOpen}
            onClose={close}
            elevation={5}
          >
            {['updatedAt', 'name', 'size'].map((item) =>
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
