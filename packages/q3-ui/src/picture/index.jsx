import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Photo } from 'q3-ui-assets';
import { UploadContainer } from '../upload';

const getServiceParams = (files) => {
  const formData = new FormData();
  formData.append('photo', files[0]);
  return formData;
};

const Picture = ({ photo, service }) => {
  const ref = React.useRef();
  const [url, setURL] = React.useState();
  const { t } = useTranslation();
  const [uploading, startUpload] = React.useState(false);

  React.useEffect(() => {
    if (photo) setURL(photo);
  }, [photo]);

  const triggerFileUploadManager = () => {
    ref.current.click();
  };

  const uploadPhoto = () => {
    try {
      if (service) {
        const reader = new FileReader();
        startUpload(true);
        reader.readAsDataURL(ref.current.files[0]);

        reader.onload = (e) => {
          setURL(e.currentTarget.result);
        };

        const data = getServiceParams(ref.current.files);
        service(data).then(() => startUpload(false));
      }
    } catch (e) {
      // noop
      // console.log(e);
    }
  };

  return (
    <UploadContainer
      loading={uploading}
      inputProps={{
        id: 'picture-upload',
        onChange: uploadPhoto,
        accept: '.png,.jpg,.jpeg,.svg',
        name: t('labels:featuredUpload'),
        style: { display: 'none' },
        type: 'file',
        ref,
      }}
      containerProps={{
        role: 'button',
        onClick: triggerFileUploadManager,
      }}
    >
      <Box mb={1}>
        {url ? (
          <img
            style={{
              width: 'auto',
              maxHeight: 150,
              borderRadius: 500,
              overflow: 'hidden',
            }}
            alt={t('labels:featuredUpload')}
            src={url}
          />
        ) : (
          <Photo style={{ maxWidth: '100%', width: 135 }} />
        )}
      </Box>
      <Typography variant="body2" gutterBottom>
        {t('labels:featuredPhotoUpload')}
      </Typography>
    </UploadContainer>
  );
};
export default Picture;
