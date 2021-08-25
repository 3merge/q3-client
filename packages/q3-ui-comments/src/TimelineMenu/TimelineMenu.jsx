import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { map } from 'lodash';
import VertIcon from '@material-ui/icons/MoreHoriz';
import { useOpen } from 'useful-state';
import { useTranslation } from 'react-i18next';
import useStyle from '../Timeline/styles';

const TimelineMenu = ({ options }) => {
  const { open, close, isOpen, anchorEl } = useOpen();
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Box className={cls.menu}>
      <Box className="menu">
        <Menu
          keepMounted
          disablePortal
          anchorEl={anchorEl}
          open={isOpen}
          onClose={close}
          onClick={close}
        >
          {map(options, (option) => (
            <MenuItem
              dense
              key={option.label}
              className={cls.menuItem}
              {...option}
            >
              {t(option.label)}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box className="menu-trigger">
        <IconButton onClick={open}>
          <VertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

TimelineMenu.defaultProps = {
  options: [],
};

TimelineMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};

export default TimelineMenu;
