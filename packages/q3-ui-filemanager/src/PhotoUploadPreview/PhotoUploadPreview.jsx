import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isObject, first } from 'lodash';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import useDropZoneAcceptedFiles from '../useDropZoneAcceptedFiles';
import DropZoneWrapper from '../DropZoneWrapper';
import DropZoneInputWrapper from '../DropZoneInputWrapper';
import PhotoUploadPreviewButton from '../PhotoUploadPreviewButton';
import FileManagerAuthContext from '../FileManagerAuthContext';
import useStyle from './styles';

const PhotoUploadPreview = ({ src }) => {
  const { t } = useTranslation('descriptions');
  const { onDrop, pending } = useDropZoneAcceptedFiles();
  const { canSee, canCreate, canEdit } = React.useContext(
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

  if (!canSee) return null;

  return (
    <Box className={cls.container}>
      {file?.error && (
        <Box mb={1}>
          <Alert severity="error">
            {t('descriptions:uploadFailed')}
          </Alert>
        </Box>
      )}
      <Box
        className={classnames(
          cls.root,
          'q3-photoupload-container',
        )}
      >
        {src ? (
          <img
            alt={t('labels:imagePreview')}
            className={cls.preview}
            src={src}
          />
        ) : (
          <PhotoCamera className={cls.icon} />
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
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                zIndex={3}
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
