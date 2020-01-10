import React from 'react';
import { connect } from 'formik';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloudUpload from '@material-ui/icons/CloudUpload';
import useDecorator from '../helpers/useDecorator';

export default connect((props) => {
  const {
    disabled,
    readOnly,
    label,
    name,
    error,
    helperText,
  } = useDecorator(props);

  const ref = React.useRef();
  const { t } = useTranslation();
  const [filename, setName] = React.useState();

  return (
    <>
      <input
        ref={ref}
        id={name}
        multiple
        type="file"
        value={filename}
        name={name}
        style={{ display: 'none' }}
        onChange={(e) => {
          setName(e.currentTarget.value);
          props.formik.setFieldValue(
            name,
            e.currentTarget.files[0],
          );
        }}
      />
      <label htmlFor={name}>
        <Button
          {...props}
          raised
          component="span"
          disabled={disabled || readOnly}
          variant="contained"
          size="large"
        >
          <CloudUpload style={{ marginRight: '0.5rem' }} />
          {t('labels:fileInput', { name })}
        </Button>
        <small style={{ marginLeft: '.5rem' }}>
          {filename}
        </small>
        {helperText && (
          <FormHelperText error={error}>
            {helperText}
          </FormHelperText>
        )}
      </label>
    </>
  );
});
