import React from 'react';
import PropTypes from 'prop-types';
import Tray from '../../components/Tray';
import Search from '../search';
import Article from '../../components/Article';
import { useAppContext } from '../../hooks';
import CollectionDatasource from '../CollectionDatasource';
import CollectionListFilter from '../CollectionListFilter';

export default ({
  filterComponent: Filter,
  resolvers,
  ...rest
}) => {
  const { can } = useAppContext({
    filter: Filter ? (
      <CollectionListFilter {...rest}>
        <Filter />
      </CollectionListFilter>
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
