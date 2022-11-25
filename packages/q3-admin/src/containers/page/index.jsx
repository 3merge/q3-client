import React from 'react';
import { pick, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import { slugify } from './utils';
import useOnRender from './useOnRender';
import { Definitions, Dispatcher, Store } from '../state';
import { useDataStore } from '../use';
import useLocationClone from '../../hooks/useLocationClone';

export const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

export const executeOnChildren = (children, args = {}) =>
  typeof children === 'function'
    ? children(args)
    : children;

const Page = ({
  children,
  select,
  onEnter,
  onExit,
  onInit,
  onSearch,
  runOnInit,
  defaultLimitPreference,
  defaultSortPreference,
}) => {
  const {
    id,
    resourceNameSingular,
    collectionName,
    resourceName,
    location,
  } = React.useContext(Definitions);
  const url = slugify(collectionName, id);

  const clonedLocation = useLocationClone()
    .limit(defaultLimitPreference)
    .sort(defaultSortPreference)
    .build();

  const getLocation = () => {
    const output = id ? location : clonedLocation;
    return isFunction(onSearch) ? onSearch(output) : output;
  };

  const state = useRest({
    key: resourceNameSingular,
    // leave detail pages alone
    location: getLocation(),
    pluralized: resourceName,
    select,
    runOnInit,
    url,
  });

  const data = useDataStore({
    resourceNameSingular,
    resourceName,
    state,
    id,
  });

  const hasEntered = useOnRender(
    { onEnter, onExit, onInit },
    { ...state, url },
  );

  const storeState = React.useMemo(
    () => ({
      data,
      ...pick(state, [
        'total',
        'hasNextPage',
        'hasPrevPage',
        'fetching',
        'fetchingError',
        'location.search',
      ]),
    }),
    [state],
  );

  return hasEntered ? (
    <Dispatcher.Provider
      value={pick(state, [
        'get',
        'poll',
        'remove',
        'removeBulk',
        'patch',
        'patchBulk',
        'put',
        'post',
        'replace',
      ])}
    >
      <Store.Provider value={storeState}>
        {executeOnChildren(children, {
          ...state,
          id,
          data,
        })}
      </Store.Provider>
    </Dispatcher.Provider>
  ) : null;
};

Page.propTypes = {
  /**
   * A hook fired as the component mounts.
   * This is a render blocking callback.
   */
  onEnter: PropTypes.func,

  /**
   * A hook fired before the component unmounts.
   */
  onExit: PropTypes.func,

  /**
   * A hook fired on first paint.
   */
  onInit: PropTypes.func,
  /**
   * A hook first to overwrite search location.
   */
  onSearch: PropTypes.func,

  /**
   * The page internals.
   */
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,

  /**
   * Reduce payload by projecting which fields to include.
   */
  select: PropTypes.string,
  runOnInit: PropTypes.bool,
  defaultLimitPreference: PropTypes.number,
  defaultSortPreference: PropTypes.string,
};

Page.defaultProps = {
  onExit: null,
  onEnter: null,
  onInit: null,
  onSearch: null,
  select: null,
  runOnInit: true,
  defaultLimitPreference: 25,
  defaultSortPreference: '-updatedAt',
};

export default React.memo(Page);
