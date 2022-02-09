import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { IconButton } from '@material-ui/core';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import {
  FileUploadPreview,
  FileUploadStatus,
} from './PhotoUpload';

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

const expectVisual = (src, el) =>
  expect(
    global
      .shallow(<FileUploadPreview src={src} />)
      .find(el),
  ).toHaveLength(1);

describe('PhotoUpload', () => {
  it('should render nothing', () => {
    doesNotExist(
      global.shallow(<FileUploadStatus />).find(IconButton),
    );
  });

  it('should render button', () => {
    exists(
      global
        .shallow(
          <FileUploadStatus
            onDelete={jest.fn()}
            file={{
              url: 'https://google.ca',
            }}
          />,
        )
        .find(IconButton),
    );
  });

  it('should call alert', () => {
    global.alert = jest.fn();

    global.shallow(
      <FileUploadStatus
        onDelete={jest.fn()}
        file={{
          error: 'Whoops!',
        }}
      />,
    );

    expect(global.alert).toHaveBeenCalledWith(
      'photoFailedToUpload',
    );
  });

  it('should render image', () =>
    expectVisual('https://google.ca', 'img'));

  it('should render icon', () =>
    expectVisual(undefined, PhotoCameraIcon));
});
