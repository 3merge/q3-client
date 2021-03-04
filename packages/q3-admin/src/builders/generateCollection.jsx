import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from 'q3-ui-dialog';
import IconButton from 'q3-ui/lib/iconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import FiltersSavedTabs from '../containers/FiltersSavedTabs';
import FiltersSaved from '../containers/FiltersSaved';
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
            <Box py={4}>
              <FiltersSaved {...props} {...PageListProps} />
            </Box>
            Page settings / Show Archives
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
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography
                        variant="h3"
                        component="h2"
                      >
                        {etc.collectionName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Dialog
                        renderTrigger={(onClick) => (
                          <IconButton
                            icon={FilterListIcon}
                            label="filters"
                            buttonProps={{
                              onClick,
                            }}
                          />
                        )}
                        renderContent={() => (
                          <FilterProvider
                            {...props}
                            {...PageListProps}
                          >
                            <FilterComponent />
                          </FilterProvider>
                        )}
                      />
                    </Grid>

                    <Grid item xs>
                      <Search {...PageDetailProps} />
                    </Grid>
                  </Grid>
                }
              />
            </Page>
          </Article>
        </Collection>
      );
    },
  },
];
