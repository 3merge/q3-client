import React from 'react';
import PropTypes from 'prop-types';
import { useToggle } from 'useful-state';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Slider from '../slider';

const useStyles = makeStyles((theme) => ({
  mobile: {
    display: 'block',
    width: 275,
    margin: theme.spacing(1),
    backgroundColor: '#FFF',
    color: '#000',
    position: 'fixed',
    padding: theme.spacing(1),
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 10000,
    [theme.breakpoints.down('sm')]: {
      top: 120,
    },
  },
}));

export const NotificationContent = ({
  message,
  description,
}) => {
  const { toggle, state } = useToggle();

  return (
    <Box>
      <Typography variant="body2" component="p">
        {message}
      </Typography>
      {description && (
        <>
          <Collapse in={state}>
            <Box>
              <Typography component="small">
                {description}
              </Typography>
            </Box>
          </Collapse>

          <Button
            color="secondary"
            size="small"
            onClick={toggle}
          >
            {state ? 'Less' : 'More'}
            {state ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )}
          </Button>
        </>
      )}
    </Box>
  );
};

NotificationContent.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Notification = ({ id, slides }) => {
  const { state, toggle, close } = useToggle(false);
  const { mobile } = useStyles();
  const DISMISSED = 'HAS_DISMISSED';

  const dismiss = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(id, DISMISSED);
      close();
    }
  }, []);

  React.useEffect(() => {
    const viewed = sessionStorage.getItem(id);
    if (!viewed || viewed !== DISMISSED || !id) toggle();
  }, [id]);

  return (
    <Collapse in={state}>
      <Box>
        <SnackbarContent
          open
          className={mobile}
          elevation={20}
          onClose={() => null}
          message={
            <>
              <Box
                position="absolute"
                right={-12}
                top={-12}
              >
                <IconButton
                  size="small"
                  onClick={dismiss}
                  aria-label="Dismiss notifications"
                  style={{
                    backgroundColor: red[900],
                    color: '#FFF',
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
              {slides.length > 1 ? (
                <Slider
                  withButtons
                  slides={slides.map((Component) => ({
                    Component: () =>
                      React.cloneElement(Component),
                  }))}
                />
              ) : (
                slides
              )}
            </>
          }
        />
      </Box>
    </Collapse>
  );
};

Notification.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Notification;
