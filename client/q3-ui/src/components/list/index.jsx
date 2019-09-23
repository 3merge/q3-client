import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core';
import Avatar from '../avatar';
import Graphic from '../graphic';
import Unpopulated from '../../static/unpopulated.png';

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

const Listing = ({ items, subtitle, img }) => {
  const { listcls } = useStyles();
  return items.length ? (
    <List
      subheader={
        subtitle && (
          <ListSubheader component="div" id={subtitle}>
            {subtitle}
          </ListSubheader>
        )
      }
    >
      {items.map(({ primary, secondary, render }, i) => (
        <div key={i} className={listcls}>
          <ListItem dense>
            <ListItemAvatar>
              <Avatar word={primary || '?'} />
            </ListItemAvatar>
            <ListItemText
              primary={primary || '--'}
              secondary={secondary}
            />
            {render && (
              <ListItemSecondaryAction>
                {render()}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        </div>
      ))}
    </List>
  ) : (
    <Graphic src={img || Unpopulated} alt="unpopulated" />
  );
};

Listing.propTypes = {
  img: PropTypes.string,
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
  img: null,
};

export default Listing;
