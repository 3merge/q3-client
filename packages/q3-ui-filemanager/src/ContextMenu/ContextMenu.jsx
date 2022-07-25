import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import { get, map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import FileManagerAuthContext from '../FileManagerAuthContext';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { suppressEvent } from '../utils';

const ContextMenu = ({ id, items, children }) => {
  const { t } = useTranslation('labels');
  const { open, isOpen, close, anchorEl } = useOpen();
  const { enable, disable, select } = React.useContext(
    FileManagerBatchContext,
  );

  const authContext = React.useContext(
    FileManagerAuthContext,
  );

  const checkAuth = (prop) =>
    prop ? !get(authContext, prop, true) : false;

  const handleBackdropContextMenu = (e) => {
    if (!isOpen) return;
    suppressEvent(e, close);
  };

  const handleOnClick = (fn) => (e) => {
    fn(e);
    close(e);
  };

  const handleOnContext = (e) => {
    suppressEvent(e, open);
    select(id);
    disable();
  };

  const handleClose = (e) => {
    close(e);
    enable();
  };

  return (
    <>
      {children(handleOnContext)}
      <Menu
        BackdropProps={{
          invisible: true,
          onContextMenu: handleBackdropContextMenu,
        }}
        anchorEl={anchorEl}
        className="q3-context-menu"
        open={isOpen}
        onClose={handleClose}
      >
        {map(
          items,
          ({ auth, divider, icon, label, onClick }, idx) =>
            divider ? (
              <Divider
                key={idx}
                component="li"
                style={{
                  marginBottom: '.5rem',
                  marginTop: '.5rem',
                }}
              />
            ) : (
              <MenuItem
                button
                dense
                disabled={checkAuth(auth)}
                component="li"
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

export default React.memo(ContextMenu);
