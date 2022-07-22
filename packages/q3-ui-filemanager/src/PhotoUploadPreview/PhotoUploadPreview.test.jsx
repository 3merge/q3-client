import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import PhotoUploadPreview from './PhotoUploadPreview';
import useDropZoneAcceptedFiles from '../useDropZoneAcceptedFiles';
import DropZoneInputWrapper from '../DropZoneInputWrapper';

jest.mock('./styles', () => () => ({}));
jest.mock('../useDropZoneAcceptedFiles');

describe('PhotoUploadPreview', () => {
  it('should render src', () => {
    useDropZoneAcceptedFiles.mockReturnValue({});
    jest.spyOn(React, 'useContext').mockReturnValue({
      canSee: true,
    });

    expect(
      global
        .shallow(
          <PhotoUploadPreview src="http://google.ca" />,
        )
        .find('img')
        .prop('alt'),
    ).toMatch('preview');
  });

  it('should render placeholder', () => {
    useDropZoneAcceptedFiles.mockReturnValue({});
    jest.spyOn(React, 'useContext').mockReturnValue({
      canSee: true,
    });

    expect(
      global
        .shallow(<PhotoUploadPreview />)
        .find('img')
        .prop('alt'),
    ).toMatch('placeholder');
  });

  it('should render error', () => {
    useDropZoneAcceptedFiles.mockReturnValue({
      pending: [
        {
          error: true,
        },
      ],
    });
    jest.spyOn(React, 'useContext').mockReturnValue({
      canSee: true,
    });

    exists(
      global.shallow(<PhotoUploadPreview />).find(Alert),
    );
  });

  it('should render drop components', () => {
    useDropZoneAcceptedFiles.mockReturnValue({});
    jest.spyOn(React, 'useContext').mockReturnValue({
      canSee: true,
      canEdit: true,
      canCreate: true,
    });

    exists(
      global
        .shallow(<PhotoUploadPreview />)
        .find(DropZoneInputWrapper),
    );
  });

  it('should hide conditional components', () => {
    useDropZoneAcceptedFiles.mockReturnValue({
      pending: [
        {
          name: 'ok',
        },
      ],
    });

    jest.spyOn(React, 'useContext').mockReturnValue({
      canSee: true,
      canEdit: true,
      canCreate: false,
    });

    const el = global.shallow(<PhotoUploadPreview />);
    doesNotExist(el.find(Alert));
    doesNotExist(el.find(DropZoneInputWrapper));
  });
});
