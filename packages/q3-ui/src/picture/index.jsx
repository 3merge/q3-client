import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import upload from '../../images/upload.png';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    filter: 'grayscale(1)',
    transition: 'filter 250ms',
    '&:hover': {
      filter: 'grayscale(0)',
    },
  },
  root: {
    border: '1px solid rgb(196, 196, 196)',
    margin: theme.spacing(1),
    maxWidth: '100%',
    height: 250,
    position: 'relative',
    padding: theme.spacing(0.75),
    '&:hover': {
      boxShadow: 0,
    },
  },
  title: {
    fontSize: 'small',
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 10,
  },
}));

const getServiceParams = (files) => {
  const formData = new FormData();
  formData.append('photo', files[0]);
  return formData;
};

const Picture = ({ photo, service }) => {
  const { root, input, img, center } = useStyles();
  const ref = React.useRef();
  const [url, setURL] = React.useState(photo || upload);
  const { t } = useTranslation();
  const [uploading, startUpload] = React.useState(false);

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
    <Box mt={4}>
      <Box className={root}>
        {uploading && (
          <div className={center}>
            <CircularProgress />
          </div>
        )}
        <input
          id="picture-upload"
          onChange={uploadPhoto}
          ref={ref}
          accept=".png,.jpg,.jpeg,.svg"
          name={t('labels:featuredUpload')}
          className={input}
          type="file"
        />
        <img
          className={img}
          alt={t('labels:featuredUpload')}
          src={url}
        />
      </Box>
      <Button fullWidth onClick={triggerFileUploadManager}>
        <UploadIcon style={{ marginRight: '1rem' }} />
        Upload a featured photo
      </Button>
    </Box>
  );
};
export default Picture;
