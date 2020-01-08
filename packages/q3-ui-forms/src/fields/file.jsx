import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import useOpen from 'useful-state/lib/useOpen';
import useDecorator from '../helpers/useDecorator';

export default connect((props) => {
  const {
    disabled,
    readOnly,
    label,
    name,
    error,
    value,
  } = useDecorator(props);

  const ref = React.useRef();
  const { t } = useTranslation();
  const [url, setURL] = React.useState();
  const { isOpen, open, close } = useOpen();
  const [filename, setName] = React.useState();

  React.useEffect(() => {
    if (ref.current.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(ref.current.files[0]);

      reader.onload = (e) => {
        setURL(e.currentTarget.result);
      };
    }
  }, [value]);

  return (
    <>
      <input
        ref={ref}
        id={name}
        multiple
        type="file"
        value={filename}
        name={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
          props.formik.setFieldValue(
            name,
            e.currentTarget.files[0],
          );
        }}
        style={{ display: 'none' }}
      />
      <label htmlFor={name}>
        <Button
          {...props}
          raised
          component="span"
          disabled={disabled || readOnly}
          variant="contained"
          size="large"
          fullWidth
        >
          <CloudUpload style={{ marginRight: '0.5rem' }} />
          {filename || label}
        </Button>

        <Typography
          gutterBottom
          style={{ color: error ? 'red' : 'normal' }}
        >
          {t('labels:upload')}
          <Fade in={url}>
            <Button type="button" onClick={open}>
              &ndash; {t('labels:preview')}
            </Button>
          </Fade>
        </Typography>
        <Dialog onClose={close} open={isOpen}>
          <img
            src={url}
            alt={t('labels:preview')}
            width="250"
          />
        </Dialog>
      </label>
    </>
  );
});
