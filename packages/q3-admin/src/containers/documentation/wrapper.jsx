import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FullScreen from '../../components/fullScreen';

const Wrapper = ({ children }) => {
  const { t } = useTranslation();
  return (
    <FullScreen
      title="documentation"
      renderTrigger={(open) => (
        <Box p={2}>
          <Typography variant="overline" gutterBottom>
            {t('titles:needHelp')}
          </Typography>
          <Typography gutterBottom>
            {t('labels:needHelp')}
          </Typography>
          <Button onClick={open} variant="outlined">
            {t('labels:docs')}
          </Button>
        </Box>
      )}
    >
      {children}
    </FullScreen>
  );
};

Wrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Wrapper;
