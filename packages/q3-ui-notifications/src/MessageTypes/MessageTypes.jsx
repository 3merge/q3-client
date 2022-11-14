import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { map, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';

const MessageTypes = ({ children, messageTypes }) => {
  const [messageType, setMessageType] = React.useState();
  const { t } = useTranslation('labels');

  const handleMessageTypeChange = (newState) => () =>
    setMessageType(newState);

  const isSelected = (state) =>
    messageType === state ? 'secondary' : undefined;

  return (
    <>
      {size(messageTypes) > 0 && (
        <Box className="notification-message-types" mt={1}>
          <Chip
            onClick={handleMessageTypeChange()}
            color={isSelected()}
            label={t('all')}
          />
          {map(messageTypes, (type) => (
            <Chip
              key={type}
              onClick={handleMessageTypeChange(type)}
              color={isSelected(type)}
              label={t(type)}
            />
          ))}
        </Box>
      )}
      {children(messageType)}
    </>
  );
};

MessageTypes.defaultProps = {
  messageTypes: [],
};

MessageTypes.propTypes = {
  children: PropTypes.func.isRequired,
  messageTypes: PropTypes.arrayOf(PropTypes.string),
};

export default MessageTypes;
