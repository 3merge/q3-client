import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import { useTranslation } from 'react-i18next';
import useStyle from './useStyle';

const Input = ({
  name,
  onChange,
  onError,
  required,
  error,
  ...props
}) => {
  const cls = useStyle();
  const { t } = useTranslation();
  const [hasFile, setHasFile] = React.useState();
  const [localError, setLocalError] = React.useState();

  const onDropHandler = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      const [file] = acceptedFiles;
      const [err] = rejectedFiles;

      if (err && err.errors) {
        onError(err.errors.map((e) => e.message));
        setLocalError(true);
      } else {
        setLocalError(null);
      }

      setHasFile(true);
      onChange(null, file);
    },
    [],
  );

  const {
    getRootProps,
    getInputProps,
    inputRef,
  } = useDropzone({
    maxSize: 500000,
    multiple: false,
    onDrop: onDropHandler,
    noKeyboard: true,
    ...props,
  });

  const inputProps = getInputProps();

  delete inputProps.ref;
  delete inputProps.style;
  delete inputProps.tabIndex;

  const onClear = React.useCallback((e) => {
    inputRef.current.value = null;

    e.stopPropagation();

    setHasFile(false);
    setLocalError(false);
    onChange(null, null);
  }, []);

  return (
    <TextField
      {...getRootProps()}
      className={cls.button}
      label={t(`labels:${name}`)}
      name={name}
      variant="outlined"
      size="small"
      fullWidth
      required={required}
      error={localError || error}
      helperText={t('helpers:fileUpload')}
      inputRef={inputRef}
      inputProps={{
        ...inputProps,
        readOnly: true,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      // eslint-disable-next-line
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {hasFile ? (
              <IconButton type="button" onClick={onClear}>
                <DeleteForever />
              </IconButton>
            ) : (
              <PublishIcon />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

Input.propTypes = {
  onError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  error: false,
};

export default Input;
