import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Verify as VerifyPreset } from 'q3-ui-forms/lib/presets';
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
        <VerifyPreset
          verificationCode={search.get('verificationCode')}
          id={search.get('id')}
        />
      }
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:verify')}
          </Typography>
          <Typography gutterBottom>
            {t('descriptions:verify')}
          </Typography>
        </>
      }
    />
  );
};
