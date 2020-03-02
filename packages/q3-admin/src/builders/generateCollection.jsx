import React from 'react';
import Page from '../containers/page';

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
  PageList,
  projection,
  ...etc
}) => [
  {
    id: true,
    ...getCollectionInformation(etc),
    component: (props) => (
      <Page id {...props}>
        <PageDetail />
      </Page>
    ),
  },
  {
    icon,
    index: true,
    ...getCollectionInformation(etc),
    component: (props) => (
      <Page index select={projection} {...props}>
        <PageList />
      </Page>
    ),
  },
];
