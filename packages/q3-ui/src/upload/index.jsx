import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { grey, blue } from '@material-ui/core/colors';
import { useDropzone } from 'react-dropzone';
import { Files } from 'q3-ui-assets';

export const useStyles = makeStyles(() => ({
  root: {
    border: `2px dotted ${grey[300]}`,
  },
  isActive: {
    borderColor: blue[200],
  },
  container: {
    cursor: 'pointer',
    marginBottom: '1rem',
    outline: '0 !important',
    '&:focus #dropper': {
      borderColor: blue[200],
    },
  },
}));

export const UploadContainer = ({
  containerProps,
  inputProps,
  loading,
  isDragActive,
  children,
}) => {
  const cls = useStyles();

  return (
    <Box {...containerProps} className={cls.container}>
      {loading && <LinearProgress variant="query" />}
      <Box
        p={2}
        align="center"
        id="dropper"
        className={classNames(
          cls.root,
          isDragActive ? cls.isActive : null,
        )}
      >
        <Container maxWidth="sm">
          <input {...inputProps} />
          {children}
        </Container>
      </Box>
    </Box>
  );
};

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

  return (
    <UploadContainer
      loading={loading}
      containerProps={getRootProps()}
      inputProps={getInputProps()}
      isDragActive={isDragActive}
    >
      <Files style={{ width: '100%' }} />
      <Typography variant="body2" gutterBottom>
        {t('labels:dropNdrop')}
      </Typography>
    </UploadContainer>
  );
};

PropTypes.propTypes = {
  fn: PropTypes.instanceOf(Promise).isRequired,
};

export default Upload;
