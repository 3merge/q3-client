import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useOpen } from 'useful-state';
import useActions from '../useActions';
import useStyle from './styles';

const Actions = ({ data }) => {
  const { t } = useTranslation('labels');
  const { anchorEl, isOpen, open, close } = useOpen();
  const { clear, copy, reset } = useActions(data, close);
  const cls = useStyle();

  return (
    <Box position="sticky" bottom="0" p={1} width="100%">
      <ButtonGroup
        color="secondary"
        variant="contained"
        fullWidth
      >
        <Button type="submit">{t('applyFilters')}</Button>
        <Button
          aria-controls={
            isOpen ? 'filter-options' : undefined
          }
          aria-expanded={isOpen ? 'true' : undefined}
          aria-label={t('additionalOptions')}
          aria-haspopup="menu"
          className={cls.button}
          onClick={open}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="filter-options"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          onClose={close}
          open={isOpen}
        >
          <MenuItem
            dense
            className={cls.menuItem}
            onClick={clear}
          >
            {t('removeAllFilters')}
          </MenuItem>
          <MenuItem
            dense
            className={cls.menuItem}
            onClick={reset}
          >
            {t('restartFilters')}
          </MenuItem>
          <MenuItem
            dense
            className={cls.menuItem}
            onClick={copy}
          >
            {t('shareFilters')}
          </MenuItem>
        </Menu>
      </ButtonGroup>
    </Box>
  );
};

Actions.defaultProps = {};
Actions.propTypes = {};

export default Actions;
