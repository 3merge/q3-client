import React from 'react';
import withRenderFile from './withRenderFile';
import FileName from '../FileName';
import files from '../../tests/fixtures/files.json';
import support from '../../tests/support';

const FileList = withRenderFile(FileName);

const renderFileList = (fileProps, result) => {
  const wrapper = global.mount(
    <FileList
      files={fileProps}
      onDrop={support.onDrop.succeed}
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
