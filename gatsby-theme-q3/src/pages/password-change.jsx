import React from 'react';
import queryString from 'query-string';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { PasswordChange as PasswordChangePreset } from 'q3-ui-forms/lib/presets';
import Typography from '@material-ui/core/Typography';
import FormBox from '../components/FormBox';

export default (props) => {
  const { t } = useTranslation();
  const { passwordResetToken, email } = queryString.parse(
    get(props, 'location.search', ''),
    {
      decode: false,
    },
  );

  return (
    <FormBox
      renderBottom={
        <PasswordChangePreset
          email={email}
          passwordResetToken={passwordResetToken}
        />
      }
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:passwordChange')}
          </Typography>
          <Typography gutterBottom>
            {t('descriptions:passwordChange')}
          </Typography>
        </>
      }
    />
  );
};
