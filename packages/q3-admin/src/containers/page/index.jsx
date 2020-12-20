import React from 'react';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import Graphic from 'q3-ui-assets';
import Loading from '../../components/loading';
import { slugify } from './utils';
import useOnRender from './useOnRender';
import { Definitions, Dispatcher, Store } from '../state';
import { useDataStore } from '../use';
import withSorting from './withSorting';
import withActiveFilter from './withActiveFilter';
import { useRefresh } from '../../hooks';

const PageChildren = ({
  children,
  id,
  hasEntered,
  fetching,
  fetchingError,
  loadingComponent,
}) =>
  !hasEntered || fetching ? (
    loadingComponent || <Loading id={id} />
  ) : (
    <Box>
      {fetchingError ? (
        <Box m={4}>
          <Graphic title="error" icon="Error" />
        </Box>
      ) : (
        children
      )}
    </Box>
  );

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

  const { fetching, fetchingError, poll } = state;

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

  useRefresh(poll, data);

  return (
    <PageChildren
      hasEntered={hasEntered}
      fetching={fetching}
      fetchingError={fetchingError}
      loadingComponent={loadingComponent}
      id={id}
    >
      <Dispatcher.Provider
        value={pick(state, [
          'get',
          'poll',
          'remove',
          'removeBulk',
          'patch',
          'put',
          'post',
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
    </PageChildren>
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

export default withActiveFilter(withSorting(Page));
