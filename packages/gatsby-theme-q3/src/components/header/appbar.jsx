import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { Link } from 'gatsby';
import { get, invoke } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Offcanvas from './offcanvas';
import Search from './search';
import LoginActions from './loginActions';
import FeaturedPhoneNumber from './featuredPhoneNumber';
import HoriztonalMenuList from './horizontalMenuList';

const useStyles = makeStyles(() => ({
  logoSize: {
    maxHeight: 95,
    maxWidth: 165,
  },
  spacing: {
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  bottomBorder: {
    borderBottom: `2px solid ${grey[200]}`,
  },
  withDividers: {
    '&>:not(:last-child)': {
      marginRight: '2rem',
      position: 'relative',
      padding: '0 2rem 0 0',
      '&::after': {
        backgroundColor: grey[200],
        content: "''",
        display: 'block',
        height: 200,
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 2,
      },
    },
  },
  withoutDividers: {
    '&>*': {
      position: 'relative',
      padding: '0 1rem',
    },
  },
}));

const ToolbarWrapper = ({ children, dividers }) => {
  const { withDividers, withoutDividers } = useStyles();
  return (
    <Grid item>
      <Toolbar
        className={dividers ? withDividers : withoutDividers}
        style={{
          height: '100%',
        }}
      >
        {children}
      </Toolbar>
    </Grid>
  );
};

ToolbarWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dividers: PropTypes.bool,
};

ToolbarWrapper.defaultProps = {
  dividers: false,
};

const Header = ({
  logoImgSrc,
  menuItems,
  menuPosition,
  search,
  searchVisible,
  styleOnRoute,
  customLogoHeight,
  loginActions,
  tel,
  ...rest
}) => {
  const { logoSize, bottomBorder, spacing } = useStyles();

  const hasMenu = (position) =>
    menuPosition === position && menuItems.length ? (
      <HoriztonalMenuList items={menuItems} />
    ) : null;

  return (
    <Location>
      {({ location }) => (
        <AppBar
          color="inherit"
          elevation={0}
          position="static"
          className={rest.dividers ? bottomBorder : null}
          style={get(styleOnRoute, get(location, 'pathname'))}
        >
          <Container maxWidth="xl" className={spacing} alignItems="center">
            <Grid container justify="space-between">
              <ToolbarWrapper {...rest}>
                <Link to="/">
                  <img
                    src={logoImgSrc}
                    alt="Logo"
                    className={logoSize}
                    style={{ height: customLogoHeight }}
                  />
                </Link>
                <Hidden mdDown>
                  {invoke(rest, 'renderLeft')}
                  {hasMenu('left')}
                </Hidden>
              </ToolbarWrapper>
              <Hidden mdDown>
                <ToolbarWrapper {...rest}>
                  {hasMenu('right')}
                  {tel && <FeaturedPhoneNumber number={tel} />}
                  {search && <Search visible={searchVisible} />}
                  {invoke(rest, 'renderRight')}
                  {loginActions && <LoginActions />}
                </ToolbarWrapper>
              </Hidden>
              <Offcanvas />
            </Grid>
          </Container>
        </AppBar>
      )}
    </Location>
  );
};

Header.propTypes = {
  logoImgSrc: PropTypes.string.isRequired,
  search: PropTypes.bool,
  searchVisible: PropTypes.bool,
  loginActions: PropTypes.bool,
  renderLeft: PropTypes.func,
  tel: PropTypes.string,
  menuPosition: PropTypes.oneOf(['left', 'right', 'none']),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
};

Header.defaultProps = {
  renderLeft: null,
  search: false,
  loginActions: false,
  searchVisible: null,
  tel: null,
  menuItems: [],
  menuPosition: 'none',
};

export default Header;
