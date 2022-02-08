import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';
import { useAuth } from 'q3-ui-permissions';
import FeaturedPhoto from '../FeaturedPhoto';
import useDomainContext from '../../hooks/useDomainContext';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';

const SystemInfo = () => {
  const { HideByField, ...domainAuth } = useAuth('domain');
  const emailAuth = useAuth('emails');
  const queueAuth = useAuth('queues');

  const { domain = {}, update } = useDomainContext();
  const { brand, description, logo } = domain;
  const items = [];

  if (domainAuth.canCreate)
    [
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
    ].forEach((item) => {
      items.push(item);
    });

  if (domainAuth.canCreateSub('resources'))
    items.push({
      text: 'domainI8n',
      to: '/system/i18n',
    });

  if (emailAuth.canSee)
    items.push({
      text: 'domainEmails',
      to: '/system/emails',
    });

  if (queueAuth.canSee)
    items.push({
      text: 'domainQueues',
      to: '/system/queues',
    });

  return (
    <SystemPageSubArchive
      items={items}
      photo={
        <HideByField op="Create" path="logo">
          <FeaturedPhoto
            src={logo}
            update={update}
            component={PhotoUpload}
            field="logo"
          />
        </HideByField>
      }
      title={brand}
      subtitle={description}
    />
  );
};
export default SystemInfo;
