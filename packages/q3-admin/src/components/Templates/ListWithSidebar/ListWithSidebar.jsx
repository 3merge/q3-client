import React from 'react';
import PropTypes from 'prop-types';
import Article from '../../Article';
import { useAppContext } from '../../../hooks';
import CollectionDatasource from '../../../containers/CollectionDatasource';
import CollectionFilter from '../../../containers/CollectionFilter';
import SidePanel from '../../SidePanel';
import List from '../../../containers/table';

export default ({
  filterComponent: Filter,
  resolvers,
  ...rest
}) => {
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
      <CollectionDatasource {...rest}>
        <h1>HEADER</h1>
        <List {...rest} />
      </CollectionDatasource>
    </Article>
  );
};
