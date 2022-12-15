import React from 'react';
import { Box, Fab } from '@material-ui/core';
import RedoIcon from '@material-ui/icons/Redo';
import SaveIcon from '@material-ui/icons/Save';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

const ImageReview = ({ clear, src, upload }) => {
  const cls = useStyle();
  const { t } = useTranslation('descriptions');

  const handleUpload = () =>
    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const name = 'document-scanner-output.png';
        const f = new File([blob], name, {
          type: 'image/png',
        });

        return upload({
          name,
          src: {
            file: f,
          },
        });
      })
      .then(() => {
        // eslint-disable-next-line
        alert(t('documentScanUploaded'));
        clear();
      })
      .catch(() => {
        // eslint-disable-next-line
        alert(t('documentScanFailedToUpload'));
      });

  return (
    <Box bgcolor="primary.main" height="100%" width="100%">
      <img alt="" className={cls.img} src={src} />
      <Box className={cls.actions}>
        <Fab
          aria-label="redo"
          color="secondary"
          onClick={clear}
        >
          <RedoIcon />
        </Fab>
        <Fab
          aria-label="upload"
          color="secondary"
          onClick={handleUpload}
        >
          <SaveIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ImageReview;
