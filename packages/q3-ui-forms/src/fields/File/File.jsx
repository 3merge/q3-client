import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@material-ui/icons/Clear';
import { marshalProps } from '../TextBase/TextBase';
import useStyle from './useStyle';
import withGrid from '../withGrid';
import useAttachments from '../../hooks/useAttachments';

const renderEndAdornment = (renderer) => ({
  endAdornment: (
    <InputAdornment position="end">
      {renderer}
    </InputAdornment>
  ),
});

const renderCustomFileInput = (value) => (props) => {
  const cls = useStyle();

  return (
    <div className={cls.box}>
      <input
        {...props}
        ref={props.inputRef}
        className={cls.root}
      />
      <AttachFileIcon className={cls.icon} />
      {value}
    </div>
  );
};

export const FileInput = ({ name, value, ...props }) => {
  const cls = useStyle();
  const { t } = useTranslation();

  const {
    rootProps,
    inputProps,
    inputRef,
    onClear,
  } = useAttachments(name, props);

  return (
    <TextField
      {...marshalProps(props)}
      {...rootProps}
      className={cls.button}
      label={t(`labels:${name}`)}
      name={name}
      variant="outlined"
      size="small"
      fullWidth
      inputRef={inputRef}
      inputProps={{
        ...inputProps,
        readOnly: true,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      // eslint-disable-next-line
      InputProps={
        value
          ? {
              inputComponent: renderCustomFileInput,
              ...renderEndAdornment(
                <IconButton
                  className={cls.remove}
                  onClick={onClear}
                  type="button"
                >
                  <ClearIcon />
                </IconButton>,
              ),
            }
          : renderEndAdornment(<PublishIcon />)
      }
    />
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

FileInput.defaultProps = {
  value: '',
};

export default withGrid(FileInput, {
  xl: 12,
  lg: 12,
});
