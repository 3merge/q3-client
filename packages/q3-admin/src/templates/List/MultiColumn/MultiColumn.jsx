import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from '@reach/router';
import Article from '../../../components/Article';
import { useAppContext } from '../../../hooks';
import CollectionDatasource from '../../../containers/CollectionDatasource';
import CollectionFilter from '../../../containers/CollectionFilter';
import SidePanel from '../../../components/SidePanel';
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

  const n = useNavigate();
  const { pathname } = useLocation();

  return (
    <Article asideComponent={can('filter')}>
      <h1>HEADER</h1>
      <input
        onChange={(e) =>
          n(`${pathname}?search=${e.target.value}`)
        }
      />
      <CollectionDatasource {...rest}>
        <List {...rest} />
      </CollectionDatasource>
    </Article>
  );
};
