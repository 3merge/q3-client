import React from 'react';
import { map, first, find, isObject } from 'lodash';
import { Definitions } from '../../containers/state';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

const withCollectionUi = (Component, args) => {
  const ComponentDecoratedWithCachedUiPreference = (
    props,
  ) => {
    const { uis = [] } = React.useContext(Definitions);
    const uiOptions = map(uis, 'component');

    const { cached } = useCollectionUiLocalStorage(
      first(uiOptions),
      uiOptions,
    );

    return React.useMemo(
      () => <Component {...args} {...props} />,
      [cached],
    );
  };

  return ComponentDecoratedWithCachedUiPreference;
};

export default withCollectionUi;
