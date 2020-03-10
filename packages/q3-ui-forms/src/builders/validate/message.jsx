import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import useStyle from './useStyle';

const Message = ({ text }) => {
  const { t } = useTranslation();
  const isString = typeof text === 'string';

  const doesStatusStartWith = (name) =>
    isString ? !!text.startsWith(name) : false;

  const isError = doesStatusStartWith('Error:');
  const isSuccessful = doesStatusStartWith('Success:');
  const { inlineMsg } = useStyle({
    isError,
    isSuccessful,
  });

  return isString && (isSuccessful || isError) ? (
    <Typography
      className={inlineMsg}
      component="small"
      gutterBottom
    >
      {t(`descriptions:${text.split(':').pop()}`)}
    </Typography>
  ) : null;
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
