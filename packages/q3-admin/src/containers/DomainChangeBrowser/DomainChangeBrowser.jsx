import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PhotoUpload } from 'q3-ui-filemanager';
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import SystemPageSub from '../../components/SystemPageSub';
import FeaturedPhoto from '../FeaturedPhoto';
import useDomainContext from '../../hooks/useDomainContext';

const DomainChangeBrowser = () => {
  const { HideByField } = useAuth('domain');
  const { t } = useTranslation('labels');
  const { domain = {}, update } = useDomainContext();
  const { favicon, photo } = domain;

  return (
    <SystemPageSub title="domainBrowserMedia">
      <HideByField path="favicon" op="Create">
        <Typography>{t('favicon')}</Typography>
        <Box width={180}>
          <FeaturedPhoto
            src={favicon}
            update={update}
            component={PhotoUpload}
            field="favicon"
          />
        </Box>
        <Typography>{t('featuredPhoto')}</Typography>
        <Box width={180}>
          <FeaturedPhoto
            src={photo}
            update={update}
            component={PhotoUpload}
          />
        </Box>
      </HideByField>
    </SystemPageSub>
  );
};

export default DomainChangeBrowser;
