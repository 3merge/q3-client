import React from 'react';
import PropTypes from 'prop-types';
import { mergeWith, setWith, get, map } from 'lodash';
import { array } from 'q3-ui-helpers';
import alpha from 'alphabetize-object-keys';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useAuth } from 'q3-ui-permissions';
import FileListBreadcrumbs from '../FileListBreadcrumbs';
import FileListMake from '../FileListMake';
import File from '../File';
import Drop from '../Drop';
import FileName from '../FileName';

const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue))
    return objValue.concat(srcValue);

  return undefined;
};

const getPath = (filename) => {
  const dir = filename.split('/');
  dir.pop();
  dir.push('default');
  return dir.join('.');
};

const removeFileExtension = (filename) =>
  filename
    ? filename.substring(0, filename.lastIndexOf('.')) ||
      filename
    : '';

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
    .reduce(
      (acc, next) => mergeWith(acc, next, customizer),
      {},
    );

const FileList = ({
  disableDrop,
  disableDelete,
  files,
  ...props
}) => {
  // eslint-disable-next-line
  const { collectionName } = props;
  const { HideByField, canCreateSub } =
    useAuth(collectionName);
  const [dir, setDir] = React.useState({
    data: {},
    path: [],
  });

  const getFilesForActivePath = React.useCallback(
    (data) => {
      const structuredFiles = makeDirectories(data);
      const { path = [] } = dir;
      return array.hasLength(path)
        ? get(structuredFiles, path, {})
        : structuredFiles;
    },
    [dir],
  );

  React.useEffect(() => {
    setDir((prevState) => ({
      ...prevState,
      data: getFilesForActivePath(files),
    }));
  }, [files]);

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
      disableDelete={disableDelete}
    />
  );

  const renderDirectoryUploadSurface = (
    listItems = [],
    children,
  ) =>
    canCreateSub('uploads') && !disableDrop ? (
      <Drop {...props} root={dir.path.join('/')}>
        {(pending) => (
          <>
            {children}
            {[...pending, ...listItems].map(renderFile)}
          </>
        )}
      </Drop>
    ) : (
      <Box mt={1}>{map(listItems, renderFile)}</Box>
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
        {!disableDrop && (
          <Grid item>
            <HideByField op="Create" path="uploads">
              <FileListMake setState={setDir} state={dir} />
            </HideByField>
          </Grid>
        )}
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
  disableDrop: false,
  disableDelete: false,
  files: [],
};

FileList.propTypes = {
  disableDrop: PropTypes.bool,
  disableDelete: PropTypes.bool,
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
