import React from 'react';
import Recaptcha from 'reaptcha';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';

const Bot = ({ setFieldValue, errors }) => {
  const [loaded, setLoad] = React.useState(false);
  const { t } = useTranslation();

  const verifyRecaptcha = React.useCallback((response) => {
    setFieldValue('recaptcha', response);
  }, []);

  const onLoad = React.useCallback(() => {
    setLoad(true);
  }, [loaded]);

  return (
    <Box mt={1}>
      {!loaded && <CircularProgress size={16} />}
      <Grow in={loaded}>
        <>
          <Recaptcha
            onVerify={verifyRecaptcha}
            onLoad={onLoad}
            sitekey="6LfVZKYUAAAAAAHAoK7maiNPThppNaPT0-EfqPY-"
            theme="light"
          />
          {errors.recaptcha && (
            <FormHelperText error>
              {t('labels:recaptcha')}
            </FormHelperText>
          )}
        </>
      </Grow>
    </Box>
  );
};

Bot.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    recaptcha: PropTypes.oneOfType([
      PropTypes.string,
      null,
    ]),
  }).isRequired,
};

export default Bot;
