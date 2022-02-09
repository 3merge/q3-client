import React from 'react';
import DomainPhoto from '../DomainPhoto';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';
import useDomainContext from '../../hooks/useDomainContext';
import useDomainLinks from '../../hooks/useDomainLinks';

const Domain = () => {
  const { domain = {} } = useDomainContext();
  const items = useDomainLinks();

  return (
    <SystemPageSubArchive
      items={items}
      photo={<DomainPhoto />}
      title={domain?.brand}
      subtitle={domain?.description}
    />
  );
};

export default Domain;
