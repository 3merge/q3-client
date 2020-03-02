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
  const scrolled = useScroll();
  const { appBar, appBarPadding } = useStyles({
    transparent,
  });

  return (
    <AppBar
      position={position}
      className={appBar}
      color={scrolled ? 'inherit' : color}
      style={{ backgroundColor: scrolled ? '#FFF' : null }}
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
                        items={menuItems || menuItems}
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
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  children: PropTypes.node,
  transparent: PropTypes.bool,
  menuPosition: PropTypes.oneOf(['left', 'right']),
  color: PropTypes.oneOf(['primary', 'inherit']),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
  position: PropTypes.string,
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
};

export default Header;
