import React from 'react';
import PropTypes from 'prop-types';
import { Link as NavLink } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import { getLinkAttributes } from '../utils';

const useStyles = makeStyles({
  container: {
    padding: '3px 16px',
    position: 'relative',
    '&>a': {
      borderRadius: 2,
      transition: 'background-color 250ms',
    },
  },
  selected: {},
});

export const CollisionNavLink = React.forwardRef(
  (props, ref) => (
    <NavLink
      {...props}
      getProps={({ isCurrent, isPartiallyCurrent }) => ({
        style:
          isCurrent ||
          (isPartiallyCurrent &&
            (props.to !== '/' || !props.to))
            ? {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            : null,
      })}
    />
  ),
);

const Menu = ({ title, items, color, done }) => {
  const { container } = useStyles();
  return (
    <List
      aria-labelledby="nested-list-subheader"
      component="nav"
      subheader={
        title ? (
          <ListSubheader
            disableSticky
            component="div"
            id="nested-list-subheader"
            style={{ color }}
          >
            {title.toUpperCase()}
          </ListSubheader>
        ) : null
      }
    >
      {items.map(
        (item) =>
          item.visible && (
            <div className={container}>
              <ListItem
                {...getLinkAttributes(
                  item.to,
                  CollisionNavLink,
                )}
                exact={item.exact}
                key={item.to}
                onClick={done}
                dense
                button
              >
                {item.Icon && (
                  <ListItemIcon>
                    <item.Icon
                      fontSize="small"
                      style={{ color }}
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  style={{ color }}
                  primary={item.label}
                />
              </ListItem>
            </div>
          ),
      )}
    </List>
  );
};

Menu.propTypes = {
  color: PropTypes.string,
  done: PropTypes.func,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node,
      visible: PropTypes.bool,
    }),
  ).isRequired,
};

Menu.defaultProps = {
  color: null,
  done: null,
};

export default Menu;
