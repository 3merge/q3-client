import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { QueryStringMatcher } from '../../helpers';

export const getActiveLink = (href, siblings) => ({
  location,
}) => ({
  style: {
    backgroundColor: new QueryStringMatcher(
      location.search,
      href,
      siblings,
    ).isActive()
      ? // same colour as Mui-selected
        // only this passes the props back to the anchor element
        'var(--background-muted)'
      : undefined,
  },
});

const SegmentListItem = ({
  children,
  href,
  label,
  isStarred,
  siblings,
}) => (
  <ListItem
    button
    fullWidth
    dense
    variant="contained"
    // will href is a parameter of getProps
    // it processes it into a relative path
    // must use raw search query for out active matching util
    getProps={getActiveLink(href, siblings)}
    component={Link}
    to={href}
  >
    <ListItemText
      primary={label}
      primaryTypographyProps={{
        style: {
          fontSize: '0.933rem',
        },
      }}
    />
    <ListItemSecondaryAction>
      {isStarred && (
        <IconButton disabled>
          <StarIcon style={{ color: 'orange' }} />
        </IconButton>
      )}
      {children}
    </ListItemSecondaryAction>
  </ListItem>
);

SegmentListItem.defaultProps = {
  children: null,
  isStarred: false,
  siblings: [],
};

SegmentListItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isStarred: PropTypes.bool,
  siblings: PropTypes.arrayOf(PropTypes.string),
};

export default SegmentListItem;
