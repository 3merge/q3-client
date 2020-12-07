import React from 'react';
import PropTypes from 'prop-types';
import alpha from 'alphabetize-object-keys';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FileListBreadcrumbs from '../FileListBreadcrumbs';
import FileListMake from '../FileListMake';
import Drop from '../Drop';
import FolderGrid from './FolderGrid';
import useDir from '../useDir';

const FileGridList = ({ files, ...props }) => {
  const {
    dir,
    setDir,
    getFilesForActivePath,
    makeDirectories,
  } = useDir(files);

  const renderFile = (file, i) => (
    <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
      <FolderGrid
        {...props}
        {...file}
        key={i}
        // cannot deconstruct properties of the File Api
        // so we must explicitly assign here
        error={file.error}
        name={file.name}
        size={file.size}
        url={file.url}
      />
    </Grid>
  );

  const renderDirectoryUploadSurface = (
    listItems = [],
    children,
  ) => (
    <Drop {...props} root={dir.path.join('/')}>
      {(pending) => (
        <Grid container spacing={3}>
          {children}
          <Grid container item spacing={3}>
            {[...pending, ...listItems].map(renderFile)}
          </Grid>
        </Grid>
      )}
    </Drop>
  );

  return (
    <Box p={1}>
      <Grid
        alignItems="center"
        justify="space-between"
        container
      >
        <Grid item>
          <FileListBreadcrumbs
            getFilesForActivePath={getFilesForActivePath}
            files={makeDirectories(files)}
            setState={setDir}
            state={dir}
          />
        </Grid>
        <Grid item>
          <FileListMake setState={setDir} state={dir} />
        </Grid>
      </Grid>
      {renderDirectoryUploadSurface(
        dir.data.default,
        Object.keys(alpha(dir.data)).map((name) =>
          name !== 'default' ? (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <FolderGrid
                name={name}
                onClick={() => {
                  setDir(({ data, path }) => ({
                    data: data[name],
                    path: path.concat(name),
                  }));
                }}
              />
            </Grid>
          ) : null,
        ),
      )}
    </Box>
  );
};

FileGridList.defaultProps = {
  files: [],
};

FileGridList.propTypes = {
  /**
   * Files will sort into directories automatically based on the file name.
   * For instance, "foo/bar.csv" will only be available for download in the child directory.
   */
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};

export default FileGridList;
