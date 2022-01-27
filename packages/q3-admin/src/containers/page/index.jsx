import React from 'react';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import Graphic from 'q3-ui-assets';
import { browser } from 'q3-ui-helpers';
import Loading from '../../components/loading';
import { slugify } from './utils';
import useOnRender from './useOnRender';
import { Definitions, Dispatcher, Store } from '../state';
import { useDataStore } from '../use';
import withSorting from './withSorting';

const PageChildren = ({
  children,
  id,
  hasEntered,
  fetching,
  fetchingError,
  loadingComponent,
}) => {
  if (!hasEntered || fetching)
    return loadingComponent || <Loading id={id} />;

  if (fetchingError)
    return (
      <Box m={4}>
        <Graphic title="error" icon="Error" />
      </Box>
    );

  return children;
};

PageChildren.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  hasEntered: PropTypes.bool.isRequired,
  fetching: PropTypes.bool,
  fetchingError: PropTypes.bool,
  loadingComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
};

PageChildren.defaultProps = {
  id: undefined,
  loadingComponent: null,
  fetchingError: false,
  fetching: true,
};

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
  loadingComponent,
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
    runOnInit: true,
    location,
    url,
  });

  const { fetching, fetchingError } = state;

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
  loadingComponent: PropTypes.node,
};

Page.defaultProps = {
  onExit: null,
  onEnter: null,
  onInit: null,
  select: null,
  loadingComponent: null,
};

export default withSorting(Page);
