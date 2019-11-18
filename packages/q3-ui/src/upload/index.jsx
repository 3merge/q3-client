import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { grey, blue } from '@material-ui/core/colors';
import { useDropzone } from 'react-dropzone';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import uploadImg from '../../images/upload.png';

const useStyles = makeStyles(() => ({
  root: {
    border: `2px dotted ${grey[300]}`,
  },
  isActive: {
    borderColor: blue[200],
  },
  container: {
    marginBottom: '1rem',
    outline: '0 !important',
    '&:focus #dropper': {
      borderColor: blue[200],
    },
  },
}));

const Upload = ({ fn }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState();

  const onDrop = React.useCallback((acceptedFiles) => {
    setLoading(true);
    const formData = new FormData();
    acceptedFiles.map((f) => formData.append(f.name, f));
    fn(formData).finally(setLoading);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });
  const cls = useStyles();

  return (
    <Box {...getRootProps()} className={cls.container}>
      {loading && <LinearProgress variant="query" />}
      <Box
        py={4}
        align="center"
        id="dropper"
        className={classNames(
          cls.root,
          isDragActive ? cls.isActive : null,
        )}
      >
        <Container maxWidth="sm">
          <LazyLoadImage
            src={uploadImg}
            alt={t('labels:upload')}
            width="350"
          />
          <input {...getInputProps()} />
          <Typography variant="h3" gutterBottom>
            {t('labels:dropNdrop')}
          </Typography>
          <Button
            tabIndex={-1}
            variant="contained"
            color="primary"
          >
            {t('labels:upload')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

PropTypes.propTypes = {
  fn: PropTypes.instanceOf(Promise).isRequired,
};

export default Upload;
