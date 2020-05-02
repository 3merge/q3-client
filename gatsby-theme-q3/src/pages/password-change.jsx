import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { PasswordChange as PasswordChangePreset } from 'q3-ui-forms/lib/presets';
import Typography from '@material-ui/core/Typography';
import FormBox from '../components/FormBox';

export default (props) => {
  const { t } = useTranslation();
  const search = new URLSearchParams(
    get(props, 'location.search', ''),
  );

  return (
    <FormBox
      renderBottom={
        <PasswordChangePreset
          email={search.get('email')}
          passwordResetToken={search.get(
            'passwordResetToken',
          )}
        />
      }
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:passwordChange')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t('descriptions:passwordChange')}
          </Typography>
        </>
      }
    />
  );
};
