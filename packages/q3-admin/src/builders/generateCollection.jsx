import React from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Page from '../containers/page';
import Collection from '../containers/collection';
import FilterProvider from '../containers/FilterProvider';
import UnsavedChanges from '../containers/UnsavedChanges';
import Search from '../containers/search';
import Article from '../components/Article';
import SidePanel from '../components/SidePanel';
import Tray from '../components/Tray';
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
        <Page id {...props} {...PageDetailProps}>
          <Tray>
            <Search {...PageDetailProps} />
            <UnsavedChanges />
          </Tray>
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
        <Collection index {...props}>
          <Tray>
            <Search {...PageDetailProps} />
          </Tray>
          <Article asideComponent={can('filter')}>
            <Page
              index
              {...props}
              {...PageListProps}
              loadingComponent={<TableSkeleton />}
            >
              <Fade in>
                <Box>
                  <PageList />
                </Box>
              </Fade>
            </Page>
          </Article>
        </Collection>
      );
    },
  },
];
