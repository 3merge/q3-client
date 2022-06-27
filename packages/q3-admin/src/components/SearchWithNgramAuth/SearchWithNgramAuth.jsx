import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Search from '../Search';
import { Definitions } from '../../containers/state';

const SearchWithNgramAuth = () => {
  const { collectionName } = React.useContext(Definitions);
  const { canSeeSub } = useAuth(collectionName);
  return canSeeSub('grams') ? <Search /> : null;
};

export default SearchWithNgramAuth;
