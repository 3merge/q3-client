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
            if (
              field !== FEATURED_UPLOAD_FIELD &&
              isFunction(formData?.get)
            ) {
              try {
                const f = formData.get(field);
                const path = `uploads/${f.name}`;
                formData.append(path, f);
                formData.set(field, f.name);
                formData.set('sensitive', false);
              } catch (e) {
                // noop
              }
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
