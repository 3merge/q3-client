import React from 'react';
import { orderBy } from 'lodash';
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import CheckIcon from '@material-ui/icons/Check';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SortIcon from '@material-ui/icons/Sort';

const DirectorySort = ({ files, siblings, children }) => {
  const { anchorEl, close, isOpen, open } = useOpen();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    property: 'relativePath',
    sort: 'asc',
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
      onClick={(e) => {
        setState((prevState) => ({
          ...prevState,
          [stateKey]: value,
        }));

        close(e);
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
      <Box mx={1}>
        <Button
          iconStart={<SortIcon />}
          onClick={open}
          variant="outlined"
        >
          {state.property}
          {state.sort === 'desc' ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          )}
        </Button>
        <Menu
          id="file-sorting"
          anchorEl={anchorEl}
          anchor="bottom"
          getContentAnchorEl={null}
          open={isOpen}
          onClose={close}
          elevation={5}
        >
          {['lastUpdated', 'relativePath', 'size'].map(
            (item) => makeMenuItem(item, 'property'),
          )}
          <Divider component="li" />
          {['asc', 'desc'].map((item) =>
            makeMenuItem(item, 'sort'),
          )}
        </Menu>
      </Box>
    ),
  );
};

export default DirectorySort;
