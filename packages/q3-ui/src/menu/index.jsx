import React from 'react';
import PropTypes from 'prop-types';
import { Link as NavLink, Location } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
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
    getProps={({ href, location }) => ({
      style:
        location.pathname === href
          ? {
              opacity: 0.9,
              textDecoration: 'underline',
            }
          : {
              opacity: 0.5,
            },
    })}
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

const MenuItemLinkDecoratorIcon = ({
  icon: Icon,
  hasSubMenu,
  isOpen,
  title,
}) => {
  if (!hasSubMenu && !Icon) return null;
  if (hasSubMenu)
    return (
      <ListItemAvatar
        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
      >
        <ListItemIcon>
          <ExpandMore
            style={{
              transition: 'transform 250ms',
              transform: isOpen
                ? 'rotate(180deg)'
                : 'rotate(0)',
            }}
          />
        </ListItemIcon>
      </ListItemAvatar>
    );

  return (
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
  );
};

const MenuItem = ({
  useTooltips,
  to,
  exact,
  done,
  subMenu,
  label,
  color,
  icon,
  location: {
    location: { pathname },
  },
}) => {
  const ref = React.useRef();
  const [previousPathname, setInit] = React.useState();
  const [showTitles, setShowTitles] = React.useState();
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

  React.useEffect(() => {
    try {
      const aside = ref.current.closest('aside');
      if (aside.scrollWidth !== aside.clientWidth) {
        setShowTitles(false);
      } else {
        setShowTitles(true);
      }
    } catch (e) {
      // noop
    }
  });

  return (
    <div ref={ref} className={container}>
      <ListItem
        {...getLinkAttributes(to, (props) => (
          <NavLink
            {...props}
            onClick={(e) => {
              if (hasSubMenu) {
                e.preventDefault();
                toggle();
              }

              if (typeof done === 'function') done();
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
        beforeClick={subMenu ? toggle : null}
        button
        dense
      >
        <MenuItemLinkDecoratorIcon
          icon={icon}
          hasSubMenu={hasSubMenu}
          isOpen={state}
          title={showTitles ? label : null}
        />
        <ListItemText style={{ color }} primary={label} />
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
