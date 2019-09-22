import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    '&>a': {
      transition: 'background-color 250ms',
      '&::before': {
        borderRadius: 20,
        content: "''",
        display: 'block',
        left: 0,
        position: 'absolute',
        top: '50%',
        height: '75%',
        transform: 'translateY(-50%)',
        transition: 'background-color 250ms',
        width: 2,
      },
    },
  },
  selected: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    '&::before': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

export const CollisionNavLink = React.forwardRef(
  (props, ref) => {
    const { selected, container } = useStyles();
    return (
      <div ref={ref} className={container}>
        <NavLink activeClassName={selected} {...props} />
      </div>
    );
  },
);

const MenuSubHeader = ({ title }) => (
  <ListSubheader
    disableSticky
    component="div"
    id="nested-list-subheader"
  >
    {title}
  </ListSubheader>
);

MenuSubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

const Menu = ({ title, items }) => (
  <List
    aria-labelledby="nested-list-subheader"
    component="nav"
    subheader={<MenuSubHeader title={title} />}
  >
    {items.map(
      (item) =>
        item.visible && (
          <ListItem
            exact={item.exact}
            key={item.href}
            component={CollisionNavLink}
            to={item.href}
            dense
          >
            <ListItemIcon>
              <item.Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ),
    )}
  </List>
);

Menu.propTypes = {
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

export default Menu;
