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

  const MessageTypeChips = React.useMemo(
    () =>
      size(messageTypes) > 0 && (
        <Box className="notification-message-types" mt={1}>
          <Box display="inline-block" p={0.15}>
            <Chip
              onClick={handleMessageTypeChange()}
              color={isSelected()}
              label={t('all')}
            />
          </Box>
          {map(messageTypes, (type) => (
            <Box display="inline-block" key={type} p={0.15}>
              <Chip
                color={isSelected(type)}
                label={t(type)}
                onClick={handleMessageTypeChange(type)}
              />
            </Box>
          ))}
        </Box>
      ),
    [messageType],
  );

  return (
    <>
      {MessageTypeChips}
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
