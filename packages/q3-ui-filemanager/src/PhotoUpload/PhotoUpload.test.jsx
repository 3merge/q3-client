import React from 'react';
import FileManagerContext from '../FileManagerContext';
import PhotoUpload from './PhotoUpload';

describe('PhotoUpload', () => {
  it('should set field to null', () => {
    const upload = jest.fn().mockImplementation(() =>
      // here.
      Promise.resolve(),
    );

    global
      .shallow(
        <PhotoUpload
          collectionName="test"
          upload={upload}
        />,
      )
      .find(FileManagerContext.Provider)
      .props()
      .value.remove();

    expect(upload).toHaveBeenCalledWith({
      featuredUpload: null,
    });
  });

  it('should intercept formData on post', () => {
    const upload = jest.fn().mockImplementation(() =>
      // here.
      Promise.resolve(),
    );

    const f = new FormData();
    f.append('other', {
      name: 'customName',
    });

    global
      .shallow(
        <PhotoUpload
          collectionName="test"
          field="other"
          upload={upload}
        />,
      )
      .find(FileManagerContext.Provider)
      .props()
      .value.post(f);

    expect(upload).toHaveBeenCalled();
    const [finalFormData] = upload.mock.lastCall;
    expect(
      finalFormData.get(
        'uploads/customName',
        expect.any(Object),
      ),
    );

    expect(finalFormData.get('other', 'customName'));
    expect(finalFormData.get('sensitive', false));
  });

  it('should foward form data', () => {
    const upload = jest.fn().mockImplementation(() =>
      // here.
      Promise.resolve(),
    );

    const f = new FormData();

    global
      .shallow(
        <PhotoUpload
          collectionName="test"
          upload={upload}
        />,
      )
      .find(FileManagerContext.Provider)
      .props()
      .value.post(f);

    expect(upload).toHaveBeenCalled();
    const [finalFormData] = upload.mock.lastCall;
    expect(finalFormData.get('featuredUploads')).toBeNull();
  });
});
