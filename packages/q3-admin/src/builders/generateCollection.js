import React from 'react';
import Page from '../containers/page';

export const getCollectionInformation = ({
  resourceName,
  resourceNameSingular,
  collectionName,
}) => ({
  resourceName,
  resourceNameSingular,
  collectionName: collectionName || resourceName,
});

export default ({ icon, PageDetail, PageList, ...etc }) => [
  {
    id: true,
    ...getCollectionInformation(etc),
    component: (props) =>
      React.createElement(
        Page,
        {
          ...props,
          id: true,
        },
        PageDetail,
      ),
  },
  {
    icon,
    index: true,
    ...getCollectionInformation(etc),
    component: (props) =>
      React.createElement(
        Page,
        {
          ...props,
          index: true,
        },
        PageList,
      ),
  },
];
