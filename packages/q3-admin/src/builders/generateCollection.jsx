import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../containers/page';
import Collection from '../containers/collection';
import FilterProvider from '../containers/FilterProvider';
import UnsavedChanges from '../containers/UnsavedChanges';
import Search from '../components/Search';
import Article from '../components/Article';
import SidePanel from '../components/SidePanel';
import TableSkeleton from '../components/TableSkeleton';
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
        <Page
          id
          {...props}
          {...PageDetailProps}
          loadingComponent={
            <Article asideComponent={<SidePanel />}>
              <Box p={4}>
                <CircularProgress />
              </Box>
            </Article>
          }
        >
          <PageDetail>
            <UnsavedChanges />
          </PageDetail>
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

      const { can } = useAppContext({
        filter: FilterComponent ? (
          <SidePanel>
            <h2>Title</h2>
            <FilterProvider {...props} {...PageListProps}>
              <FilterComponent />
            </FilterProvider>
          </SidePanel>
        ) : null,
      });

      return (
        <Collection index {...props}>
          <Article asideComponent={can('filter')}>
            <Page
              index
              {...props}
              {...PageListProps}
              loadingComponent={<TableSkeleton />}
            >
              <PageList
                searchComponent={
                  <Search {...PageDetailProps} />
                }
              />
            </Page>
          </Article>
        </Collection>
      );
    },
  },
];
