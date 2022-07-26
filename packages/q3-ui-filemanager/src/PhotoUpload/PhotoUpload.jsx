import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import FileManagerContext from '../FileManagerContext';
import FileManagerAuthContext from '../FileManagerAuthContext';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import useUploadsAuth from '../useUploadsAuth';
import PhotoUploadPreview from '../PhotoUploadPreview';

const FEATURED_UPLOAD_FIELD = 'featuredUpload';

const PhotoUpload = ({
  collectionName,
  field,
  upload,
  ...props
}) => (
  <FileManagerAuthContext.Provider
    value={useUploadsAuth(collectionName, {
      field,
    })}
  >
    <FileManagerContext.Provider
      value={React.useMemo(
        () => ({
          post: (formData) => {
            try {
              // only ever a single file
              const [[fileName, photo]] =
                formData.entries();

              if (field !== FEATURED_UPLOAD_FIELD) {
                formData.append(
                  `uploads/${fileName}`,
                  photo,
                );

                formData.set(field, fileName);
                formData.set('sensitive', false);
              } else {
                formData.append(field, photo, fileName);
              }
            } catch (e) {
              // noop
            }

            return upload(formData);
          },
          remove: () =>
            upload({
              [field]: null,
            }),
        }),
        [field],
      )}
    >
      <FileManagerCurrentContext.Provider
        // not going to bother with directories here
        // but our dropzone hook requires it
        // eslint-disable-next-line
        value={{ current: null }}
      >
        <PhotoUploadPreview {...props} />
      </FileManagerCurrentContext.Provider>
    </FileManagerContext.Provider>
  </FileManagerAuthContext.Provider>
);

PhotoUpload.defaultProps = {
  field: FEATURED_UPLOAD_FIELD,
};

PhotoUpload.propTypes = {
  collectionName: PropTypes.string.isRequired,
  field: PropTypes.string,
  upload: PropTypes.func.isRequired,
};

export default PhotoUpload;
