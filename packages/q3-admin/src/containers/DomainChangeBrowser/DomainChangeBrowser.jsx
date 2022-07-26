import React from 'react';
import { Typography } from '@material-ui/core';
import { PhotoUpload } from 'q3-ui-filemanager';
import { useTranslation } from 'q3-ui-locale';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

const DomainChangeBrowser = () => {
  const { t } = useTranslation('labels');
  const { domain = {}, update } = useDomainContext();
  const { favicon, photo } = domain;

  return (
    <SystemPageSub title="domainBrowserMedia">
      <Typography>{t('featuredPhoto')}</Typography>
      <PhotoUpload
        collectionName="domain"
        src={photo}
        upload={update}
      />
      <Typography>{t('favicon')}</Typography>
      <PhotoUpload
        collectionName="domain"
        field="faviconFilePath"
        src={favicon}
        upload={update}
      />
    </SystemPageSub>
  );
};

export default DomainChangeBrowser;
