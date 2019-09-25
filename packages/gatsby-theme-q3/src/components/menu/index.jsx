import React from 'react';
import { Link } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  horizontal: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  vertical: {
    color: '#fff',
  },
  link: {
    width: 'auto',
    '& *': {
      color: '#FFF',
    },
  },
}));

const Menu = ({ horizontal }) => {
  const cls = useStyles();
  return (
    <List
      component="nav"
      className={horizontal ? cls.horizontal : cls.vertical}
    >
      <ListItem button component={Link} className={cls.link}>
        <ListItemText primary="Name" />
      </ListItem>
      <ListItem button component={Link} className={cls.link}>
        <ListItemText primary="Name" />
      </ListItem>
    </List>
  );
};

export default Menu;
