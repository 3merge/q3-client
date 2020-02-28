import React from 'react';
import PropTypes from 'prop-types';
import { useToggle } from 'useful-state';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Slider from '../slider';

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

const Notification = ({ slides }) => (
  <SnackbarContent
    open
    onClose={() => null}
    style={{
      display: 'block',
      width: 450,
      margin: '1rem',
      backgroundColor: '#FFF',
      color: '#000',
      position: 'fixed',
      right: 0,
      top: 0,
    }}
    message={
      slides.length > 1 ? (
        <Slider
          withButtons
          slides={slides.map((Component) => ({
            Component: () => React.cloneElement(Component),
          }))}
        />
      ) : (
        slides
      )
    }
  />
);

Notification.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Notification;
