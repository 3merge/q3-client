import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import FormBox from '../components/FormBox';

const ReverifyNotice = () => {
  const { t } = useTranslation();

  return (
    <FormBox
      renderTop={
        <>
          <Typography variant="h1" gutterBottom>
            {t('titles:reverified')}
          </Typography>
          <Typography gutterBottom>
            {t('descriptions:reverified')}
          </Typography>
        </>
      }
    />
  );
};

export default ReverifyNotice;
