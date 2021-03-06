import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { get } from 'lodash';
import Hidden from '@material-ui/core/Hidden';
import Page from '../containers/page';
import Collection from '../containers/collection';
import FilterProvider from '../containers/FilterProvider';
import UnsavedChanges from '../containers/UnsavedChanges';
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
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                height="100%"
                width="100%"
              >
                <CircularProgress />
              </Box>
            </Article>
          }
        >
          <Box position="relative">
            {!get(
              PageDetailProps,
              'disableUnsavedChanges',
              false,
            ) && <UnsavedChanges />}
            <PageDetail />
          </Box>
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
            <FilterProvider {...props} {...PageListProps}>
              <FilterComponent />
            </FilterProvider>
          </SidePanel>
        ) : null,
      });

      return (
        <Collection index {...PageListProps} {...props}>
          <Article asideComponent={can('filter')}>
            <Page
              index
              {...props}
              {...PageListProps}
              loadingComponent={<TableSkeleton />}
            >
              <PageList />
            </Page>
          </Article>
        </Collection>
      );
    },
  },
];
