import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as NavLink } from '@reach/router';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './useStyle';

export const isActive = (to, activeClassName) => ({
  isCurrent,
  isPartiallyCurrent,
}) => ({
  className:
    isCurrent || (isPartiallyCurrent && (to !== '/' || !to))
      ? activeClassName
      : null,
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(15),
    padding: theme.spacing(1),
  },
  arrow: {
    color: theme.palette.secondary.main,
  },
}))(Tooltip);

const MenuItem = ({
  to,
  exact,
  done,
  label,
  icon: Icon,
}) => {
  const ref = React.useRef();
  const { activeLink, baseLink } = useStyles();

  return (
    <Box ref={ref} component="li">
      <NavLink
        to={to}
        style={{ textDecoration: 'none' }}
        getProps={isActive(to, activeLink)}
      >
        <Box align="center" className={baseLink}>
          <HtmlTooltip
            title={label}
            arrow
            placement="right-center"
          >
            <Avatar
              variant="square"
              className="nav-link-icon"
            >
              <Icon />
            </Avatar>
          </HtmlTooltip>
        </Box>
      </NavLink>
    </Box>
  );
};

const Menu = ({ items, done }) => (
  <List component="nav" style={{ marginTop: '1rem' }}>
    {items.map(
      (item) =>
        item.visible && (
          <MenuItem
            key={item.label}
            done={done}
            {...item}
          />
        ),
    )}
  </List>
);

Menu.propTypes = {
  done: PropTypes.func,
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
  done: null,
};

export default Menu;
