import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';
import FeaturedPhoto from '../FeaturedPhoto';
import useDomainContext from '../../hooks/useDomainContext';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';

const SystemInfo = () => {
  const { domain = {}, update } = useDomainContext();
  const { brand, description, logo } = domain;

  return (
    <SystemPageSubArchive
      items={[
        {
          text: 'domainBrowser',
          to: '/system/browser',
        },
        {
          text: 'domainManifest',
          to: '/system/manifest',
        },
        {
          text: 'domainPolicies',
          to: '/system/policies',
        },
        {
          text: 'domainI8n',
          to: '/system/i18n',
        },
        {
          text: 'domainEmails',
          to: '/system/emails',
        },
        {
          text: 'domainQueues',
          to: '/system/queues',
        },
      ]}
      photo={
        <FeaturedPhoto
          src={logo}
          update={update}
          component={PhotoUpload}
          field="logo"
        />
      }
      title={brand}
      subtitle={description}
    />
  );
};
export default SystemInfo;
