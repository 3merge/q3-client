import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { get } from 'lodash';
import Hidden from '@material-ui/core/Hidden';
import Dialog from 'q3-ui-dialog';
import FilterIcon from '@material-ui/icons/Filter';
import Page from '../containers/page';
import Collection from '../containers/collection';
import FilterProvider from '../containers/FilterProvider';
import UnsavedChanges from '../containers/UnsavedChanges';
import Article from '../components/Article';
import SidePanel from '../components/SidePanel';
import TableSkeleton from '../components/TableSkeleton';
import { useAppContext } from '../hooks';
import { Context as ActionBarContext } from '../components/ActionBar';

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
            ) && (
              <Hidden mdDown implementation="css">
                <Box
                  alignItems="center"
                  display="flex"
                  position="absolute"
                  right="142px"
                  top="-65px"
                  zIndex={1200}
                  height="65px"
                >
                  <UnsavedChanges />
                </Box>
              </Hidden>
            )}
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

      const renderFilter = () => (
        <FilterProvider {...props} {...PageListProps}>
          <FilterComponent />
        </FilterProvider>
      );

      const FilterWrapper = ({ children }) => {
        return (
          <>
            {children}
            <Dialog
              variant="drawer"
              renderContent={renderFilter}
              renderTrigger={(onClick) => {
                const ctx = React.useContext(
                  ActionBarContext,
                );

                React.useEffect(() => {
                  const action = [
                    {
                      label: 'filter',
                      icon: FilterIcon,
                      sort: 2,
                      onClick: () =>
                        onClick({
                          target: {
                            name: 'filter',
                          },
                        }),
                    },
                  ];

                  ctx.add(action);

                  return () => {
                    ctx.remove(action);
                  };
                }, []);

                return null;
              }}
            />
          </>
        );
      };

      const { can } = useAppContext({
        filter: FilterComponent ? (
          <FilterWrapper>
            <SidePanel>{renderFilter()}</SidePanel>
          </FilterWrapper>
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
