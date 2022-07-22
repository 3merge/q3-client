import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isObject, first } from 'lodash';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';
import useDropZoneAcceptedFiles from '../useDropZoneAcceptedFiles';
import DropZoneWrapper from '../DropZoneWrapper';
import DropZoneInputWrapper from '../DropZoneInputWrapper';
import PhotoUploadPreviewButton from '../PhotoUploadPreviewButton';
import FileManagerAuthContext from '../FileManagerAuthContext';
import useStyle from './styles';
import dataUri from './dataUri';

const PhotoUploadPreview = ({ src }) => {
  const { t } = useTranslation('descriptions');
  const { onDrop, pending } = useDropZoneAcceptedFiles();
  const { canCreate, canEdit } = React.useContext(
    FileManagerAuthContext,
  );

  const readOnly = !canEdit || !canCreate;
  const cls = useStyle({
    readOnly,
  });

  const file = first(pending);
  const dropZoneProps = {
    accept: '.png,.jpg,.jpeg,.svg,.jfif,.webp,.avif',
    multiple: false,
    onDrop,
  };

  return (
    <Box className={cls.container}>
      {file?.error && (
        <Box mb={1}>
          <Alert severity="error">
            {t('descriptions:uploadFailed')}
          </Alert>
        </Box>
      )}
      <Box className={cls.root}>
        {src ? (
          <img
            alt="preview"
            className={cls.preview}
            src={src}
          />
        ) : (
          <img
            alt="placeholder"
            className={cls.preview}
            src={dataUri}
            style={{ mixBlendMode: 'darken' }}
          />
        )}
        {!readOnly && (
          <>
            <Box className={cls.button}>
              <DropZoneInputWrapper {...dropZoneProps} />
            </Box>
            <Box className={cls.dnd}>
              <DropZoneWrapper {...dropZoneProps} />
            </Box>
            <Box className="hover">
              <PhotoUploadPreviewButton src={src} />
            </Box>
            {isObject(file) && !file.error && (
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                height="100%"
                width="100%"
              >
                <CircularProgress />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

PhotoUploadPreview.defaultProps = {
  src: '',
};

PhotoUploadPreview.propTypes = {
  src: PropTypes.string,
};

export default PhotoUploadPreview;
