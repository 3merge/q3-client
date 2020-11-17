import React from 'react';
import Page from '../containers/CollectionDetail';
import Collection from '../containers/collection';
import * as Templates from '../templates';

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
      const { templateName } = PageListProps;
      const El =
        Templates.List[templateName || 'MultiColumn'];

      return (
        <Collection index {...props}>
          <El {...props} {...PageListProps} />
        </Collection>
      );
    },
  },
];
