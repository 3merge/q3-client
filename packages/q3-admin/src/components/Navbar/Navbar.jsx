import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import {
  Box,
  Paper,
  Hidden,
  Fab,
  Avatar,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { first, find, some } from 'lodash';
import { useLocation } from '@reach/router';
import useStyle from './styles';
import Logo from '../Logo';
import NavbarFooterLinks from '../NavbarFooterLinks';

const Navbar = ({ callToAction, children }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);
  const [group, setGroup] = React.useState();
  const cls = useStyle({
    group,
  });

  const NavigationContents = (
    <Box
      display="flex"
      className={cls.contents}
      flexDirection="column"
      height="100%"
      overflow="auto"
    >
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        px={1.5}
      >
        {/* {callToAction?.label && (
          <Fab
            color="secondary"
            className={cls.fab}
            onClick={callToAction.onClick}
            variant="extended"
          >
            {callToAction.icon}
            <Box
              className={cls.fabText}
              component="span"
              mx={0.5}
            >
              {callToAction.label}
            </Box>
          </Fab>
        )} */}
        <Box id="menu-contents" flex="1">
          {children}
        </Box>
        <NavbarFooterLinks />
      </Box>
    </Box>
  );

  React.useEffect(() => {
    const initalGroup = first(
      find(
        Object.entries(children?.props?.items),
        ([, v]) =>
          some(v, (item) => pathname.includes(item.to)),
      ),
    );

    setGroup(initalGroup);
    if (!initalGroup && open) setOpen(false);
  }, [pathname]);

  return (
    <>
      <Hidden mdDown>
        <Box className={cls.nav} component="nav">
          <Box
            bgcolor="background.paper"
            position="relative"
            width={90}
            zIndex={10}
            style={{
              borderRight: '1px solid',
            }}
          >
            <button
              onClick={() =>
                setOpen((prevState) => !prevState)
              }
            >
              OPEN/CLOSE
            </button>
            {Object.keys(children?.props?.items).map(
              (item) => (
                <button
                  onClick={() => {
                    setGroup(item);
                    setOpen(true);
                  }}
                  style={{
                    backgroundColor:
                      group === item ? 'blue' : undefined,
                  }}
                >
                  {item}
                </button>
              ),
            )}
          </Box>
          <style>
            {`#menu-contents > ul:not([data-group="${group}"])  {
                display: none;
              }

              #menu-contents > ul[data-group] li:first-of-type {
                display: none;
              }
            `}
          </style>
          <div
            style={{
              transform: open
                ? 'none'
                : 'translateX(-500px)',
              transition: 'transform,width 250ms',
              width: open ? 270 : 0,
            }}
          >
            <Paper className={cls.paper} color="primary">
              {/* <Box
                bgcolor="background.paper"
                top="0"
                zIndex={1}
              >
                <Logo />
              </Box> */}
              {NavigationContents}
            </Paper>
          </div>
        </Box>
      </Hidden>
      <Hidden lgUp>
        <Dialog
          PaperProps={{
            style: {
              maxWidth: '320px',
            },
          }}
          anchor="left"
          closeOnRouteChange
          closeOnSearchChange
          renderContent={() => NavigationContents}
          renderTrigger={(onClick) => (
            <Box
              component="nav"
              className={cls.appbar}
              id="app-navbar"
            >
              {/* eslint-disable-next-line */}
              <span
                aria-label="hidden-menu"
                id="app-menu"
                onClick={onClick}
                role="button"
                style={{
                  display: 'none',
                }}
              />
              <Logo />
            </Box>
          )}
          title="menu"
          variant="drawer"
        />
      </Hidden>
    </>
  );
};

Navbar.defaultProps = {
  callToAction: null,
  children: null,
};

Navbar.propTypes = {
  callToAction: PropTypes.shape({
    icon: PropTypes.element,
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default Navbar;
