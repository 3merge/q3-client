import React from 'react';
import PropTypes from 'prop-types';
import Article from '../../components/Article';
import { useAppContext } from '../../hooks';
import CollectionDatasource from '../CollectionDatasource';
import CollectionFilter from '../CollectionFilter';
import SidePanel from '../../components/SidePanel';

export default ({ filterComponent: Filter, ...rest }) => {
  const { can } = useAppContext({
    filter: Filter ? (
      <SidePanel>
        <CollectionFilter {...rest}>
          <Filter />
        </CollectionFilter>
      </SidePanel>
    ) : null,
  });

  return (
    <Article asideComponent={can('filter')}>
      <CollectionDatasource {...rest} />
    </Article>
  );
};
