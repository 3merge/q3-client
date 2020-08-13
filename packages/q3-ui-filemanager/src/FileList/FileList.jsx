import React from 'react';
import PropTypes from 'prop-types';
import { merge, setWith } from 'lodash';
import alpha from 'alphabetize-object-keys';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FileListBreadcrumbs from '../FileListBreadcrumbs';
import FileListMake from '../FileListMake';
import File from '../File';
import Drop from '../Drop';
import FileName from '../FileName';

const getPath = (filename) => {
  const dir = filename.split('/');
  dir.pop();
  dir.push('default');
  return dir.join('.');
};

const removeFileExtension = (filename) =>
  filename.substring(0, filename.lastIndexOf('.')) ||
  filename;

export const makeDirectories = (a = []) =>
  a
    .map((next) =>
      setWith(
        {},
        // cannot use regular set in case there are dirs with numbers
        // otherwise, it creates an array instead
        getPath(removeFileExtension(next.relativePath)),
        [next],
        Object,
      ),
    )
    .reduce((acc, next) => merge({}, acc, next), {});

const FileList = ({ files, ...props }) => {
  const dirfiles = makeDirectories(files);
  const [dir, setDir] = React.useState({
    data: dirfiles,
    path: [],
  });

  const renderFile = (file, i) => (
    <File
      key={i}
      name={file.name}
      url={file.url}
      size={file.size}
    />
  );

  const renderDirectoryUploadSurface = (
    listItems = [],
    children,
  ) => (
    <Drop {...props} root={dir.path.join('/')}>
      {(pending) => (
        <>
          {children}
          {[...pending, ...listItems].map(renderFile)}
        </>
      )}
    </Drop>
  );

  return (
    <Box p={1}>
      <Grid container justify="space-between">
        <Grid item>
          <FileListBreadcrumbs
            files={dirfiles}
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
            <FileName
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

export default FileList;
