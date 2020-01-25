import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction';

/**
DROPDOWN? */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useOpen from 'useful-state/lib/useOpen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/MoreVert';
import Avatar from '../avatar';
import { DropDownMenu } from '../toolbar';

const ListItemActions = ({ actions }) =>
  actions.length ? (
    <ListItemSecondaryAction>
      <DropDownMenu items={actions}>
        {(open) => (
          <IconButton onClick={open}>
            <Apps />
          </IconButton>
        )}
      </DropDownMenu>
    </ListItemSecondaryAction>
  ) : null;

ListItemActions.propTypes = {
  actions: PropTypes.arrayOf({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }),
};


const ActionBar = ({ children, menuOptions }) => (
  <ListItemSecondaryActionMui>
    {children}
  </ListItemSecondaryActionMui>
);

export default ActionBar;
