import React from 'react';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import CallToAction from '../callToAction';
import errorImg from '../../images/error.png';

export default () => {
  const { t } = useTranslation();
  return (
    <Paper elevation={0}>
      <CallToAction
        imgSrc={errorImg}
        title={t('titles:serverError')}
        description={t('descriptions:serverError')}
      />
    </Paper>
  );
};
