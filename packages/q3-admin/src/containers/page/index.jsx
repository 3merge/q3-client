import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Context from '../state';
import { slugify } from './utils';
import useOnRender from './useOnRender';

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
}) => {
  const url = slugify(collectionName, id);

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    select,
    runOnInit: true,
    location,
    url,
  });

  const hasEntered = useOnRender(
    { onEnter, onExit, onInit },
    { ...state, url },
  );

  return (
    <Context.Provider
      value={{
        id,
        collectionName,
        resourceName,
        resourceNameSingular,
        location,
        url,
        ...state,
      }}
    >
      {hasEntered ? children : 'Initializing...'}
    </Context.Provider>
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
};

Page.defaultProps = {
  id: null,
  onExit: null,
  onEnter: null,
  onInit: null,
  select: null,
};

export default Page;
