import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Page from '../containers/page';
import Collection from '../containers/collection';
import FilterProvider from '../containers/FilterProvider';
import Article from '../components/Article';
import SidePanel from '../components/SidePanel';
import { useAppContext } from '../hooks';

export const getCollectionInformation = ({
  resourceName,
  resourceNameSingular,
  collectionName,
  ...rest
}) => ({
  resourceName,
  resourceNameSingular,
  collectionName: collectionName || resourceName,
  ...rest,
});

export default ({
  icon,
  PageDetail,
  PageDetailProps,
  PageList,
  PageListProps,
  ...etc
}) => [
  {
    id: true,
    ...getCollectionInformation(etc),
    component: (props) => (
      <Collection id {...props}>
        <Page id {...props} {...PageDetailProps}>
          <PageDetail />
        </Page>
      </Collection>
    ),
  },
  {
    icon,
    index: true,
    ...getCollectionInformation(etc),
    component: (props) => {
      const {
        filterComponent: FilterComponent,
      } = PageListProps;

      const { Redirect } = useAuth(props?.collectionName);

      const { can } = useAppContext({
        filter: FilterComponent ? (
          <SidePanel>
            <FilterProvider {...PageListProps}>
              <FilterComponent />
            </FilterProvider>
          </SidePanel>
        ) : null,
      });

      return (
        <Collection index {...props}>
          <Redirect op="Read" to="/">
            <Article asideComponent={can('filter')}>
              <Page index {...props} {...PageListProps}>
                <PageList />
              </Page>
            </Article>
          </Redirect>
        </Collection>
      );
    },
  },
];
