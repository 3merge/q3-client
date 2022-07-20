import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useTranslation } from 'q3-ui-locale';
import FileManagerAuthContext from '../FileManagerAuthContext';

const DropZoneInputWrapper = (props) => {
  const { t } = useTranslation('labels');
  const { getInputProps } = useDropzone(props);
  const { canCreate } = React.useContext(
    FileManagerAuthContext,
  );

  return canCreate ? (
    <Box component="label" ml={1} htmlFor="dropper-button">
      <input id="dropper-button" {...getInputProps()} />

      <Button
        component="span"
        startIcon={<CloudUploadIcon />}
      >
        {t('uploadFiles')}
      </Button>
    </Box>
  ) : null;
};

export default DropZoneInputWrapper;
