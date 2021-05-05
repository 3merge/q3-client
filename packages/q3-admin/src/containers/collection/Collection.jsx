import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import { Definitions } from '../state';
import { useRootPath } from '../use';
import withPreRender from './withPreRender';
import CollectionConfig from '../CollectionConfig';
import Search from '../../components/Search';
import CollectionActions from '../CollectionActions';
import Back from '../back';

export const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

const Collection = ({
  children,
  collectionName,
  resourceName,
  resourceNameSingular,
  id,
  location,
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
        <Paper
          elevation={2}
          style={{
            zIndex: 2,
            position: 'relative',
            border: '1px solid var(--background-muted)',
            backgroundColor: 'var(--background-default)',
            boxSizing: 'border-box',
            height: 65,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            px={2}
            style={{ height: '100%' }}
            py={0.5}
          >
            <Typography
              color="inherit"
              component="h1"
              style={{
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
                margin: '0 3rem 0 0',
                fontSize: '1.33rem',
                lineHeight: 1,
                minWidth: 'calc(320px - 4.5rem)',
              }}
            >
              {id && <Back />}
              {collectionName}
            </Typography>
            <Search />
            <CollectionActions {...rest} />
          </Box>
        </Paper>
        {children}
      </CollectionConfig>
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
};

Collection.defaultProps = {
  id: null,
};

export default withPreRender(Collection);
