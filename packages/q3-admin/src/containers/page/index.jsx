import React from 'react';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Loading from '../../components/loading';
import ErrorView from '../../components/error';
import { slugify } from './utils';
import useOnRender from './useOnRender';
import { Definitions, Dispatcher, Store } from '../state';
import { useDataStore, useViewResolutions } from '../use';

/**
 * <code>import { Page } from 'q3-admin'; </code>
 */
const Page = ({
  children,
  collectionName,
  resourceName,
  select,
  resourceNameSingular,
  id,
  location,
  onEnter,
  onExit,
  onInit,
  viewResolutions,
}) => {
  const [rootPath] = React.useState(location.pathname);

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

  const exclusions = useViewResolutions(
    viewResolutions,
    data,
  );

  return (
    <Definitions.Provider
      value={{
        id,
        exclusions,
        collectionName,
        resourceNameSingular,
        resourceName,
        rootPath,
      }}
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
          {!hasEntered || fetching ? (
            <Fade in timeout={350}>
              <Loading id={id} />
            </Fade>
          ) : (
            <Fade in timeout={350}>
              <Box>
                {fetchingError ? (
                  <Box m={4}>
                    <ErrorView />
                  </Box>
                ) : (
                  children
                )}
              </Box>
            </Fade>
          )}
        </Store.Provider>
      </Dispatcher.Provider>
    </Definitions.Provider>
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
  children: PropTypes.node.isRequired,

  /**
   * The directory to call. For example, defining "foo" would send requests to "http://localhost/foo".
   */
  collectionName: PropTypes.string.isRequired,

  /**
   * The key inside the API response payload containing a list of documents.
   */
  resourceName: PropTypes.string.isRequired,

  /**
   * The key inside API response payload containing a single document.
   */
  resourceNameSingular: PropTypes.string.isRequired,

  /**
   * This value is appended to "collectionName" for document-specific queries.
   */
  id: PropTypes.string,

  /**
   * Location props passed via @reach/router
   */
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,

  /**
   * Reduce payload by projecting which fields to include.
   */
  select: PropTypes.string,

  /**
   * Used to hide/display tabs based on state or role.
   */
  viewResolutions: PropTypes.shape({}),
};

Page.defaultProps = {
  id: null,
  onExit: null,
  onEnter: null,
  onInit: null,
  select: null,
  viewResolutions: {},
};

export default Page;
