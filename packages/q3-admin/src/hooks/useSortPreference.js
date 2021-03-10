/* eslint-disable no-param-reassign */
import React from 'react';
import { navigate } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { get } from 'lodash';
import { url } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';

export default () => {
  const { state, update } = React.useContext(AuthContext);
  const { collectionName, location } = React.useContext(
    Definitions,
  );

  return (sort) => {
    const sorting = get(state, 'profile.sorting', {});
    sorting[collectionName] = sort;

    const q = new URLSearchParams(
      get(location, 'search', ''),
    );

    q.set('sort', sort);
    return update({ sorting }, () =>
      navigate(
        `?${url.toParamsString(q)}`,
        { state: { init: true } },
        { replace: true },
      ),
    );
  };
};
