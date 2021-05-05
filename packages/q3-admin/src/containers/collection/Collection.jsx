import React from 'react';
import PropTypes from 'prop-types';
import { Definitions } from '../state';
import { useRootPath } from '../use';
import withPreRender from './withPreRender';
import CollectionConfig from '../CollectionConfig';
import CollectionHeader from '../CollectionHeader';

export const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

const Collection = ({
  children,
  collectionName,
  resourceName,
  resourceNameSingular,
  id,
  location,
  disableHeader,
  segments,
  options,
  ...rest
}) => {
  const rootPath = useRootPath(location, id, resourceName);
  const directoryPath = getDirectoryPath(rootPath, id);

  return (
    <Definitions.Provider
      value={{
        id,
        collectionName,
        resourceNameSingular,
        resourceName,
        rootPath,
        directoryPath,
        location,
        segments,
      }}
    >
      <CollectionConfig options={options}>
        {!disableHeader && (
          <CollectionHeader
            {...rest}
            collectionName={collectionName}
            id={id}
          />
        )}
        {children}
      </CollectionConfig>
    </Definitions.Provider>
  );
};

Collection.propTypes = {
  disableHeader: PropTypes.bool,

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
};

Collection.defaultProps = {
  disableHeader: false,
  id: null,
};

export default withPreRender(Collection);
