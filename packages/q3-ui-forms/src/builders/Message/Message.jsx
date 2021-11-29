import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';

const Message = ({ error, message }) => {
  const { t } = useTranslation('descriptions');

  if (!message) return null;

  return (
    <Collapse in>
      <Box my={1}>
        <Alert severity={error ? 'error' : 'success'}>
          {t(message)}
        </Alert>
      </Box>
    </Collapse>
  );
};

Message.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
};

Message.defaultProps = {
  error: false,
  message: '',
};

export default Message;
