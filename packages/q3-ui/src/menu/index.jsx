import React from 'react';
import PropTypes from 'prop-types';
import { Link as NavLink, Location } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import { getLinkAttributes } from '../utils';

const useStyles = makeStyles({
  subItemCls: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    padding: '0 1rem',
    '&:hover': {
      opacity: '1 !important',
      textDecoration: 'underline',
    },
  },
  container: {
    padding: '0 16px',
    position: 'relative',
    '&>a': {
      borderRadius: 2,
      transition: 'background-color 250ms',
    },
  },
  selected: {},
});

const CollisionSubNavLink = (props) => (
  <NavLink
    {...props}
    exact
    getProps={({ href, location }) => {
      const [root, search] = href.split('?');
      const matches =
        search && location.search
          ? location.search.includes(search)
          : true;

      return {
        style:
          location.pathname === root && matches
            ? {
                opacity: 0.9,
                textDecoration: 'underline',
              }
            : {
                opacity: 0.5,
              },
      };
    }}
  />
);

export const CollisionNavLink = (props) => (
  <NavLink
    {...props}
    onClick={(e) => {
      if (props.beforeClick) {
        e.preventDefault();
        props.beforeClick();
      }
    }}
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
);

const NestedMenuItem = ({ isOpen, items, className }) => (
  <Collapse in={isOpen} timeout="auto" unmountOnExit>
    <List component="ul">
      {items.map((i) => (
        <ListItem
          component={CollisionSubNavLink}
          to={i.to}
          className={className}
        >
          {i.icon && (
            <ListItemIcon>
              <i.icon />
            </ListItemIcon>
          )}
          <ListItemText primary={i.label} />
        </ListItem>
      ))}
    </List>
  </Collapse>
);

const MenuItemLinkIcon = ({ hasSubMenu, isOpen }) => (
  <ListItemIcon>
    {hasSubMenu ? (
      <ExpandMore
        style={{
          transition: 'transform 250ms',
          transform: isOpen
            ? 'rotate(180deg)'
            : 'rotate(0)',
        }}
      />
    ) : (
      <KeyboardArrowRight />
    )}
  </ListItemIcon>
);

const MenuItem = ({
  to,
  exact,
  done,
  subMenu,
  label,
  color,
  location: {
    location: { pathname },
  },
}) => {
  const [previousPathname, setInit] = React.useState();
  const hasSubMenu = Boolean(subMenu && subMenu.length);
  const includes = hasSubMenu
    ? subMenu.some(
        (item) =>
          item.to &&
          item.to.startsWith(pathname) &&
          pathname !== '/',
      )
    : false;

  const { container, subItemCls } = useStyles();
  const { toggle, close, open, state } = useToggle(
    includes,
  );

  React.useEffect(() => {
    setInit(pathname);
  }, [pathname]);

  return (
    <div className={container}>
      <ListItem
        {...getLinkAttributes(to, (props) => (
          <NavLink
            {...props}
            onClick={(e) => {
              if (hasSubMenu) {
                e.preventDefault();
                toggle();
              }
            }}
            getProps={({
              isCurrent,
              isPartiallyCurrent,
            }) => {
              if (previousPathname !== pathname) {
                if (isCurrent) open();
                if (!isPartiallyCurrent) close();
              }

              return {
                'data-active': !!(
                  isCurrent ||
                  (isPartiallyCurrent &&
                    (props.to !== '/' || !props.to))
                ),
                style:
                  isCurrent ||
                  (isPartiallyCurrent &&
                    (props.to !== '/' || !props.to))
                    ? {
                        backgroundColor:
                          'rgba(255,255,255,0.1)',
                      }
                    : null,
              };
            }}
          />
        ))}
        exact={exact}
        key={to}
        onClick={done}
        beforeClick={subMenu ? toggle : null}
        button
        dense
      >
        <ListItemText style={{ color }} primary={label} />
        <MenuItemLinkIcon
          hasSubMenu={hasSubMenu}
          isOpen={state}
        />
      </ListItem>

      {hasSubMenu && (
        <NestedMenuItem
          items={subMenu}
          isOpen={state}
          className={subItemCls}
        />
      )}
    </div>
  );
};

const Menu = ({ title, items, color, done }) => (
  <List
    aria-labelledby="nested-list-subheader"
    component="nav"
    subheader={
      title ? (
        <ListSubheader
          disableSticky
          component="div"
          id="nested-list-subheader"
          style={{
            color,
            fontSize: '0.83rem',
            lineHeight: '2.3rem',
          }}
        >
          {title.toUpperCase()}
        </ListSubheader>
      ) : null
    }
  >
    <Location>
      {(location) =>
        items.map(
          (item) =>
            item.visible && (
              <MenuItem
                location={location}
                color={color}
                key={item.label}
                done={done}
                {...item}
              />
            ),
        )
      }
    </Location>
  </List>
);

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
