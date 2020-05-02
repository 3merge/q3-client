import React from 'react';
import { useTranslation } from 'react-i18next';
import { PasswordReset as PasswordResetPreset } from 'q3-ui-forms/lib/presets';
import Typography from '@material-ui/core/Typography';
import FormBox from '../components/FormBox';

export default () => {
  const { t } = useTranslation();

  return (
    <FormBox
      renderBottom={<PasswordResetPreset />}
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:passwordReset')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t('descriptions:passwordReset')}
          </Typography>
        </>
      }
    />
  );
};
