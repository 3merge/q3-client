import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reverify as ReverifyPreset } from 'q3-ui-forms/lib/presets';
import Typography from '@material-ui/core/Typography';
import FormBox from '../components/FormBox';

export default () => {
  const { t } = useTranslation();

  return (
    <FormBox
      renderBottom={<ReverifyPreset />}
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:reverify')}
          </Typography>
          <Typography gutterBottom>
            {t('descriptions:reverify')}
          </Typography>
        </>
      }
    />
  );
};
