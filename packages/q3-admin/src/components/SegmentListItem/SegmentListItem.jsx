import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const getActiveLink = ({ isActive }) => () => ({
  style: {
    backgroundColor: isActive // same colour as Mui-selected
      ? // only this passes the props back to the anchor element
        'var(--background-muted)'
      : undefined,
  },
});

const SegmentListItem = ({
  children,
  href,
  label,
  isStarred,
  ...rest
}) => (
  <ListItem
    button
    fullWidth
    dense
    variant="contained"
    getProps={getActiveLink(rest)}
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
