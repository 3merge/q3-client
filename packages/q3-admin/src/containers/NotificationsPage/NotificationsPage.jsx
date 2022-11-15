import React from 'react';
import Notifications from 'q3-ui-notifications';
import { Box } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import Article from '../../components/Article';
import Header from '../../components/Header';
import ConnectivityError from '../../components/ConnectivityError';
import Title from '../../components/Title';
import useStyle from './styles';

const NotificationsPage = (props) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  return (
    <Article>
      <Box className={cls.root} py={2} mb={4}>
        <Header>
          <Title>{t('notifications')}</Title>
        </Header>
        <ConnectivityError />
        <Notifications {...props} />
      </Box>
    </Article>
  );
};

export default NotificationsPage;
