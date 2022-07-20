import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import { map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import FileManagerBatchContext from '../FileManagerBatchContext';

const ContextMenu = ({ id, items, children }) => {
  const { t } = useTranslation('labels');
  const { open, isOpen, close, anchorEl } = useOpen();
  const { enable, disable, select } = React.useContext(
    FileManagerBatchContext,
  );

  const handleEventWithCallback = (e, fn) => {
    e.preventDefault();
    e.stopPropagation();
    fn(e);
  };

  const handleBackdropContextMenu = (e) => {
    if (!isOpen) return;
    handleEventWithCallback(e, close);
  };

  const handleOnClick = (fn) => (e) => {
    fn(e);
    close(e);
  };

  return (
    <>
      {children((e) => {
        handleEventWithCallback(e, open);
        select(id);
        disable();
      })}
      <Menu
        BackdropProps={{
          invisible: true,
          onContextMenu: handleBackdropContextMenu,
        }}
        anchorEl={anchorEl}
        className="q3-context-menu"
        open={isOpen}
        onClose={(e) => {
          close(e);
          enable();
        }}
      >
        {map(
          items,
          ({ divider, icon, label, onClick }, idx) =>
            divider ? (
              <Divider key={idx} component="li" />
            ) : (
              <MenuItem
                dense
                key={label}
                onClick={handleOnClick(onClick)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                {t(label)}
              </MenuItem>
            ),
        )}
      </Menu>
    </>
  );
};

ContextMenu.defaultProps = {
  items: [],
};

ContextMenu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default ContextMenu;
