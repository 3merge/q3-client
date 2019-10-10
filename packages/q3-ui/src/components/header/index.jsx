import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { invoke } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Offcanvas from '../offcanvas';
import Menu from '../menu';
import { LocationMatch } from '../tabs';

const useStyles = makeStyles((theme) => ({
  logoSize: {
    maxHeight: 95,
    maxWidth: 165,
  },
  appBar: {
    backgroundColor: (props) =>
      props.transparent ? 'transparent' : '#FFF',
    boxShadow: 'none !important',
    willChange: 'background, color',
    transition: 'background 500ms',
  },
  appBarPadding: {
    padding: theme.spacing(2),
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
  logo: {
    border: '2px solid transparent',
    boxSizing: 'border-box',
    padding: 0,
    display: 'block',
    maxHeight: 95,
    marginRight: theme.spacing(2),
    maxWidth: 165,
    width: 'auto',
    '&:focus': {
      outline: 1,
      borderRadius: 3,
      fontWeight: 800,
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: 75,
      maxWidth: 145,
      marginRight: theme.spacing(1),
    },
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
      [theme.breakpoints.down('sm')]: {
        '&:not(:last-child)': {
          paddingRight: 0,
        },
      },
    },
  },
  listContainer: {
    padding: theme.spacing(3),
  },
  list: {
    width: 230,
  },
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: theme.spacing(0.25),
    '& > div': {
      background: theme.palette.primary.main,
      borderRadius: 15,
      maxWidth: theme.spacing(2),
      width: '100%',
    },
  },
}))((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <div /> }}
  />
));

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    lineHeight: 1,
    fontWeight: '600',
    [theme.breakpoints.up('md')]: {
      minWidth: 'none !important',
    },
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      borderRadius: 3,
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    value: index,
  };
}

const HorizontalMenuList = ({ items }) => (
  <Hidden smDown>
    <LocationMatch views={items}>
      {(value) => (
        <StyledTabs
          value={value}
          aria-label="Main navigation"
          TabIndicatorProps={{ children: <div /> }}
        >
          {items.map(
            ({ to, visible, label }, i) =>
              visible && (
                <StyledTab
                  component={Link}
                  to={to}
                  key={to}
                  label={label}
                  {...a11yProps(i)}
                />
              ),
          )}
        </StyledTabs>
      )}
    </LocationMatch>
  </Hidden>
);

HorizontalMenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
};

HorizontalMenuList.defaultProps = {
  items: [],
};

const ToolbarWrapper = ({ children }) => (
  <Grid item>
    <Toolbar
      dense
      variant="dense"
      style={{
        height: '100%',
      }}
    >
      {children}
    </Toolbar>
  </Grid>
);

ToolbarWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const Scroller = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

Scroller.propTypes = {
  children: PropTypes.node.isRequired,
};

const Identifier = ({ logoImgSrc, name }) => {
  const { logo } = useStyles();
  return logoImgSrc ? (
    <Link to="/" className={logo}>
      <img src={logoImgSrc} alt={name} />
    </Link>
  ) : (
    <Typography
      variant="h3"
      style={{ padding: '0 1rem' }}
      component="h1"
      color="inherit"
    >
      {name}
    </Typography>
  );
};

Identifier.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string,
};

Identifier.defaultProps = {
  logoImgSrc: null,
};

const Header = ({
  menuItems,
  mobileMenuItems,
  offcanvasRenderTop,
  offcanvasRenderBottom,
  menuPosition,
  transparent,
  color,
  children,
  ...rest
}) => {
  const [scrolled, setScrolled] = React.useState(false);

  const { appBar, appBarPadding } = useStyles({
    transparent,
  });

  const hasMenu = (position) =>
    menuPosition === position && menuItems.length ? (
      <HorizontalMenuList items={menuItems} />
    ) : null;

  React.useEffect(() => {
    window.addEventListener(
      'scroll',
      function listenForScroll() {
        setScrolled(this.scrollY > 5);
      },
      { passive: true },
    );
  }, []);

  return (
    <AppBar
      position="sticky"
      className={appBar}
      color={scrolled ? 'inherit' : color}
      style={{ backgroundColor: scrolled ? '#FFF' : null }}
    >
      {children}
      <Container maxWidth="xl" className={appBarPadding}>
        <Grid container justify="space-between">
          <ToolbarWrapper {...rest}>
            {invoke(rest, 'renderPreIdentifier')}
            <Identifier {...rest} />
            <Hidden smDown>
              {invoke(rest, 'renderLeft')}
              {hasMenu('left')}
            </Hidden>
          </ToolbarWrapper>
          <ToolbarWrapper {...rest}>
            {hasMenu('right')}
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
          </ToolbarWrapper>
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
};

Header.defaultProps = {
  renderLeft: null,
  renderRight: null,
  children: null,
  menuItems: [],
  menuPosition: 'right',
  transparent: false,
  color: 'inherit',
};

export default Header;
