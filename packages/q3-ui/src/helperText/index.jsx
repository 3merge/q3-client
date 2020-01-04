import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LiveHelp from '@material-ui/icons/LiveHelp';
import { useTranslation } from 'react-i18next';
import useOpen from 'useful-state/lib/useOpen';

const HelperText = ({ text }) => {
  const { t } = useTranslation('helpers');
  const { open, isOpen, anchorEl, close } = useOpen();
  const id = `helper-popover-${text}`;

  return (
    <Box
      display="inline-block"
      aria-owns={isOpen ? id : undefined}
      aria-haspopup="true"
      onMouseEnter={open}
      onMouseExit={close}
    >
      <LiveHelp />
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={close}
      >
        <Box p={1} style={{ maxWidth: 200 }}>
          <Typography>{t(text)}</Typography>
        </Box>
      </Popover>
    </Box>
  );
};

HelperText.propTypes = {
  text: PropTypes.string.isRequired,
};

HelperText.defaultProps = {};

export default HelperText;
