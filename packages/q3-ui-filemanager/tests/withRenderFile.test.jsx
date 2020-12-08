import React from 'react';
import withRenderFile from '../src/withRenderFile';
import FileName from '../src/FileName';
import files from './fixtures/files.json';

const FileList = withRenderFile(FileName);

const renderFileList = (fileProps, result) => {
  const wrapper = global.mount(
    <FileList
      files={fileProps}
      onDrop={new Promise((resolve, reject) => resolve(''))}
    />,
  );
  expect(wrapper.find(FileName).exists()).toBe(result);
};

describe('withRenderFile', () => {
  it('should not render FileName when no files', () => {
    renderFileList([], false);
  });

  it('should render FileName when files exist', () => {
    renderFileList(files, true);
  });
});
