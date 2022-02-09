import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';
import { useAuth } from 'q3-ui-permissions';
import FeaturedPhoto from '../FeaturedPhoto';
import useDomainContext from '../../hooks/useDomainContext';

const DomainPhoto = () => {
  const { HideByField } = useAuth('domain');
  const { domain = {}, update } = useDomainContext();
  const { logo } = domain;

  return (
    <HideByField op="Create" path="logo">
      <FeaturedPhoto
        src={logo}
        update={update}
        component={PhotoUpload}
        field="logo"
      />
    </HideByField>
  );
};

export default DomainPhoto;
