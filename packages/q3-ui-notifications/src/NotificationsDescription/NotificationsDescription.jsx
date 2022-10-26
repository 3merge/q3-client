import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';

const NotificationsDescription = ({ text }) => {
  const { t } = useTranslation('descriptions');

  return (
    <Box py={1} px={2}>
      <Typography>{t(text)}</Typography>
    </Box>
  );
};

NotificationsDescription.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NotificationsDescription;
