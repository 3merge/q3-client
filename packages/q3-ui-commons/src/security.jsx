import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReCaptcha } from 'react-recaptcha-google';
import CirclularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Security = ({ children, done }) => {
  const ref = React.createRef();
  const { t } = useTranslation('descriptions');
  const [token, setToken] = React.useState(null);

  const reload = () => {
    if (ref.current) {
      ref.current.reset();
      ref.current.execute();
    }
  };

  React.useEffect(reload, []);

  return (
    <>
      <ReCaptcha
        ref={ref}
        size="invisible"
        render="explicit"
        sitekey="6LcaL74UAAAAAFk493-sZj7Ci72W5EqMxnpPzbbC"
        onloadCallback={reload}
        verifyCallback={(v) => {
          setToken(v);
          done(true);
        }}
      />
      {token ? (
        children
      ) : (
        <Box p={6} align="center">
          <Typography variant="subtitle1" gutterBottom>
            {t('spam')}
          </Typography>
          <CirclularProgress />
        </Box>
      )}
    </>
  );
};

export default Security;
