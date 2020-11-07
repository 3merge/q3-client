import React from 'react';
import CollectionDatasource from '../CollectionDatasource';

export default ({ resolvers, ...rest }) => {
  return <CollectionDatasource {...rest} />;
};
