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
import { useToggle } from 'useful-state';
import { useTranslation } from 'react-i18next';
import useStyle from '../Timeline/styles';

const TimelineMenu = ({ options }) => {
  const { t } = useTranslation('labels');
  const { toggle, state, close } = useToggle();
  const cls = useStyle();
  const ref = React.useRef();

  return (
    <Box className={cls.menu}>
      <Box className="menu">
        <Menu
          keepMounted
          disablePortal
          anchorEl={ref.current}
          open={state}
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
      <Box>
        <IconButton ref={ref} onClick={toggle}>
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
