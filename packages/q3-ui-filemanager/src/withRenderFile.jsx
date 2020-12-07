import React from 'react';
import PropTypes from 'prop-types';
import alpha from 'alphabetize-object-keys';
import { Box, Grid } from '@material-ui/core';
import useDir from './useDir';
import Drop from './Drop';
import FileListBreadcrumbs from './FileListBreadcrumbs';
import FileListMake from './FileListMake';

const withRenderFile = (File, isGrid) => {
  const FileList = ({ files, ...props }) => {
    const {
      dir,
      setDir,
      getFilesForActivePath,
      makeDirectories,
    } = useDir(files);

    const renderFile = (file, i) => (
      <File
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
    );

    const renderDirectoryUploadSurface = (
      listItems = [],
      children,
    ) => {
      return isGrid ? (
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
      ) : (
        <Drop {...props} root={dir.path.join('/')}>
          {(pending) => (
            <>
              {children}
              {[...pending, ...listItems].map(renderFile)}
            </>
          )}
        </Drop>
      );
    };

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
              <File
                name={name}
                onClick={() => {
                  setDir(({ data, path }) => ({
                    data: data[name],
                    path: path.concat(name),
                  }));
                }}
              />
            ) : null,
          ),
        )}
      </Box>
    );
  };

  FileList.defaultProps = {
    files: [],
  };

  FileList.propTypes = {
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

  return FileList;
};

export default withRenderFile;
