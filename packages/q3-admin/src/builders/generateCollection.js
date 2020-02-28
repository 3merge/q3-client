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
          select: projection,
        },
        PageList,
      ),
  },
];
