import React from 'react';
import Page from '../containers/page';
import Collection from '../containers/collection';
import CollectionList from '../containers/CollectionList';

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
    component: (props) => (
      <Collection index {...props}>
        <CollectionList index {...props} {...PageListProps}>
          <PageList />
        </CollectionList>
      </Collection>
    ),
  },
];
