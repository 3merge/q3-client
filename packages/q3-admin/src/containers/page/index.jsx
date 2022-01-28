import React from 'react';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import { browser } from 'q3-ui-helpers';
import { slugify } from './utils';
import useOnRender from './useOnRender';
import { Definitions, Dispatcher, Store } from '../state';
import { useDataStore } from '../use';
import withSorting from './withSorting';

export const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

export const executeOnChildren = (children, args = {}) =>
  typeof children === 'function'
    ? children(args)
    : children;

export const usePrevLocation = (id, location) =>
  React.useEffect(() => {
    if (!id)
      browser.proxySessionStorageApi(
        'setItem',
        'prevState',
        location?.pathname + location?.search,
      );
  }, [location]);

const Page = ({
  children,
  select,
  onEnter,
  onExit,
  onInit,
  runOnInit,
}) => {
  const {
    id,
    resourceNameSingular,
    collectionName,
    resourceName,
    location,
  } = React.useContext(Definitions);
  const url = slugify(collectionName, id);

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    select,
    runOnInit,
    location,
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

  usePrevLocation(id, location);

  if (!hasEntered) return null;
  // I'll come back to this.

  return (
    <Dispatcher.Provider
      value={pick(state, [
        'get',
        'poll',
        'remove',
        'removeBulk',
        'patch',
        'put',
        'post',
        'replace',
      ])}
    >
      <Store.Provider
        value={{
          data,
          ...pick(state, [
            'total',
            'hasNextPage',
            'hasPrevPage',
            'fetching',
            'fetchingError',
          ]),
        }}
      >
        {executeOnChildren(children, {
          ...state,
          id,
          data,
        })}
      </Store.Provider>
    </Dispatcher.Provider>
  );
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
};

Page.defaultProps = {
  onExit: null,
  onEnter: null,
  onInit: null,
  select: null,
  runOnInit: true,
};

export default withSorting(Page);
