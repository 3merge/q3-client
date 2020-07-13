import React from 'react';
import { invoke } from 'lodash';
import { Location } from '@reach/router';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import { useToggle } from 'useful-state';

const getExpansionIcon = (isOpen) =>
  isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />;

const useStyle = makeStyles((theme) => ({
  btn: ({ isOpen }) => ({
    color: isOpen
      ? theme.palette.secondary.main
      : undefined,
  }),
  popper: {
    // offset for strange popper positioning
    width: 'calc(100% - 10px)',
    zIndex: 100000,
  },
}));

export const SubMenuItem = ({ label, isOpen, ...rest }) => (
  <Grid item>
    <Button {...rest} aria-haspopup aria-expanded={isOpen}>
      <span>{label}</span>
      {getExpansionIcon(isOpen)}
    </Button>
  </Grid>
);

SubMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
};

SubMenuItem.defaultProps = {
  isOpen: false,
};

const SubMenu = ({ children, location }) => {
  const inactive = -1;
  const anchorEl = React.useRef();
  const [activeItem, setActiveItem] = React.useState(
    inactive,
  );

  const { state: isOpen, open, close } = useToggle();
  const { btn, popper } = useStyle({ isOpen });
  const arr = React.Children.toArray(children);

  const onClose = () => {
    setActiveItem(inactive);
    close();
  };

  React.useEffect(() => {
    onClose();
  }, [location]);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box ref={anchorEl}>
        <Grid container alignItems="center">
          {arr.map((item, i) => {
            const active = activeItem === i;
            return React.cloneElement(item, {
              isOpen: active,
              className: btn,
              onClick: () => {
                if (!active) {
                  setActiveItem(i);
                  open();
                } else {
                  onClose();
                }
              },
            });
          })}
        </Grid>
        <Popper
          open={isOpen}
          anchorEl={anchorEl.current}
          className={popper}
          placement="bottom"
          disablePortal
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={350}>
              <Box width="100%">
                <Paper elevation={10}>
                  {invoke(
                    arr[activeItem],
                    'props.renderer',
                  )}
                </Paper>
              </Box>
            </Grow>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

SubMenu.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      renderer: PropTypes.func,
    }),
  ).isRequired,

  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

// eslint-disable-next-line
export default ({ children, ...props }) => (
  <Location>
    {({ location }) => (
      <SubMenu location={location} {...props}>
        {children}
      </SubMenu>
    )}
  </Location>
);
