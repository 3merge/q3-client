import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useTranslation } from 'q3-ui-locale';
import withAuthBoolean from '../withAuthBoolean';

const DropZoneInputWrapper = (props) => {
  const { t } = useTranslation('labels');
  const { getInputProps } = useDropzone(props);
  const ref = React.useRef();

  return (
    <Box
      ref={ref}
      component="label"
      mr={1}
      htmlFor="dropper-button"
    >
      <input name="dropper-button" {...getInputProps()} />
      <Button
        color="secondary"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={() => {
          ref.current.querySelector('input').click();
        }}
        variant="contained"
      >
        {t('uploadFiles')}
      </Button>
    </Box>
  );
};

DropZoneInputWrapper.defaultProps = {};
DropZoneInputWrapper.propTypes = {};

export default withAuthBoolean(
  DropZoneInputWrapper,
  'canCreate',
);
