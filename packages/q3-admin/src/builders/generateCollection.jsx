import React from 'react';
import Box from '@material-ui/core/Box';
import Page from '../containers/page';
import Collection from '../containers/collection';
import FilterProvider from '../containers/FilterProvider';
import Article from '../components/Article';
import { useUnsavedChanges } from '../hooks';

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
    component: (props) => {
      // integrated with q3-ui-forms
      useUnsavedChanges();

      return (
        <Collection id {...props}>
          <Page id {...props} {...PageDetailProps}>
            <Box position="relative">
              <PageDetail />
            </Box>
          </Page>
        </Collection>
      );
    },
  },
  {
    icon,
    index: true,
    ...getCollectionInformation(etc),
    component: (props) => (
      <FilterProvider {...props} {...PageListProps}>
        <Collection index {...PageListProps} {...props}>
          <Article>
            <Page index {...props} {...PageListProps}>
              <PageList />
            </Page>
          </Article>
        </Collection>
      </FilterProvider>
    ),
  },
];
