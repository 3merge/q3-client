import React from 'react';
import Card from '@material-ui/core/Card';
import UploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import empty from '../../images/unpopulated.png';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  img: {
    backgroundSize: 'contain',
    height: 175,
    filter: 'grayscale(1)',
    transition: 'filter 250ms',
    '&:hover': {
      filter: 'grayscale(0)',
    },
  },
  root: {
    margin: theme.spacing(1),
    maxWidth: 225,
  },
  title: {
    fontSize: 'small',
  },
}));

const getServiceParams = (files) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const formData = new FormData();
  files.forEach((file) => {
    formData.append(file.name, file);
  });

  return [formData, config];
};

const Picture = ({ service }) => {
  const { root, input, img } = useStyles();
  const ref = React.createRef();
  const [url, setURL] = React.useState(empty);

  const triggerFileUploadManager = () => {
    ref.current.click();
  };

  const updateImage = () => {
    const reader = new FileReader();
    reader.readAsDataURL(ref.current.files[0]);
    reader.onload = (e) => {
      setURL(e.target.result);
    };
  };

  const uploadPhoto = () => {
    if (service)
      service(getServiceParams(ref.current.files)).then(
        updateImage,
      );
  };

  return (
    <Card className={root}>
      <input
        id="picture-upload"
        onChange={uploadPhoto}
        ref={ref}
        accept=".png,.jpg,.jpeg,.svg"
        name="featuredPhot"
        className={input}
        type="file"
      />
      <CardMedia
        onClick={triggerFileUploadManager}
        className={img}
        title="Featured photo"
        image={url}
      />
      <CardHeader
        title="Featured photo"
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
