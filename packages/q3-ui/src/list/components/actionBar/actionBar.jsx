import React from 'react';
import PropTypes from 'prop-types';
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/MoreVert';
import { DropDownMenu } from '../../../toolbar';

const ActionBar = ({ actions, children }) => (
  <ListItemSecondaryActionMui>
    {actions.length ? (
      <DropDownMenu items={actions}>
        {(open) => (
          <IconButton onClick={open}>
            <Apps />
          </IconButton>
        )}
      </DropDownMenu>
    ) : null}
    {children}
  </ListItemSecondaryActionMui>
);

ActionBar.propTypes = {
  /**
   * IconButtons to render in the ActionBar.
   */
  children: PropTypes.node,

  /**
   * Dropdown action handlers.
   */
  actions: PropTypes.arrayOf({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }),
};

ActionBar.defaultProps = {
  children: null,
  actions: [],
};

export default ActionBar;
