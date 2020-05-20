import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import FormBox from '../components/FormBox';

const PasswordResetNotice = () => {
  const { t } = useTranslation();

  return (
    <FormBox
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:passwordResetNotice')}
          </Typography>
          <Typography gutterBottom>
            {t('descriptions:passwordResetNotice')}
          </Typography>
        </>
      }
      renderBottom={
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="secondary"
          size="large"
        >
          Login
        </Button>
      }
    />
  );
};

export default PasswordResetNotice;
