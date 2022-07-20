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
            src="data:image/png;base64,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"
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
  onDelete: PropTypes.func.isRequired,
};

export default PhotoUploadPreview;
