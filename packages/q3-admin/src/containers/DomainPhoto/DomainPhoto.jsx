import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';
import useDomainContext from '../../hooks/useDomainContext';

const DomainPhoto = () => {
  const { domain = {}, update } = useDomainContext();
  const { logo } = domain;

  return (
    <PhotoUpload
      collectionName="domain"
      field="logoFilePath"
      src={logo}
      upload={update}
    />
  );
};

export default DomainPhoto;
