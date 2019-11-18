import React from 'react';
import Card from '@material-ui/core/Card';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import upload from '../../images/upload.png';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  img: {
    backgroundSize: 'contain',
    height: 225,
    filter: 'grayscale(1)',
    transition: 'filter 250ms',
    '&:hover': {
      filter: 'grayscale(0)',
    },
  },
  root: {
    margin: theme.spacing(1),
    maxWidth: '100%',
    position: 'relative',
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
      console.log(e);
      // noop
      // console.log(e);
    }
  };

  return (
    <Card className={root}>
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
      <CardMedia
        onClick={triggerFileUploadManager}
        className={img}
        title={t('labels:featuredUpload')}
        image={url}
      />
      <CardHeader
        title={t('labels:featuredUpload')}
        subheader={t('descriptions:featuredUpload')}
        action={
          <IconButton onClick={triggerFileUploadManager}>
            <UploadIcon />
          </IconButton>
        }
      />
    </Card>
  );
};
export default Picture;
