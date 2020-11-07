import React from 'react';
import Page from '../containers/CollectionDetail';
import Collection from '../containers/collection';
import { Templates } from '../containers/state';

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
      const { List } = React.useContext(Templates);

      return (
        <Collection index {...props}>
          <List {...props} {...PageListProps} />
        </Collection>
      );
    },
  },
];
