import React from 'react';
import PropTypes from 'prop-types';
import { compact } from 'lodash';
import DomainPhoto from '../DomainPhoto';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';
import useDomainContext from '../../hooks/useDomainContext';
import useDomainLinks from '../../hooks/useDomainLinks';

const Domain = ({ items }) => {
  const { domain = {} } = useDomainContext();
  const domainItems = useDomainLinks();

  return (
    <SystemPageSubArchive
      items={compact(domainItems.concat(items))}
      photo={<DomainPhoto />}
      title={domain?.brand}
      subtitle={domain?.description}
    />
  );
};

Domain.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

Domain.defaultProps = { items: [] };

export default Domain;
