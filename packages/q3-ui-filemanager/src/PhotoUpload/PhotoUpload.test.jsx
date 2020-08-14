import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {
  FileUploadPreview,
  FileUploadStatus,
} from './PhotoUpload';

const expectStatusText = (fileProps, expectedValue) =>
  expect(
    global
      .shallow(
        <FileUploadStatus
          onDelete={jest.fn()}
          file={fileProps}
        />,
      )
      .text(),
  ).toMatch(expectedValue);

const expectVisual = (src, el) =>
  expect(
    global
      .shallow(<FileUploadPreview src={src} />)
      .find(el),
  ).toHaveLength(1);

describe('PhotoUpload', () => {
  it('should display error text', () =>
    expectStatusText(
      { error: true },
      'photoFailedToUpload',
    ));

  it('should display click text', () =>
    expectStatusText(undefined, 'clickToSetPhoto'));

  it('should display loading text', () =>
    expectStatusText({}, 'uploadingPhoto'));

  it('should display loading text', () =>
    expectStatusText(
      { url: 'https://google.ca' },
      'unsetPhoto',
    ));

  it('should render image', () =>
    expectVisual('https://google.ca', 'img'));

  it('should render icon', () =>
    expectVisual(undefined, PhotoCameraIcon));
});
