import React from 'react';
import PropTypes from 'prop-types';
import Tray from '../../components/Tray';
import Search from '../search';
import Article from '../../components/Article';
import { useAppContext } from '../../hooks';
import CollectionDatasource from '../CollectionDatasource';
import CollectionFilter from '../CollectionFilter';
import SidePanel from '../../components/SidePanel';

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
    <>
      <Tray>
        <Search resolvers={resolvers} />
      </Tray>
      <Article asideComponent={can('filter')}>
        <CollectionDatasource {...rest} />
      </Article>
    </>
  );
};
