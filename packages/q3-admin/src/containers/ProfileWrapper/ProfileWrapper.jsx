import React from 'react';
import { Redirect } from '@reach/router';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import Collection from '../collection';
import CollectionList from '../CollectionList';

// eslint-disable-next-line
export default ({ children }) => {
  const state = React.useContext(AuthContext);
  const ref = get(state, 'state.profile.id');

  return ref ? (
    <Collection
      collectionName="q3-api-users"
      resourceNameSingular="user"
      resourceName="users"
      id={ref}
      location={{}}
    >
      <CollectionList>{children}</CollectionList>
    </Collection>
  ) : (
    <Redirect to="/login" noThrow />
  );
};
