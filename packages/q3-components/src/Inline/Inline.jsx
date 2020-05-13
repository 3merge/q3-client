import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useToggle } from 'useful-state';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { POPOVER_CLASS } from '../EditableTypography/constants';

const Inline = ({
  withHover,
  renderContent,
  renderTrigger,
  title,
}) => {
  const ref = React.useRef();
  const { state, open, close } = useToggle();

  const onMouseEnter = () => {
    open();
  };

  const onMouseLeave = () => {
    if (state && withHover) close();
  };

  return (
    <span id={title} ref={ref} onMouseLeave={onMouseLeave}>
      {renderTrigger(open, state, {
        'aria-owns': state ? title : undefined,
        'aria-haspopup': true,
        onMouseEnter,
        onKeyPress: onMouseEnter,
        tabIndex: 0,
      })}
      <Popover
        open={state}
        onClose={close}
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        elevation={15}
        transitionDuration={250}
        disableRestoreFocus
        className={POPOVER_CLASS}
      >
        <Box
          p={2}
          width={350}
          maxWidth="100%"
          className="q3-inline-popover"
          onMouseLeave={onMouseLeave}
          style={{ boxSizing: 'border-box' }}
        >
          <Box position="absolute" top="1rem" right="1rem">
            <IconButton size="small" onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            id="name"
            aria-label={title}
            variant="subtitle1"
            color="primary"
          >
            {title}
          </Typography>
          {renderContent(close)}
        </Box>
      </Popover>
    </span>
  );
};

Inline.propTypes = {
  renderContent: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  withHover: PropTypes.bool,
};

Inline.defaultProps = {
  withHover: false,
};

export default Inline;
