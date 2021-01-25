import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { alphatizeKeys } from '../utils';
import useDir from '../useDir';
import Drop from '../Drop';
import FileListBreadcrumbs from '../FileListBreadcrumbs';
import FileListMake from '../FileListMake';

export const renderFilesAlphabetically = (
  Component,
  data,
  handleClick,
) =>
  alphatizeKeys(data).map((name, i) => (
    <Component
      key={i}
      name={name}
      onClick={() =>
        handleClick((state) => ({
          data: state.data[name],
          path: state.path.concat(name),
        }))
      }
    />
  ));

const withRenderFile = (File, renderer) => {
  const DropWrapper = ({
    children,
    listItems,
    ...props
  }) => (
    <Drop {...props}>
      {(pending) => {
        const files = [...pending, ...listItems];
        const fileNodes = children(
          files.map((file) => (
            <File
              {...props}
              {...file}
              key={file.url || file.name}
              error={file.error}
              name={file.name}
              size={file.size}
              url={file.url}
            />
          )),
        );

        return fileNodes;
      }}
    </Drop>
  );

  DropWrapper.defaultProps = {
    listItems: [],
  };

  DropWrapper.propTypes = {
    children: PropTypes.func.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.object),
  };

  const FileList = ({ files, ...props }) => {
    const {
      dir,
      setDir,
      getFilesForActivePath,
      makeDirectories,
      root,
      listItems,
    } = useDir(files);

    const handleDropChildren = (fileNodes) =>
      renderer(
        renderFilesAlphabetically(File, dir.data, setDir),
        fileNodes,
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
        <DropWrapper
          {...props}
          {...dir}
          root={root}
          listItems={listItems}
        >
          {handleDropChildren}
        </DropWrapper>
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

  FileList.__$internalComponents = {
    DropWrapper,
  };

  return FileList;
};

export default withRenderFile;
