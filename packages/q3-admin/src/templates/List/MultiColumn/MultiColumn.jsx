import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from '@reach/router';
import { useToggle } from 'useful-state';
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
  const { toggle, state } = useToggle(true);
  const { can } = useAppContext({
    filter:
      Filter && state ? (
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
      <button type="button" onClick={toggle}>
        OPEN
      </button>
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
