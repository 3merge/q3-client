import React from 'react';
import Page from '../containers/page';

export default ({
  resourceName,
  collectionName,
  icon,
  PageDetail,
  PageList,
}) => [
  {
    id: true,
    collectionName,
    resourceName,
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
    index: true,
    collectionName,
    resourceName,
    icon,
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
