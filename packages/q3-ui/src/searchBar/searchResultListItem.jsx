import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '../avatar';

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
  },
  item: {
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },
}));

const SearchResultListItem = ({
  name,
  description,
  photo,
  url,
  ...etc
}) => {
  const { root, item } = useStyle();
  const props = url
    ? {
        to: url,
        component: Link,
      }
    : {};

  return (
    <ListItem dense className={root} {...props} {...etc}>
      <ListItemAvatar>
        <Avatar word={name} imgSrc={photo} {...etc} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={description}
        className={item}
      />
    </ListItem>
  );
};

SearchResultListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  photo: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default SearchResultListItem;
