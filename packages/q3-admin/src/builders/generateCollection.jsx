import React from 'react';
import Page from '../containers/page';
import Collection from '../containers/collection';

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
        <Page index {...props} {...PageListProps}>
          <PageList />
        </Page>
      </Collection>
    ),
  },
];
