import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import { Definitions } from '../state';
import { useRootPath } from '../use';
import withPreRender from './withPreRender';

export const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

export const Collection = ({
  children,
  collectionName,
  resourceName,
  resourceNameSingular,
  id,
  location,
  segments,
}) => {
  const rootPath = useRootPath(location, id, resourceName);
  const directoryPath = getDirectoryPath(rootPath, id);
  const definitionsState = React.useMemo(
    () => ({
      id,
      collectionName,
      resourceNameSingular,
      resourceName,
      rootPath,
      directoryPath,
      location,
      segments,
    }),
    [location],
  );

  const setId = (value) => {
    if (browser.isBrowserReady()) {
      const m = document.querySelector('main');
      if (m) m.id = value;
    }
  };

  React.useLayoutEffect(() => {
    setId(collectionName);
    return () => {
      setId(null);
    };
  }, [collectionName]);

  return (
    <Definitions.Provider value={definitionsState}>
      {children}
    </Definitions.Provider>
  );
};

Collection.propTypes = {
  /**
   * The page internals.
   */
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,

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
   * Pre-defined filters
   */
  // eslint-disable-next-line
  segments: PropTypes.object,
};

Collection.defaultProps = {
  id: null,
  segments: {},
};

export default withPreRender(Collection);
