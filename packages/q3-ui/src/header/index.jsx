import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Offcanvas from '../offcanvas';
import Menu from '../menu';
import TabMenu from './tabMenu';
import Logo from './logo';
import useStyles from './useStyles';
import useScroll from './useScroll';
import Wrapper from './wrapper';

const Header = ({
  menuItems,
  mobileMenuItems,
  offcanvasRenderTop,
  offcanvasRenderBottom,
  menuPosition,
  transparent,
  color,
  children,
  position,
  ...rest
}) => {
  const scrollProps = useScroll(color);
  const { appBar, appBarPadding } = useStyles({
    transparent,
  });

  return (
    <AppBar
      id="app-header"
      position={position}
      className={appBar}
      {...scrollProps}
    >
      {children}
      <Container maxWidth="xl" className={appBarPadding}>
        <Grid container justify="space-between">
          <Wrapper {...rest}>
            {invoke(rest, 'renderPreIdentifier')}
            <Logo {...rest} />
            <Hidden smDown>
              {invoke(rest, 'renderLeft')}
              <TabMenu
                menuPosition={menuPosition}
                menuRenderPosition="left"
                items={menuItems}
              />
            </Hidden>
          </Wrapper>
          <Wrapper {...rest}>
            <TabMenu
              menuPosition={menuPosition}
              menuRenderPosition="right"
              items={menuItems}
            />
            {invoke(rest, 'renderRight')}
            {menuItems.length ? (
              <Hidden mdUp>
                <Offcanvas
                  menu={({ close }) => (
                    <>
                      {offcanvasRenderTop}
                      <Menu
                        items={mobileMenuItems || menuItems}
                        done={close}
                      />
                      {offcanvasRenderBottom}
                    </>
                  )}
                >
                  {(toggle) => (
                    <IconButton
                      onClick={toggle}
                      aria-label="Open menu"
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                </Offcanvas>
              </Hidden>
            ) : null}
          </Wrapper>
        </Grid>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  /**
   * Custom render components in the left column.
   */
  renderLeft: PropTypes.func,

  /**
   * Custom render components in the right column.
   */
  renderRight: PropTypes.func,

  /**
   * Custom render above the main <Container />.
   * Also developers to add above the Header and have those components follow on scroll.
   */
  children: PropTypes.node,

  /**
   * Make initial background of the header transparent.
   * Scroll enforces a white background for readability.
   */
  transparent: PropTypes.bool,

  /**
   * Renders the menu either to the left or right.
   */
  menuPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * The color of the header's menu items.
   */
  color: PropTypes.oneOf(['primary', 'inherit']),

  /**
   * Array of items to seed Q3 UI's <Menu /> component.
   */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),

  /**
   * Array of items to seed Q3 UI's <Offcanvas /> component.
   * Will default to menuItems prop otherwise.
   */
  mobileMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),

  /**
   * The value of <Appbar /> position prop.
   */
  position: PropTypes.oneOf([
    'sticky',
    'static',
    'relative',
    'fixed',
  ]),

  /**
   * A component to render above the offcanvas menu items.
   */
  offcanvasRenderTop: PropTypes.node,

  /**
   * A component to render below the offcanvas menu items.
   */
  offcanvasRenderBottom: PropTypes.node,
};

Header.defaultProps = {
  position: 'sticky',
  renderLeft: null,
  renderRight: null,
  children: null,
  menuItems: [],
  menuPosition: 'right',
  transparent: false,
  color: 'inherit',
  offcanvasRenderTop: null,
  offcanvasRenderBottom: null,
  mobileMenuItems: null,
};

export default Header;
