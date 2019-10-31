import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Avatar from '../avatar';

const useStyles = makeStyles(() => ({
  listcls: {
    '& .MuiListItemSecondaryAction-root': {
      opacity: 0,
      transition: 'opacity 500ms',
    },
    '&:hover .MuiListItemSecondaryAction-root': {
      opacity: 1,
    },
    '&:focus-within .MuiListItemSecondaryAction-root': {
      opacity: 1,
    },
  },
}));

const Listing = ({ items, subtitle }) => {
  const { listcls } = useStyles();
  return (
    <List
      subheader={
        subtitle && (
          <ListSubheader component="li" id={subtitle}>
            {subtitle}
          </ListSubheader>
        )
      }
    >
      {items.map(
        ({ primary, secondary, render, icon }, i) => (
          <li key={i} className={listcls}>
            <ListItem component="div" dense>
              <ListItemAvatar>
                <Avatar
                  icon={icon}
                  word={
                    Array.isArray(primary)
                      ? primary.join(', ')
                      : String(primary || '--')
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  Array.isArray(primary)
                    ? primary.join(', ')
                    : String(primary || '--')
                }
                secondary={secondary}
              />
              {render && (
                <ListItemSecondaryAction>
                  {render()}
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </li>
        ),
      )}
    </List>
  );
};

Listing.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      primary: PropTypes.string,
      secondary: PropTypes.string,
    }),
  ),
};

Listing.defaultProps = {
  items: [],
  subtitle: '',
};

export default Listing;
