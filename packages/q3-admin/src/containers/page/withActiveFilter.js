import React from 'react';
import { Redirect } from '@reach/router';
import { get } from 'lodash';
import { useActiveFilter } from '../../hooks';

export default (Component) => (props) => {
  const { defaultQuery } = useActiveFilter(
    props.location.search,
  );

  if (
    get(props, 'location.search', '').startsWith('?') ||
    get(props, 'location.state.init') ||
    props.id ||
    !defaultQuery
  )
    return React.useMemo(
      () => React.createElement(Component, props),
      [props.location.search],
    );

  return React.createElement(Redirect, {
    to: defaultQuery,
    noThrow: true,
    state: {
      init: true,
    },
  });
};
